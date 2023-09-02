<template>
  <div>
    <el-button @click="openDialog1">
      新建文件夹
    </el-button>
    <el-button @click="openDialog2">
      新建文件
    </el-button>
    <!--    <div v-if="switchTo2">-->
    <el-row v-for="(row, rowIndex) in rows" :key="rowIndex" class="card-row">
      <el-col v-for="(o, colIndex) in row" :key="colIndex" :span="4" class="card-col">
        <el-card @mouseover="hoveredProjectIndex = (rowIndex) * 4 + colIndex" @mouseleave="hoveredProjectIndex = -1"
                 shadow="hover" :body-style="{ padding: '0px' }" class="small-card">
          <img v-if="firstDoc.filter((item)=>{return item.id === myResult[(rowIndex) * 4 + colIndex].id})[0].type === 0" @click="intoDocumentManage((rowIndex) * 4 + colIndex)"
               src="https://pic1.zhimg.com/v2-65354520edd978c49d00a7a710feb9c5_r.jpg?source=1940ef5c" class="image" />
          <img v-else src="https://img2.baidu.com/it/u=4238855641,2359345742&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1083" @click="intoFolder((rowIndex) * 4 + colIndex)" class="image">
          <div class="project-info" :class="{ active: hoveredProjectIndex === (rowIndex) * 4 + colIndex }">
            <div class="project-name">
              <span>{{ documentName[(rowIndex) * 4 + colIndex] }}</span>
              <div class="project-actions">


                <el-dialog  v-model="dialogVisible1" title="新建文件夹" class="project-dialog">
                  <el-input v-model="newName" placeholder="文件夹名称" class="input-field">
                  </el-input>
                  <span class="dialog-footer">
                      <el-button type="primary" @click="addFolder(); closeDialog1()"
                                 class="confirm-button">确认</el-button>
                      <el-button @click="closeDialog1" class="cancel-button">取消</el-button>
                    </span>
                </el-dialog>


                <el-dialog  v-model="dialogVisible2" title="新建文档" class="project-dialog">
                  <el-input v-model="newName" placeholder="文档名称" class="input-field">
                  </el-input>
                  <span class="dialog-footer">
                      <el-button type="primary" @click="addDocument(); closeDialog2()"
                                 class="confirm-button">确认</el-button>
                      <el-button @click="closeDialog2" class="cancel-button">取消</el-button>
                    </span>
                </el-dialog>
              </div>
            </div>
            <!--            <p>项目简介: {{ projectDescription[(rowIndex) * 4 + colIndex] }}</p>-->
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!--    </div>-->

    <!--    <div v-else>-->
    <!--      <el-row v-for="(row, rowIndex) in rows" :key="rowIndex+1" class="card-row">-->
    <!--        <el-col v-for="(o, colIndex) in row" :key="colIndex" :span="4" class="card-col">-->
    <!--          <el-card @mouseover="hoveredProjectIndex = (rowIndex) * 4 + colIndex" @mouseleave="hoveredProjectIndex = -1"-->
    <!--                   shadow="hover" :body-style="{ padding: '0px' }" class="small-card">-->
    <!--            <img @click="intoDocumentManage((rowIndex) * 4 + colIndex)"-->
    <!--                 src="https://pic1.zhimg.com/v2-65354520edd978c49d00a7a710feb9c5_r.jpg?source=1940ef5c" class="image" />-->
    <!--            <div class="project-info" :class="{ active: hoveredProjectIndex === (rowIndex) * 4 + colIndex }">-->
    <!--              <div class="project-name">-->
    <!--                <span>{{ secondDocNames[(rowIndex) * 4 + colIndex] }}</span>-->
    <!--                <div class="project-actions">-->

    <!--                  <el-dialog  v-model="dialogVisible2" title="新建文档" class="project-dialog">-->
    <!--                    <el-input v-model="newName" placeholder="文档名称" class="input-field">-->
    <!--                    </el-input>-->
    <!--                    <span class="dialog-footer">-->
    <!--                      <el-button type="primary" @click="addDocument(); closeDialog2()"-->
    <!--                                 class="confirm-button">确认</el-button>-->
    <!--                      <el-button @click="closeDialog2" class="cancel-button">取消</el-button>-->
    <!--                    </span>-->
    <!--                  </el-dialog>-->
    <!--                </div>-->
    <!--              </div>-->
    <!--              &lt;!&ndash;            <p>项目简介: {{ projectDescription[(rowIndex) * 4 + colIndex] }}</p>&ndash;&gt;-->
    <!--            </div>-->
    <!--          </el-card>-->
    <!--        </el-col>-->
    <!--      </el-row>-->
    <!--    </div>-->
  </div>
</template>
<script setup>
import {ref, reactive, onMounted, computed, watch} from 'vue'
import { useRouter } from "vue-router";

import projectAPI from '@/api/proj.js'
import {CircleCloseFilled, DocumentCopy} from "@element-plus/icons-vue";
import {getProjId, getTeamId, setDesignId, setProjectName, setProjId} from "@/utils/token";
import originAPI from "@/api/originDesign";
import documentAPI from '@/api/document'

const router = useRouter()
const currentDate = reactive(new Date())

const newName = ref(''); // 存储新项目名称
const documentName = ref([])

const secondDocument = ref([])

const projectDescription = ref([])
const totalCards = ref()

const cardsPerRow = 4
const rows = ref([])

const myResult = ref([])

const numRows = computed(() => {
  return Math.ceil(totalCards.value / cardsPerRow)
})

const dialogVisible1 = ref(false)
const dialogVisible2 = ref(false)

const switchTo2 = ref(true)

const formLabelWidth = '140px'

function handleExtraCardClick() {
  console.log('成功被调用！')
}

const hoveredProjectIndex = ref(-1);

const contextMenuVisible = ref(false);

const documentArray = ref([])
const folderArray = ref([])

const firstDoc = ref([])

const secondDoc = ref([])

const tempData = ref([])

const search = ref()

async function addFolder(){
  console.log('11111111111111111111111111111')
  const result = await documentAPI.createFolder(newName.value,getProjId())
  console.log('addFolder',result.data)
  await getData()
  showFirstDocs()
}

async function addDocument(){
  const result = await documentAPI.createDocument(getProjId(),newName.value,null)
  console.log('addDocument',result.data)
  await getData()
  showFirstDocs()
}

function openDialog1() {
  console.log('&*&&***open')
  newName.value = ''; // 清空输入框
  dialogVisible1.value = true; // 打开对话框
}
function openDialog2() {
  console.log()
  newName.value = ''; // 清空输入框
  dialogVisible2.value = true; // 打开对话框
}

async function intoDocumentManage(projPos) {
  let projId = myResult.value[projPos].id

  console.log('projPos111', projPos)

  const result = await projectAPI.getSingleProject(projId);

  setProjId(projId)

  await router.push('/design')
}

async function intoFolder(folderPos){
  let folderId = myResult.value[folderPos].id
  switchTo2.value = false
  secondDocument.value = folderId

  let temp_document = []
  for(let i = 0 ; i < documentArray.value.length ; i++){
    if(documentArray.value[i].folder === folderId){
      temp_document.push({id:documentArray.value[i].id,name:documentArray.value[i].title})
    }
  }
  secondDoc.value = temp_document.value
}

function closeDialog1() {
  dialogVisible1.value = false; // 关闭对话框
}

function closeDialog2(){
  dialogVisible2.value = false
}

async function getData(){
  const result = await documentAPI.getAllDocuments(getProjId())
  let firstDoc_temp = []

  //一级目录
  for(let i = 0 ; i < result.data.length ; i++){
    // firstDoc.value.push({id:result.data[i].id,name:result.data[i].name,type:0})
    // firstDoc_temp.push({id:result.data[i].id,name:result.data[i].name,type:0})
    if (result.data[i].folder === undefined){
      firstDoc_temp.push({id:result.data[i].id,name:result.data[i].name,type:1})
    } else {
      firstDoc_temp.push({id:result.data[i].id,name:result.data[i].title,type:0})
    }
  }
  firstDoc.value = firstDoc_temp

  let documentArray_temp = []
  let folderArray_temp = []

  //获取所有文件和文件夹
  for(let i = 0 ; i < result.data.length ; i++){
    if(result.data[i].folder === null){
      // documentArray.value.push({id:result.data[i].id,name:result.data[i].name})
      documentArray_temp.push({id:result.data[i].id,name:result.data[i].name})
    }else if(result.data[i].folder === undefined){
      // folderArray.value.push({id:result.data[i].id,name:result.data[i].name})
      folderArray_temp.push({id:result.data[i].id,name:result.data[i].name})
      for(let j = 0 ; i < result.data[i].documents.length ; j++){
        // documentArray.value.push({id:result.data[i].documents[j].id,name:result.data[i].documents[j].name})
        documentArray_temp.push({id:result.data[i].documents[j].id,name:result.data[i].documents[j].name})
      }
    }
  }
  documentArray.value = documentArray_temp
  folderArray.value = folderArray_temp

  // for(let i = 0 ; i < firstDoc.value.length ; i++){
  //   for(let j = 0 ; j < folderArray.value.length ; j++){
  //     if(folderArray.value[j].id === firstDoc.value[i].id){
  //       firstDoc.value[i].type = 1
  //     }
  //   }
  // }

  console.log('firstDoc.value',firstDoc.value)
  console.log('folderArray.value',folderArray.value)
  console.log('documentArray.value',documentArray.value)

  myResult.value = result.data
}

function showFirstDocs(){
  rows.value = []
  let docsNames = []
  for(const doc of firstDoc.value){
    docsNames.push(doc.name)
  }
  documentName.value = docsNames

  totalCards.value = docsNames.length
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

}

const secondDocNames = ref([])

function showSecondDocs(){
  rows.value = []
  let docsNames = []
  for(const doc of secondDoc.value){
    docsNames.push(doc.name)
  }
  secondDocNames.value = docsNames

  totalCards.value = docsNames.length
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

}

// function showProjects1() {
//   rows.value = []
//   // console.log('myResult', myResult.value)
//   let projNames = []
//   // let projectDescriptions = []
//   for (const proj of myResult.value) {
//     projNames.push(proj.name)
//     // projectDescriptions.push(proj.describe)
//   }
//   projectName.value = projNames
//
//   totalCards.value = projNames.length
//   console.log('numRows', numRows.value)
//   for (let i = 0; i < numRows.value; i++) {
//     let row = []
//     for (let j = 0; j < cardsPerRow; j++) {
//       let cardIndex = i * cardsPerRow + j
//       if (cardIndex < totalCards.value) {
//         row.push(cardIndex)
//       }
//     }
//
//     rows.value.push(row)
//     console.log("rows", rows)
//   }
//   console.log(totalCards.value)
// }

// defineExpose({
//   showProjects1,getData
// })

onMounted(async () => {
  // getOrdering()
  await getData()
  showFirstDocs()
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
