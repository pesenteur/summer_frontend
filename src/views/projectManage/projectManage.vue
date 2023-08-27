<template>
  <el-container class="layout-container-demo" style="height: 700px">
    <el-aside width="200px" >
      <el-row class="tac">
        <el-col :span="24">
          <el-menu
              default-active="2"
              class="element-back"
          >
            <el-menu-item index="1">
              <el-icon><icon-menu /></el-icon>
              <span  class="element-deracote">工作项 </span>
            </el-menu-item>
            <el-menu-item index="2">
              <el-icon><icon-menu /></el-icon>
              <span class="element-deracote">项目</span>
            </el-menu-item>
            <el-divider/>
            <el-menu-item index="3">
              <el-icon><icon-menu /></el-icon>
              <span class="element-deracote">项目视图</span>
            </el-menu-item>

            <el-menu-item index="4">

              <span class="element-deracote2" @click="showStage">全部项目</span>
            </el-menu-item>

            <el-menu-item index="5">

              <span class="element-deracote2" @click="showTrash">回收站</span>
            </el-menu-item>

          </el-menu>
        </el-col>
      </el-row>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <div class="toolbar">
              <div>
                <el-button style="margin-right: 8px; margin-top: 0px" @click="dialogFormVisible = true" >新建项目</el-button>
                <el-dialog draggable=true v-model="dialogFormVisible" title="创建一个新的项目:" center width="30%">
                  <el-form :model="form">
                    <el-form-item label="项目名称" :label-width="formLabelWidth">
                      <el-input v-model="form.name" autocomplete="off" class="element-form"/>
                    </el-form-item>

                    <el-form-item label="项目描述" :label-width="formLabelWidth">
                      <el-input v-model="form.describe" autocomplete="off" class="element-form"/>
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
        <projectMain ref="showProjects1" :teamId="team" v-show="ifShowTrash === true"/>
        <projectMainRe ref="showProjects" :teamId="team" v-show="ifShowTrash === false" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import {reactive, ref, watch} from 'vue'
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'
import projectMain from './projectMain.vue'
import projectAPI from '@/api/proj.js'
import router from "@/router";
import projectMainRe from './projectMainRe.vue';

const ifShowTrash  = ref(true)

const dialogFormVisible = ref(false)

const formLabelWidth = '140px'

const team=ref('2145f25c-f9ec-4a42-9b90-1e2fac1b9ddd')

const form = reactive({
  name: '',
  describe:'',
})

const item = {
  date: '2016-05-02',
  name: 'Tom',
  address: 'No. 189, Grove St, Los Angeles',
}
const tableData = ref(Array.from({ length: 20 }).fill(item))

const showProjects = ref(null)
const showProjects1 = ref(null)

  async function addProject() {
    if(form.name === ''){
      dialogFormVisible.value = true
    }else {
      const result = await projectAPI.addProject(form.name, form.describe, team.value);
      dialogFormVisible.value = false
      await router.push('/drag')
      console.log('addProject成功被调用！')
    }
  }

  function showTrash(){
    ifShowTrash.value = false
    console.log('isShowTrash11111',ifShowTrash.value)
  }

  function showStage(){
    ifShowTrash.value = true
    console.log('isShowTrash22222',ifShowTrash.value)
  }

  watch(ifShowTrash, (newVal) => {
    showProjects.value.showProjects()
    showProjects1.value.showProjects1()
  })

</script>

<style scoped>
.element-back{
  background-color: rgba(177,184,191,0.25);
 /* //background-image: url('../../assets/2.jpg'); */
  /* //background-size: cover; */
}
.layout-container-demo .el-header {
  position: relative;
  background-color: white;
  color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
  background-color: rgba(177,184,191,0.25);
  /* //background-image: url('../../assets/2.jpg');
  //background-size: cover; */
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

.element-form{
  width:auto;
  height:auto;
}

</style>
