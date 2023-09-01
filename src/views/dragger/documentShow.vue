<template>
  <div>
    <el-row v-for="(row, rowIndex) in rows" :key="rowIndex" class="card-row">
      <el-col v-for="(o, colIndex) in row" :key="colIndex" :span="4" class="card-col">
        <el-card @mouseover="hoveredProjectIndex = (rowIndex) * 4 + colIndex" @mouseleave="hoveredProjectIndex = -1"
          shadow="hover" :body-style="{ padding: '0px' }" class="small-card">
          <img @click="intoDesignManage((rowIndex) * 4 + colIndex)"
            src="https://pic1.zhimg.com/v2-65354520edd978c49d00a7a710feb9c5_r.jpg?source=1940ef5c" class="image" />
          <div class="project-info" :class="{ active: hoveredProjectIndex === (rowIndex) * 4 + colIndex }">
            <div class="project-name">
              <span>项目：{{ projectName[(rowIndex) * 4 + colIndex] }}</span>
              <div class="project-actions">
                <el-button @click="deleteCard((rowIndex) * 4 + colIndex)" text>
                  <el-icon class="delete">
                    <CircleCloseFilled />
                  </el-icon>
                </el-button>
                <el-button @click="copyProject((rowIndex) * 4 + colIndex)" text>
                    <el-icon><DocumentCopy /></el-icon>
                </el-button>
                <el-button class="edit" @click="openDialog(rowIndex,colIndex)" text>
                  <font-awesome-icon :icon="['fas', 'pen-to-square']" />
                </el-button>
                <el-dialog  v-model="dialogVisible" title="修改项目名称" class="project-dialog">
                  <el-input v-model="newName" placeholder="新项目名称" class="input-field">
                  </el-input>
                  <span class="dialog-footer">
                    <el-button type="primary" @click="changeProjectName(); closeDialog()"
                      class="confirm-button">确认</el-button>
                    <el-button @click="closeDialog" class="cancel-button">取消</el-button>
                  </span>
                </el-dialog>
              </div>
            </div>
            <p>项目简介: {{ projectDescription[(rowIndex) * 4 + colIndex] }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import {ref, reactive, onMounted, computed, watch} from 'vue'
import { useRouter } from "vue-router";

import projectAPI from '@/api/proj.js'
import {CircleCloseFilled, DocumentCopy} from "@element-plus/icons-vue";
import {getTeamId, setDesignId, setProjectName, setProjId} from "@/utils/token";
import originAPI from "@/api/originDesign";

const router = useRouter()
const currentDate = reactive(new Date())
const dialogVisible = ref(false); // 控制对话框显示与隐藏
const newName = ref(''); // 存储新项目名称
const projectName = ref([])
const projectDescription = ref([])
const totalCards = ref()

const reRow = ref()
const reCol = ref()

const cardsPerRow = 4
const rows = ref([])

const numRows = computed(() => {
  return Math.ceil(totalCards.value / cardsPerRow)
})

const dialogFormVisible = ref(false)

const formLabelWidth = '140px'

const props = defineProps(['teamId','ordering','radio1','radio2'])

// const radio1 = computed(()=>{
//   return props.radio1
// })
//
// const radio2 = computed(()=>{
//   return props.radio2
// })

const radio1 = ref()
const radio2 = ref()

radio1.value = props.radio1
radio2.value = props.radio2


const team = ref('')

team.value = props.teamId

const ordering = computed(()=>{
  return props.ordering
})

const form = reactive({
  name: '',
  describe: '',
})

function handleExtraCardClick() {
  console.log('成功被调用！')
}

const hoveredProjectIndex = ref(-1);

const contextMenuVisible = ref(false);

async function copyProject(projPos){
  let projId = myResult.value[projPos].id

  console.log('projPos111', projPos)

  const result = await projectAPI.copyProject(getTeamId(),projId)

  await getData()
  showProjects1()
}

async function getSingleProj(projPos) {
  let projId = myResult.value[projPos].id

  console.log('projPos111', projPos)

  const result = await projectAPI.getSingleProject(projId);

  setProjId(projId)

  dialogFormVisible.value = false
  await router.push('/drag')
  console.log('getSingleProject成功被调用！')
}
function openDialog(rowIndex,colIndex) {
  console.log('rowIndex,colIndex',rowIndex,colIndex)

  reRow.value = rowIndex
  reCol.value = colIndex

  newName.value = ''; // 清空输入框
  dialogVisible.value = true; // 打开对话框
}
async function intoDesignManage(projPos) {
  let projId = myResult.value[projPos].id

  console.log('projPos111', projPos)

  const result = await projectAPI.getSingleProject(projId);

  setProjId(projId)

  await router.push('/design')
}
function closeDialog() {
  dialogVisible.value = false; // 关闭对话框
}
async function deleteCard(projPos) {
  let projId = myResult.value[projPos].id
  console.log(myResult.value[projPos])
  console.log('projPos', projPos)
  console.log('projId', projId)
  totalCards.value--

  const result = await projectAPI.deleteProject(team.value, projId)
  await getData()
  showProjects1()

}
async function changeProjectName() {
  let projPos = reRow.value*4+reCol.value
  let projId = myResult.value[projPos].id;
  myResult.value[projPos].name = newName.value;
  console.log('myResult',myResult.value)
  console.log('row',reRow.value)
  console.log('col',reCol.value)
  console.log('projPos##########',projPos)
  console.log('adsprojName', newName.value)
  setProjectName(newName.value)
  console.log('projId',projId)
  console.log('describe',myResult.value[projPos].describe)
  const result = await projectAPI.resetProject(newName.value,myResult.value[projPos].describe,projId)
  showProjects1()
}

const tempData = ref([])

const search = ref()

watch(search,()=>{
  showProjects1()
})

const myResult = computed(() =>
    tempData.value.filter(
        (data) => !search.value || data.name.toLowerCase().includes(search.value.toLowerCase())
    )
)

function getOrdering(){
  if(radio1.value === "1" && radio2.value === "1"){
    ordering.value = 'name'
  }else if(radio1.value === "1" && radio2.value === "2"){
    ordering.value = '-name'
  }else if(radio1.value === "2" && radio2.value === "1"){
    ordering.value = 'create_time'
  }else if(radio1.value === "2" && radio2.value === "2"){
    ordering.value = '-create_time'
  }else if(radio1.value === "3" && radio2.value === "1"){
    ordering.value = 'update_time'
  }else if(radio1.value === "3" && radio2.value === "2"){
    ordering.value = '-update_time'
  }else{
    ordering.value='wrong'
  }
  console.log('radio1.value',radio1.value)
  console.log('radio2.value',radio2.value)
  console.log('ordering.value',ordering.value)
}

async function getData() {
  console.log('ordering',ordering)
  const result = await projectAPI.getAllProjects(team.value,ordering.value)
  tempData.value = result.data
}

function getSearch(searchName) {
  search.value=searchName
}

function showProjects1() {
  rows.value = []
  console.log('myResult', myResult.value)
  let projNames = []
  let projectDescriptions = []
  for (const proj of myResult.value) {
    projNames.push(proj.name)
    projectDescriptions.push(proj.describe)
  }
  projectName.value = projNames
  projectDescription.value = projectDescriptions
  totalCards.value = projNames.length
  console.log('numRows', numRows.value)
  for (let i = 0; i < numRows.value; i++) {
    let row = []
    for (let j = 0; j < cardsPerRow; j++) {
      let cardIndex = i * cardsPerRow + j
      if (cardIndex < totalCards.value) {
        row.push(cardIndex)
      }
    }

    rows.value.push(row)
    console.log("rows", rows)
  }

  console.log(totalCards.value)
  console.log('name::::', projectName.value)
  console.log('name@@@@', projectName.value[0])
}

defineExpose({
  showProjects1,getSearch,getData,getOrdering
})

onMounted(async () => {
  // getOrdering()
  await getData()
  showProjects1()
  console.log('$$$$$$$$$$', totalCards.value)
})


</script>

<style scoped>
.layout-container-demo .el-aside {
  background-color: white;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  height: 98px !important;
  display: block;
  object-fit: cover;
}

.small-card {
  width: 10%;
  height: 100%;
}

.card-row {
  margin-left: auto;
  margin-right: auto;
}

.card-col {
  margin: 30px;
}

.small-card {
  position: relative;
  /* 绝对定位需要 */
  width: 100%;
  height: 100%;
}

.project-info {
  padding-left: 20px;
  padding-bottom: 20px;
  position: relative;
  height: 20px;
  border-radius: 10px;
  font-size: 16px;
  background-color: white;
  /* padding: 10px; */
  transition: top 0.3s ease;
  top: 0;
}

.project-info.active {
  top: -40px;
  /* 负数值根据实际需求调整，控制向上滑动的距离 */
}


.project-name {
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.project-actions {
  display: flex;
  align-items: center;
  /* 调整按钮之间的间距 */
}

.project-details {
  margin-top: 10px;
  display: block;
  opacity: 1;
  transition: opacity 0.3s ease;
}

.project-info.active .project-details {
  opacity: 1;
}

.project-dialog {
  width: 300px;
  /* 调整对话框的宽度 */
}

.input-field {
  width: 100%;
  margin-bottom: 20px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.confirm-button {
  background-color: #67c23a;
  /* 修改按钮的背景颜色 */
  color: white;
  /* 修改按钮的文本颜色 */
  border-color: #67c23a;
}

.cancel-button {
  background-color: #909399;
  color: white;
  border-color: #909399;
}
.project-actions .el-button{
   padding:0px;
}
.project-actions{
  margin-right: 10px;
}
</style>
