<template>

    <div>
      <el-button text round style="margin-right: 8px; margin-top: 0px" @click="dialogFormVisible = true"><el-icon><CirclePlusFilled /></el-icon></el-button>
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

</template>

<script setup>
import {reactive, ref} from 'vue'
import {CircleCloseFilled, CirclePlusFilled, Menu as IconMenu, Message, Setting} from '@element-plus/icons-vue'
import projectMain from './projectMain.vue'
import projectAPI from '@/api/proj.js'
import router from "@/router";

const dialogFormVisible = ref(false)

const formLabelWidth = '140px'

const team=ref('2145f25c-f9ec-4a42-9b90-1e2fac1b9ddd')

const form = reactive({
  name: '',
  describe:'',
})

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
</script>

<style>
.element-back{
  background-color: rgba(177,184,191,0.25);
//background-image: url('../../assets/2.jpg');
//background-size: cover;
}
.layout-container-demo .el-header {
  position: relative;
  background-color: white;
  color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
  background-color: rgba(177,184,191,0.25);
//background-image: url('../../assets/2.jpg');
//background-size: cover;
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