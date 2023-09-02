<template>
  <div>
    <el-button v-if="behind > 0" class="head_button" @click="goBehind">
      返回上一级
    </el-button>
    <div class="button-container">
      <el-button v-if="behind === 0" class="head_button" @click="openDialog1">
        新建文件夹
      </el-button>
      <el-button class="head_button" @click="openDialog2">
        新建文件
      </el-button>
    </div>
    <div v-if="switchTo2">
      <el-row v-for="(row, rowIndex) in rows" :key="rowIndex" class="card-row">
        <el-col v-for="(o, colIndex) in row" :key="colIndex" :span="2" class="card-col">
          <el-card @mouseover="hoveredProjectIndex = (rowIndex) * 6 + colIndex" @mouseleave="hoveredProjectIndex = -1"
            shadow="hover" :body-style="{ padding: '0px' }" class="small-card">
            <font-awesome-icon
              v-if="firstDoc.filter((item) => { return item.id === myResult[(rowIndex) * 6+ colIndex].id })[0].type === 0"
              @click="intoDocumentManage1((rowIndex) * 6 + colIndex)" :icon="['fas', 'file']" style="color: #c7dbdf;"
              class="image" />
            <font-awesome-icon v-else @click="intoFolder((rowIndex) * 6 + colIndex)" class="image"
              :icon="['fas', 'folder']" style="color: #53d0ea; font-size: 150px;" />
            <div class="project-info" :class="{ active: hoveredProjectIndex === (rowIndex) * 4 + colIndex }">
              <div class="project-name">
                <span>{{ documentName[(rowIndex) * 6 + colIndex] }}</span>

              </div>
              <!--            <p>项目简介: {{ projectDescription[(rowIndex) * 4 + colIndex] }}</p>-->
            </div>
          </el-card>
        </el-col>
      </el-row>


      <el-dialog v-model="dialogVisible1" title="新建文件夹" class="project-dialog">
        <el-input v-model="newName" placeholder="文件夹名称" class="input-field">
        </el-input>
        <span class="dialog-footer">
          <el-button type="primary" @click="addFolder" class="confirm-button">确认</el-button>
          <el-button @click="closeDialog1" class="cancel-button">取消</el-button>
        </span>
      </el-dialog>


      <el-dialog v-model="dialogVisible2" title="新建文档" class="project-dialog">
        <el-input v-model="newName" placeholder="文档名称" class="input-field">
        </el-input>
        <span class="dialog-footer">
          <el-button type="primary" @click="addDocument" class="confirm-button">确认</el-button>
          <el-button @click="closeDialog2" class="cancel-button">取消</el-button>
        </span>
      </el-dialog>
    </div>

    <div v-else>
      <el-row v-for="(row, rowIndex) in rows1" :key="rowIndex" class="card-row">
        <el-col v-for="(o, colIndex) in row" :key="colIndex" :span="2" class="card-col">
          <el-card @mouseover="hoveredProjectIndex = (rowIndex) * 6 + colIndex" @mouseleave="hoveredProjectIndex = -1"
            shadow="hover" :body-style="{ padding: '0px' }" class="small-card">
            <font-awesome-icon @click="intoDocumentManage2((rowIndex) * 6 + colIndex)" :icon="['fas', 'file']"
              style="color: #c7dbdf;" class="image" />
            <div class="project-info" :class="{ active: hoveredProjectIndex === (rowIndex) * 6 + colIndex }">
              <div class="project-name">
                <span>{{ secondDocNames[(rowIndex) * 6 + colIndex] }}</span>
                <div class="project-actions">
                </div>
              </div>
              <!--            <p>项目简介: {{ projectDescription[(rowIndex) * 4 + colIndex] }}</p>-->
            </div>
          </el-card>
        </el-col>
      </el-row>

      <el-dialog v-model="dialogVisible3" title="新建文档" class="project-dialog">
        <el-input v-model="newName" placeholder="文档名称" class="input-field">
        </el-input>
        <span class="dialog-footer">
          <el-button type="primary" @click="addDocument2" class="confirm-button">确认</el-button>
          <el-button @click="closeDialog3" class="cancel-button">取消</el-button>
        </span>
      </el-dialog>

    </div>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted, computed, watch } from 'vue'
import { useRouter } from "vue-router";

import projectAPI from '@/api/proj.js'
import { CircleCloseFilled, DocumentCopy } from "@element-plus/icons-vue";
import { getProjId, getTeamId, setDesignId, setProjectName, setProjId } from "@/utils/token";
import originAPI from "@/api/originDesign";
import documentAPI from '@/api/document'
import {ElMessage} from "element-plus";

const router = useRouter()
const currentDate = reactive(new Date())

const newName = ref(''); // 存储新项目名称
const documentName = ref([])

const projectDescription = ref([])
const totalCards = ref()
const totalCards1 = ref()

const cardsPerRow = 6
const rows = ref([])

const rows1 = ref([])

const myResult = ref([])

const numRows = computed(() => {
  return Math.ceil(totalCards.value / cardsPerRow)
})

const numRows1 = computed(() => {
  return Math.ceil(totalCards1.value / cardsPerRow)
})

const dialogVisible1 = ref(false)
const dialogVisible2 = ref(false)
const dialogVisible3 = ref(false)
const behind = ref(0)

const folderId = ref()

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

async function addFolder() {
  if(newName.value === ''){
    ElMessage.error('请输入文件夹名称')
    dialogVisible1.value = true
  }else {
    console.log('11111111111111111111111111111')
    const result = await documentAPI.createFolder(newName.value, getProjId())
    console.log('addFolder', result.data)
    await getData()
    showFirstDocs()
    dialogVisible1.value = false
  }
}

async function addDocument() {
  if(newName.value === ''){
    ElMessage.error('请输入文件名称')
    dialogVisible2.value = true
  }else {
    const result = await documentAPI.createDocument(getProjId(), newName.value, null)
    console.log('addDocument', result.data)
    await getData()
    showFirstDocs()
    dialogVisible2.value = false
  }
}

const lastId = ref()

const folder_id = ref()

async function addDocument2() {
  if(newName.value === ''){
    dialogVisible3.value = true;
    ElMessage.error('请输入文件名称')
  }else {
    const result = await documentAPI.createDocument(getProjId(), newName.value, folderId.value)
    console.log('addDocument2', result.data)
    let temp_document = []
    lastId.value = result.data.id
    // folder_id.value = result.data.folder
    documentArray.value.push({id: result.data.id, name: result.data.title, folder: result.data.folder})
    for (let i = 0; i < documentArray.value.length; i++) {
      if (documentArray.value[i].folder === folderId.value) {
        temp_document.push({id: documentArray.value[i].id, name: documentArray.value[i].name})
      }
    }
    secondDoc.value = temp_document
    console.log('secondDoc.value', secondDoc.value)
    console.log('documentArray', documentArray.value)

    showSecondDocs()
    dialogVisible3.value = false;
  }
}

function openDialog1() {
  newName.value = ''; // 清空输入框
  dialogVisible1.value = true; // 打开对话框
}
function openDialog2() {
  newName.value = ''; // 清空输入框
  if (behind.value === 1) {
    dialogVisible3.value = true
  }
  else {
    dialogVisible2.value = true; // 打开对话框
  }

}


async function intoDocumentManage1(docPos) {

  let docId = myResult.value[docPos].id

  console.log('docId', docId)

  await router.push(`/document/${docId}`)
}

async function intoDocumentManage2(docPos) {
  let temp_folder = []
  // await getData()
  console.log('projPos111', docPos)
  console.log('myResult!!!!!', myResult.value)

  console.log('totalCards1', totalCards1.value)
  console.log('docPos', docPos.value)

  if (totalCards1.value === docPos + 1) {

    console.log('docPos', docPos)
    console.log('lastId.value', lastId.value)

    await router.push(`/document/${lastId.value}`)
  } else {

    console.log('1231313131')
    for (let i = 0; i < myResult.value.length; i++) {

      console.log('folder_id', folder_id.value)

      if (myResult.value[i].id === folder_id.value) {
        temp_folder = myResult.value[i].documents
        break;
      }
    }
    console.log('myResult.value', myResult.value)
    console.log('temp_folder', temp_folder)
    let docId = temp_folder[docPos].id;

    console.log('docId', docId)

    await router.push(`/document/${docId}`)

  }
}

async function intoFolder(folderPos) {
  folderId.value = myResult.value[folderPos].id
  switchTo2.value = false
  behind.value = behind.value + 1


  let temp_document = []
  for (let i = 0; i < documentArray.value.length; i++) {
    if (documentArray.value[i].folder === folderId.value) {
      temp_document.push({ id: documentArray.value[i].id, name: documentArray.value[i].name })
    }
  }


  let len = myResult.value[folderPos].documents.length
  lastId.value = myResult.value[folderPos].documents[len - 1].id
  folder_id.value = folderId.value

  secondDoc.value = temp_document
  switchTo2.value = false
  showSecondDocs()
}

function closeDialog1() {
  dialogVisible1.value = false; // 关闭对话框
}

function closeDialog2() {
  dialogVisible2.value = false
}

function closeDialog3() {
  dialogVisible3.value = false
}

async function getData() {
  const result = await documentAPI.getAllDocuments(getProjId())
  console.log('getData', result)
  let firstDoc_temp = []

  //一级目录
  for (let i = 0; i < result.data.length; i++) {
    // firstDoc.value.push({id:result.data[i].id,name:result.data[i].name,type:0})
    // firstDoc_temp.push({id:result.data[i].id,name:result.data[i].name,type:0})
    if (result.data[i].folder === undefined) {
      firstDoc_temp.push({ id: result.data[i].id, name: result.data[i].name, type: 1 })
    } else {
      firstDoc_temp.push({ id: result.data[i].id, name: result.data[i].title, type: 0 })
    }
  }
  firstDoc.value = firstDoc_temp

  let documentArray_temp = []
  let folderArray_temp = []

  //获取所有文件和文件夹
  for (let i = 0; i < result.data.length; i++) {
    if (result.data[i].folder === null) {
      // documentArray.value.push({id:result.data[i].id,name:result.data[i].name})
      documentArray_temp.push({ id: result.data[i].id, name: result.data[i].title, folder: result.data[i].folder })
    } else if (result.data[i].folder === undefined) {
      // folderArray.value.push({id:result.data[i].id,name:result.data[i].name})
      folderArray_temp.push({ id: result.data[i].id, name: result.data[i].name })
      for (let j = 0; j < result.data[i].documents.length; j++) {
        // documentArray.value.push({id:result.data[i].documents[j].id,name:result.data[i].documents[j].name})
        console.log('result.data[i].documents', result.data[i].documents[j])
        documentArray_temp.push({ id: result.data[i].documents[j].id, name: result.data[i].documents[j].title, folder: result.data[i].documents[j].folder })
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

  console.log('firstDoc.value', firstDoc.value)
  console.log('folderArray.value', folderArray.value)
  console.log('documentArray.value', documentArray.value)

  myResult.value = result.data
}

function showFirstDocs() {
  rows.value = []
  let docsNames = []
  for (const doc of firstDoc.value) {
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

function showSecondDocs() {
  rows1.value = []
  let docsNames = []
  console.log('secondDoc.value', secondDoc.value)
  for (const doc of secondDoc.value) {
    docsNames.push(doc.name)
  }

  console.log('docsNames', docsNames)
  secondDocNames.value = docsNames

  totalCards1.value = docsNames.length
  console.log('numRows1', numRows1.value)

  for (let i = 0; i < numRows1.value; i++) {
    let row = []
    for (let j = 0; j < cardsPerRow; j++) {
      let cardIndex = i * cardsPerRow + j
      if (cardIndex < totalCards1.value) {
        row.push(cardIndex)
      }
    }

    rows1.value.push(row)
    console.log("rows1", rows1)
  }
  console.log(totalCards1.value)

}

onMounted(async () => {
  behind.value = 0
  // getOrdering()
  await getData()
  showFirstDocs()
  console.log('$$$$$$$$$$', totalCards.value)
})

async function goBehind() {
  behind.value = behind.value - 1
  console.log('1111@@@成功')
  switchTo2.value = true
  await getData()
  showFirstDocs()
}

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
  width: 100px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 25px;
  height: 100px !important;
  display: block;
  object-fit: cover;
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
  position: relative;
  border-radius: 10px;
  font-size: 16px;
  /* padding: 10px; */
  transition: top 0.3s ease;
  top: 0;
}



.project-name {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
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
  background-color: #2183bc;
  /* 修改按钮的背景颜色 */
  color: white;
  /* 修改按钮的文本颜色 */
  border-color: #2296c8;
}

.cancel-button {
  background-color: #909399;
  color: white;
  border-color: #909399;
}

.project-actions .el-button {
  padding: 0px;
}

.project-actions {
  margin-right: 10px;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  margin-right: 20px;
  /* 将内容放置在右侧 */
}

.right {
  margin-left: 50px;
}

.small-card {
  width: 150px;
  height: 150px;
  border: none;
  border-radius: 20px;
}

.small-card:hover {
  background-color: #ebecef;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  /* 将按钮靠右对齐 */
}

.head_button {
  margin-left: 10px;
  /* 可选：为按钮之间添加一些间距 */
}
</style>
