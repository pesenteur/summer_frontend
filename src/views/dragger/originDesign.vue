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
            <span class="element-title" >项目文档</span>
          </div>
        </el-menu-item>
        <el-divider />

        <el-menu-item index="4" @click="seeDesign">
          <div class="menu-item-container">
            <font-awesome-icon :icon="['fas', 'eye']" style="color: #5587dd;" />
            <span class="element-title" >页面视图</span>
          </div>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-main style="height: 100%;">
        <documentShow v-if="switchMenu === false" />
        <el-scrollbar style="height: 100%;" v-else>
          <el-table :data="tableData" style="width: 100%;height: 100%;" max-height="600">
            <!--            <el-table-column fixed prop="date" label="" width="150" />-->
            <el-table-column prop="created_time" label="创建时间" />
            <el-table-column prop="title" label="画布名称" />
            <el-table-column prop="update_time" label="更新时间" />
            <el-table-column fixed="right" label="操作" width="120">
              <template #default="scope">
                <el-button link type="primary" size="small" @click.prevent="intoDesign(scope.row.id)">
                  进入画布
                </el-button>
              </template>
            </el-table-column>
          </el-table>


          <el-button class="mt-4" style="margin-right: 8px; margin-top: 0px; width:100%"
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
import { useRouter,useRoute } from "vue-router";
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
	if(route.query.back !=null){
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
  align-items: center; /* 居中对齐水平方向 */
  justify-content: center; /* 居中对齐垂直方向 */
  height: 100vh; /* 可以根据需要设置高度 */
}

.center-radio-group {
  text-align: center; /* 让el-radio-group内部的文本居中对齐 */
}
</style>
