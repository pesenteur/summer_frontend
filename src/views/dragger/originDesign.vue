<template>
  <el-container class="layout-container-demo" style="height: 800px">
    <el-aside width="300px" class="custom-aside">
      <div class="logo">
        <img src="@/assets/logo.webp" alt="Logo">
      </div>
      <el-menu default-active="2" class="element-back">
        <el-menu-item index="1">
          <div class="menu-item-container">
            <font-awesome-icon :icon="['fas', 'signature']" style="color: #5683d2;" />
            <span class="element-title">项目名称：{{ projName }}</span>
          </div>
        </el-menu-item>
        <el-divider />

        <el-menu-item index="2" @click="seeDocs">
          <div class="menu-item-container-2">
            <font-awesome-icon :icon="['fas', 'file-invoice']" style="color: #5587dd;" />
            <span class="element-title">项目文档</span>
          </div>
        </el-menu-item>
        <el-divider />

        <el-menu-item index="4" @click="seeDesign">
          <div class="menu-item-container">
            <font-awesome-icon :icon="['fas', 'eye']" style="color: #5587dd;" />
            <span class="element-title">页面视图</span>
          </div>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-main style="height: 100%;">
        <documentShow v-if="switchMenu === false" />
        <el-scrollbar style="height: 700px;" v-else>
          <el-button class="mt-4" style="margin-right: 8px; margin-top: 0px; width:70%"
            @click="dialogFormVisible2 = true">新建画布</el-button>
          <el-dialog draggable=true v-model="dialogFormVisible2" title="新建画布:" center width="30%">
            <el-form :model="form">
              <el-form-item label="画布名称" :label-width="formLabelWidth">
                <el-input v-model="designName" autocomplete="off" class="element-form" />
              </el-form-item>
              <div class="center-radio-group">
                <el-radio-group class="chooseBox" v-model="ifTemplate">
                  <el-radio label="1" size="large">不使用模板</el-radio>
                  <el-radio label="2" size="large">使用模板</el-radio>
                </el-radio-group>
              </div>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="dialogFormVisible2 = false">
                  取消
                </el-button>
                <el-button type="primary" @click="addDesign">
                  确定
                </el-button>
              </span>
            </template>
          </el-dialog>
          <div class="box">
            <div class="list" v-for="(data,index) in tableData" @click.prevent="intoDesign(data.id)">
              <div class="imgBx">
                <img src="@/assets/2.jpg">
              </div>
              <div class="content">
                <h2 class="rank"><small>#</small>{{ index+1 }}</h2>
                <h4>画布名称：{{ data.title }}</h4>
                <p>创建时间：{{ data.created_time }}</p>
              </div>
            </div>
          </div>
          <!-- <el-table :data="tableData" style="width: 100%;height: 100%;" max-height="600">
            <el-table-column prop="created_time" label="创建时间" />
            <el-table-column prop="title" label="画布名称" />
            <el-table-column prop="update_time" label="更新时间" />
            <el-table-column fixed="right" label="操作" width="120">
              <template #default="scope">
                <el-button link type="primary" size="small" >
                  进入画布
                </el-button>
              </template>
            </el-table-column>
          </el-table> -->
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { onMounted, onUpdated, ref } from 'vue'
import { Document, Menu as IconMenu, Message, Search, Setting } from '@element-plus/icons-vue'
import { reactive } from "vue";
import { getProjectName, getProjId, setDesignId } from '@/utils/token'
import projAPI from '@/api/proj'
import originAPI from '@/api/originDesign'
import { useRouter, useRoute } from "vue-router";
import documentShow from './documentShow.vue'
import editor from '../editor/editor.vue'

const router = useRouter()
const route = useRoute()

const form = reactive({
  name: '',
  describe: '',
})

const switchMenu = ref(true)

const projName = ref('')
projName.value = getProjectName()

const dialogFormVisible = ref(false)

const dialogFormVisible2 = ref(false)

const formLabelWidth = '140px'

const tableData = ref([])

const designName = ref()

const ifTemplate = ref('')

// const deleteRow = (index: number) => {
//   tableData.value.splice(index, 1)
// }


function seeDocs() {
  switchMenu.value = false

}

function seeDesign() {
  switchMenu.value = true
}

function intoDesign(designId) {
  setDesignId(designId)
  console.log('designId', designId)
  router.push('/drag')
  console.log('11111111')
}

async function addDesign() {
  console.log('ifTemplate', ifTemplate.value)
  if (ifTemplate.value === '1') {
    console.log('ifTemplate1', ifTemplate.value)
    if (designName.value === '') {
      dialogFormVisible2.value = true
    } else {
      const result = await originAPI.addOrigin(designName.value, getProjId())
      console.log('designName', designName.value)
      tableData.value.push({ name: designName.value })
      dialogFormVisible2.value = false
      const result2 = await originAPI.getAllDesign(getProjId())
      tableData.value = result2.data
    }
  } else if (ifTemplate.value === '2') {
    console.log('ifTemplate2', ifTemplate.value)

    // const result = await originAPI.addOrigin(designName.value, getProjId())
    console.log('designName', designName.value)
    tableData.value.push({ name: designName.value })
    dialogFormVisible2.value = false
    const result2 = await originAPI.getAllDesign(getProjId())
    tableData.value = result2.data

    await router.push(`/origin/template/${designName.value}`)
    dialogFormVisible2.value = false
  }

  // if (designName.value === '') {
  //   dialogFormVisible2.value = true
  // } else {
  //   const result = await originAPI.addOrigin(designName.value, getProjId())
  //   console.log('designName', designName.value)
  //   tableData.value.push({ name: designName.value })
  //   dialogFormVisible2.value = false
  //   const result2 = await originAPI.getAllDesign(getProjId())
  //   tableData.value = result2.data
  // }
}

onMounted(async () => {
  const result = await originAPI.getAllDesign(getProjId())
  tableData.value = result.data
  projName.value = getProjectName()
  if (route.query.back != null) {
    switchMenu.value = false
  }
  console.log('projName', projName.value)
  console.log('result', result)
  console.log('result.data', result.data)
  console.log('result.data.data', result.data.data)
  console.log('onMounted')
})

</script>

<style scoped>
.layout-container-demo .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}

.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: white;
}

.layout-container-demo .el-menu {
  border-right: none;
}

.layout-container-demo .el-main {
  padding: 0;
}

.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}

font-awesome-icon {
  size: 20px;
}

.custom-aside {
  background-color: #2a2a2a;
  color: #fff;
}

.logo {
  text-align: center;
  margin-bottom: 20px;
}

.logo img {
  max-width: 100%;
  height: auto;
}

.menu-item-container {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 10px 0;
  margin-left: 10px;
  font-size: 30px;
}

.menu-item-container-2 {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 10px 0;
  margin-left: 15px;
  font-size: 30px;
}

.menu-icon {
  width: 24px;
  height: 24px;
  margin-right: 10px;
}

.element-title {
  font-size: 16px;
  margin-left: 15px;
  font-weight: bold;
}

.center-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* 居中对齐水平方向 */
  justify-content: center;
  /* 居中对齐垂直方向 */
  height: 100vh;
  /* 可以根据需要设置高度 */
}

.center-radio-group {
  text-align: center;
  /* 让el-radio-group内部的文本居中对齐 */
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}


h3 {
  font-size: 1.75em;
  color: #333;
  margin-bottom: 20px;
}

.box {
  align-items: center;
  position: relative;
  width: 100%;
  max-height: 200px;
}

.box .list {
  width: 70%;
  position: relative;
  display: flex;
  padding: 10px;
  border-radius: 10px;
  margin-left: 200px;
  cursor: pointer;
  transition: 0.5s;
  overflow: hidden;
  background-color: #fff;
}

.box:hover .list {
  filter: blur(5px);
  opacity: 0.25;
}

.box .list:hover {
  box-shadow: -10px 20px 35px rgba(0, 0, 0, 0.15);
  transform: scale(1.15);
  filter: blur(0);
  opacity: 1;
}

.box .list .imgBx {
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 10px;
  overflow: hidden;
  margin-right: 10px;
}

.box .list .imgBx img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.box .list .content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #333;
}

.box .list .content .rank {
  position: absolute;
  right: -50px;
  color: #03a9f4;
  transition: 0.5s;
  font-size: 2em;
}

.box .list .content .rank small {
  font-weight: 500;
  opacity: 0.25;
}

.box .list:hover .content .rank {
  right: 20px;
}

.box .list .content h4 {
  line-height: 1.2em;
  font-weight: 600;
}

.box .list .content p {
  font-size: 0.75em;
}

@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 200;
  font-display: swap;
  src: url(../fonts/pxiByp8kv8JHgFVrLFj_Z11lFc-K.woff2) format('woff2');
  unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB;
}

/* latin-ext */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 200;
  font-display: swap;
  src: url(../fonts/pxiByp8kv8JHgFVrLFj_Z1JlFc-K.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}

/* latin */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 200;
  font-display: swap;
  src: url(../fonts/pxiByp8kv8JHgFVrLFj_Z1xlFQ.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

/* devanagari */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url(../fonts/pxiByp8kv8JHgFVrLDz8Z11lFc-K.woff2) format('woff2');
  unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB;
}

/* latin-ext */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url(../fonts/pxiByp8kv8JHgFVrLDz8Z1JlFc-K.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}

/* latin */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url(../fonts/pxiByp8kv8JHgFVrLDz8Z1xlFQ.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

/* devanagari */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(../fonts/pxiEyp8kv8JHgFVrJJbecmNE.woff2) format('woff2');
  unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB;
}

/* latin-ext */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(../fonts/pxiEyp8kv8JHgFVrJJnecmNE.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}

/* latin */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(../fonts/pxiEyp8kv8JHgFVrJJfecg.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

/* devanagari */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url(../fonts/pxiByp8kv8JHgFVrLGT9Z11lFc-K.woff2) format('woff2');
  unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB;
}

/* latin-ext */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url(../fonts/pxiByp8kv8JHgFVrLGT9Z1JlFc-K.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}

/* latin */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url(../fonts/pxiByp8kv8JHgFVrLGT9Z1xlFQ.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

/* devanagari */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url(../fonts/pxiByp8kv8JHgFVrLEj6Z11lFc-K.woff2) format('woff2');
  unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB;
}

/* latin-ext */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url(../fonts/pxiByp8kv8JHgFVrLEj6Z1JlFc-K.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}

/* latin */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url(../fonts/pxiByp8kv8JHgFVrLEj6Z1xlFQ.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

/* devanagari */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(../fonts/pxiByp8kv8JHgFVrLCz7Z11lFc-K.woff2) format('woff2');
  unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB;
}

/* latin-ext */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(../fonts/pxiByp8kv8JHgFVrLCz7Z1JlFc-K.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}

/* latin */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(../fonts/pxiByp8kv8JHgFVrLCz7Z1xlFQ.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

/* devanagari */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 800;
  font-display: swap;
  src: url(../fonts/pxiByp8kv8JHgFVrLDD4Z11lFc-K.woff2) format('woff2');
  unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB;
}

/* latin-ext */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 800;
  font-display: swap;
  src: url(../fonts/pxiByp8kv8JHgFVrLDD4Z1JlFc-K.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}

/* latin */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 800;
  font-display: swap;
  src: url(../fonts/pxiByp8kv8JHgFVrLDD4Z1xlFQ.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

/* devanagari */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 900;
  font-display: swap;
  src: url(../fonts/pxiByp8kv8JHgFVrLBT5Z11lFc-K.woff2) format('woff2');
  unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB;
}

/* latin-ext */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 900;
  font-display: swap;
  src: url(../fonts/pxiByp8kv8JHgFVrLBT5Z11lFc-K.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}

/* latin */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 900;
  font-display: swap;
  src: url(../fonts/pxiByp8kv8JHgFVrLBT5Z1xlFQ.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

.el-main {
  align-items: center;
  text-align: center;
}
</style>
