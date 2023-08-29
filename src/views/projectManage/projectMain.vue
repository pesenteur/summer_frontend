<template>
  <div>
    <el-row v-for="(row, rowIndex) in rows" :key="rowIndex" class="card-row">
      <el-col v-for="(o, colIndex) in row" :key="colIndex" :span="4" class="card-col">
        <el-card @mouseover="hoveredProjectIndex = (rowIndex) * 4 + colIndex" @mouseleave="hoveredProjectIndex = -1"
          shadow="hover" :body-style="{ padding: '0px' }" class="small-card">
          <img @click="intoDesignManage((rowIndex)*4+colIndex)"
            src="https://pic1.zhimg.com/v2-65354520edd978c49d00a7a710feb9c5_r.jpg?source=1940ef5c" class="image" />
          <div style="padding: 10px">
            <span>项目名称: {{ projectName[(rowIndex) * 4 + colIndex] }}</span>
            <el-button @click="deleteCard((rowIndex) * 4 + colIndex)" text>
              <el-icon>
                <CircleCloseFilled />
              </el-icon>
            </el-button>
            <el-button @click="openDialog((rowIndex) * 4 + colIndex)" text>
              <font-awesome-icon :icon="['fas', 'pen-to-square']" />
            </el-button>
            <el-dialog :modal="false" v-model="dialogVisible" title="修改项目名称">
              <el-input v-model="newName" placeholder="新项目名称">
              </el-input>
              <span slot="footer" class="dialog-footer">
                <el-button @click="closeDialog">取消</el-button>
                <el-button type="primary" @click="changeProjectName(projIndex, newName); closeDialog()">确认</el-button>
              </span>
            </el-dialog>
            <div v-if="hoveredProjectIndex === (rowIndex) * 4 + colIndex" class="project-details">
              <p>项目简介: {{ projectDescription[(rowIndex) * 4 + colIndex] }}</p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import projectDialog from "./projectDialog.vue";
import { useRouter } from "vue-router";

import projectAPI from '@/api/proj.js'
import { CircleCloseFilled } from "@element-plus/icons-vue";
import { setDesignId, setProjId } from "@/utils/token";
import originAPI from "@/api/originDesign";

const router = useRouter()
const currentDate = reactive(new Date())
const dialogVisible = ref(false); // 控制对话框显示与隐藏
const newName = ref(''); // 存储新项目名称
const projectName = ref([])
const projectDescription = ref([])
const totalCards = ref()

const myResult = ref([])

const cardsPerRow = 4
const rows = ref([])

const numRows = computed(() => {
  return Math.ceil(totalCards.value / cardsPerRow)
})

const dialogFormVisible = ref(false)

const formLabelWidth = '140px'

const props = defineProps(['teamId'])

const team = ref('')

team.value = props.teamId

const form = reactive({
  name: '',
  describe: '',
})

function handleExtraCardClick() {
  console.log('成功被调用！')
}

const hoveredProjectIndex = ref(-1);

async function getSingleProj(projPos) {
  let projId = myResult.value[projPos].id

  console.log('projPos111', projPos)

  const result = await projectAPI.getSingleProject(projId);

  setProjId(projId)

  // let title = '画布'
  // for(let i=0;i<result.data.length;i++){
  //   if(result.data !== []){
  //     let id = result.data[0].id
  //     const result = await getSaveData.getSingleDesign(projId,id)
  //     console.log("result drag",result)
  //     this.comData = result.data.content
  //     this.canData = result.data.style
  //     break;
  //   }
  // }


  // const result = await originAPI.getAllDesign(projId)
  // if (result.data){
  //   console.log('data0',result.data[0])
  //   let id = result.data[0].id
  //   setDesignId(id)
  // }
  // const result = await originAPI.addOrigin(title,projId)
  // console.log('this is a result:',result)
  // setDesignId(result.data.id)

  dialogFormVisible.value = false
  await router.push('/drag')
  console.log('getSingleProject成功被调用！')
}
function openDialog(projIndex) {
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
  await showProjects1()

}
async function changeProjectName(projPos, newName) {
  let projId = myResult.value[projPos].id;
  myResult.value[projPos].name = newName;
  console.log('adsprojName', newName)
  await showProjects1()
}
async function showProjects1() {
  rows.value = []
  const result = await projectAPI.getAllProjects(team.value)
  myResult.value = result.data
  // projectName.value = result.data.name
  console.log('result', result)
  let projNames = []
  let projectDescriptions = []
  for (const proj of result.data) {
    projNames.push(proj.name)
    projectDescriptions.push(proj.describe)
  }
  projectName.value = projNames
  projectDescription.value = projectDescriptions
  totalCards.value = projNames.length
  console.log('numRows', numRows.value)
  for (let i = 0; i < numRows.value; i++) {
    console.log('mco;rejwvc')
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
  showProjects1
})

onMounted(async () => {
  await showProjects1()
  console.log('$$$$$$$$$$', totalCards.value)
})

</script>

<style>
.time {
  font-size: 12px;
  color: #999;
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
  height: 80px;
  display: block;
  object-fit: cover;
}

.small-card {
  width: 100%;
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

.project-details {
  opacity: 0;
  /* 初始时透明度为0，即隐藏状态 */
  max-height: 0;
  /* 初始时高度为0，即隐藏状态 */
  overflow: hidden;
  /* 隐藏溢出内容 */

  transition: opacity 0.3s, max-height 0.3s;
  /* 添加过渡效果 */
}

.card-col:hover .project-details {
  opacity: 1;
  /* 悬停时透明度为1，即显示状态 */
  max-height: 100px;
  /* 悬停时高度为实际高度，例如100px */
}

/* 悬停时显示详情 */
.small-card:hover>div[v-if="hoveredProjectIndex === (rowIndex) * 4 + colIndex"] {
  opacity: 1;
  max-height: 100px;
  /* 根据需要调整该值 */
  overflow: hidden;
}

/* 非悬停时隐藏详情 */
.small-card>div[v-if="hoveredProjectIndex === (rowIndex) * 4 + colIndex"] {
  opacity: 0;
  max-height: 0;
  overflow: hidden;
}
</style>
