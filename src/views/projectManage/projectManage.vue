
<template>
  <el-container class="layout-container-demo" style="height: 700px">
    <el-aside width="200px">
      <el-row class="tac">
        <el-col :span="24">
          <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
            <el-sub-menu index="1">
              <template #title>
                <font-awesome-icon class="icon" :icon="['fas', 'diagram-project']" />
                <span>项目视图</span>
              </template>
              <el-menu-item-group title="Group One">
                <el-menu-item @click="showStage" index="1-1">
                  <font-awesome-icon class="icon" :icon="['fas', 'border-all']" />
                  <span class="all_project">全部项目</span>
                </el-menu-item>
                <el-menu-item @click="showTrash" index="1-2">
                  <font-awesome-icon class="icon" :icon="['fas', 'recycle']" />
                  <span class="">回收站</span>
                </el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
          </el-menu>
        </el-col>
      </el-row>
    </el-aside>
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <div class="toolbar">
          <form class="search-bar" @submit.prevent>
            <input v-model="searchName" size="small" placeholder="Project Name...."
              @input="queryAllProject(searchName)" />
            <button><i class='bx bx-search'></i></button>
          </form>
        </div>
        <div class="toolbar-right">
          <el-dropdown trigger="click">
            <el-button type="primary">
               排序<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <div class="mb-2 flex items-center text-sm">
                  <el-radio-group v-model="radio1" class="ml-4" @change="handleClose">
                    <el-radio label="1" size="large">名称</el-radio>
                    <el-radio label="2" size="large">创建时间</el-radio>
                    <el-radio label="3" size="large">更新时间</el-radio>
                  </el-radio-group>
                </div>
                <div class="my-2 flex items-center text-sm" @change="handleClose">
                  <el-radio-group v-model="radio2" class="ml-4">
                    <el-radio label="1">递增</el-radio>
                    <el-radio label="2">递减</el-radio>
                  </el-radio-group>
                </div>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <div>
            <el-button style="margin-right: 8px; margin-top: 0px" @click="dialogFormVisible = true">新建项目</el-button>
            <el-dialog draggable=true v-model="dialogFormVisible" title="创建一个新的项目:" center width="30%">
              <el-form :model="form">
                <el-form-item label="项目名称" :label-width="formLabelWidth">
                  <el-input v-model="form.name" autocomplete="off" class="element-form" />
                </el-form-item>
                <el-form-item label="项目描述" :label-width="formLabelWidth">
                  <el-input v-model="form.describe" autocomplete="off" class="element-form" />
                </el-form-item>
              </el-form>
              <template #footer>
                <span class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">
                    取消
                  </el-button>
                  <el-button type="primary" @click="addProject">
                    确定
                  </el-button>
                </span>
              </template>
            </el-dialog>
          </div>
        </div>
      </el-header>

      <el-main>
        <projectMain ref="childFunctions1" :teamId="team" :ordering="ordering" :radio1="radio1" :radio2="radio2" v-show="ifShowTrash === true" />
        <projectMainRe ref="childFunctions2" :teamId="team" v-show="ifShowTrash === false" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import {computed, reactive, ref, watch} from 'vue'
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'
import projectMain from './projectMain.vue'
import projectAPI from '@/api/proj.js'
import router from "@/router";
import projectMainRe from './projectMainRe.vue';
import { getTeamId, setProjectName, setProjId } from "@/utils/token";
import teamFunction from "@/api/team";

const childFunctions1 = ref(null)

const childFunctions2 = ref(null)

const ifShowTrash = ref(true)

const dialogFormVisible = ref(false)

const formLabelWidth = '140px'

// const team=ref('2145f25c-f9ec-4a42-9b90-1e2fac1b9ddd')

const team = ref('')
team.value = getTeamId()

const radio1 = ref('2')
const radio2 = ref('2')

const ordering = computed(()=>{
  if(radio1.value === "1" && radio2.value === "1"){
    return 'name'
  }else if(radio1.value === "1" && radio2.value === "2"){
    return '-name'
  }else if(radio1.value === "2" && radio2.value === "1"){
    return 'create_time'
  }else if(radio1.value === "2" && radio2.value === "2"){
    return '-create_time'
  }else if(radio1.value === "3" && radio2.value === "1"){
    return 'update_time'
  }else if(radio1.value === "3" && radio2.value === "2"){
    return '-update_time'
  }else{
    return 'wrong'
  }
})


const form = reactive({
  name: '',
  describe: '',
})

const item = {
  date: '2016-05-02',
  name: 'Tom',
  address: 'No. 189, Grove St, Los Angeles',
}
const tableData = ref(Array.from({ length: 20 }).fill(item))

const showProjects = ref(null)
const showProjects1 = ref(null)

const searchName = ref()

async function queryAllProject(searchName) {
  let ordering = 'create_time'
  const result = await projectAPI.getAllProjects(getTeamId(), ordering)

  console.log('***********Projectsresult***********')
  console.log(result.data)
  console.log('***********result***********')
  childFunctions1.value.getSearch(searchName)
  childFunctions1.value.showProjects1()


}

async function handleClose(){
  // childFunctions1.value.getOrdering()
  console.log('$ordering')
  await childFunctions1.value.getData()
  childFunctions1.value.showProjects1()

}


async function addProject() {
  if (form.name === '') {
    dialogFormVisible.value = true
  } else {
    const result = await projectAPI.addProject(form.name, form.describe, team.value);
    dialogFormVisible.value = false
    setProjId(result.data.id)
    setProjectName(form.name)
    await router.push('/design')
    console.log('addProject成功被调用！')
  }
}

function showTrash() {
  ifShowTrash.value = false
  console.log('isShowTrash11111', ifShowTrash.value)
}

function showStage() {
  ifShowTrash.value = true
  console.log('isShowTrash22222', ifShowTrash.value)
}

watch(ifShowTrash, async (newVal) => {
  await childFunctions2.value.getData()
  childFunctions2.value.showProjects()
  await childFunctions1.value.getData()
  childFunctions1.value.showProjects1()
})

watch(radio1,()=>{
  console.log('radio1.watch',radio1.value)
})

</script>

<style scoped>
.icon {
  margin-right: 5px;
}

.layout-container-demo .el-header {
  position: relative;
  background-color: white;
  color: var(--el-text-color-primary);
}


.layout-container-demo .el-menu {
  border-right: none;
}

.layout-container-demo .el-main {
  padding: 0;
}

.layout-container-demo .toolbar {
  /* display: inline-flex; */
  align-items: center;
  display: flex;
  margin-left: 15px;
  margin-top: 20px;
  justify-content: space-between;
  height: 100%;
}

.element-form {
  width: auto;
  height: auto;
}

.search-bar {
  height: 30px;
  background-color: transparent;
  border: 2px solid #2a6bc8;
  border-radius: 6px;
  display: flex;
  align-items: center;
}

.search-bar input {
  width: 100%;
  background-color: transparent;
  border: none;
  outline: none;
  color: #2a6bc8;
  font-size: 16px;
  padding-left: 10px;
}

.search-bar button {
  width: 40px;
  height: 100%;
  background: transparent;
  outline: none;
  border: none;
  color: #2a6bc8;
  cursor: pointer;
}

.search-bar input::placeholder {
  color: #2a6bc8;
}

.search-bar button i {
  font-size: 22px;
}

.toolbar-right {
  display: flex;
  align-items: center;
}

.new-project-button {
  margin-left: 10px;
}
</style>
