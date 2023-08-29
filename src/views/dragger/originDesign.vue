<template>
  <el-container class="layout-container-demo" style="height: 500px">
    <el-aside width="200px">
      <el-row class="tac">
        <el-col :span="24">
          <el-menu default-active="2" class="element-back">
            <el-menu-item index="1">
              <div class="menu-item-container">
                <img src="@/assets/imgs/emoji/smiling-face-with-horns.png" alt="!!!" class="image">
                <span class="element-title">{{projName}}</span>
<!--                <el-button :icon="Search" text @click="resetName">-->
<!--                </el-button>-->

                <div>
                  <el-button style="margin-right: 8px; margin-top: 0px" @click="dialogFormVisible = true" :icon="Search" text></el-button>
                  <el-dialog draggable=true v-model="dialogFormVisible" title="修改项目名称:" center width="30%">
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
                  <el-button type="primary" @click="renameProject">
                    确定
                  </el-button>
                </span>
                    </template>
                  </el-dialog>
                </div>

              </div>
            </el-menu-item>
            <el-divider />

            <el-menu-item index="2">
              <div class="menu-item-container">
                <img src="@/assets/imgs/emoji/sparkles.png" alt="!!!" class="image">
                <span class="element-title">项目文档</span>
              </div>
            </el-menu-item>
            <el-divider />

            <el-menu-item index="4">
              <img src="@/assets/imgs/emoji/rainbow.png" alt="!!!" class="image">
              <span class="element-title">页面视图</span>
            </el-menu-item>


          </el-menu>
        </el-col>
      </el-row>
    </el-aside>

    <el-container>
      <el-main>
        <el-scrollbar>
          <el-table :data="tableData" style="width: 100%" max-height="250">
<!--            <el-table-column fixed prop="date" label="" width="150" />-->
            <el-table-column prop="created_time" label="创建时间" width="300" />
            <el-table-column prop="title" label="画布名称" width="300" />
            <el-table-column prop="update_time" label="更新时间" width="300" />
            <el-table-column prop="id" label="画布ID" width="150" />
            <el-table-column fixed="right" label="操作" width="120">
              <template #default="scope">
                <el-button
                    link
                    type="primary"
                    size="small"
                    @click.prevent="intoDesign(scope.row.id)"
                >
                  进入画布
                </el-button>
              </template>
            </el-table-column>
          </el-table>


            <el-button class="mt-4" style="margin-right: 8px; margin-top: 0px; width:100%" @click="dialogFormVisible2 = true" >新建画布</el-button>
            <el-dialog draggable=true v-model="dialogFormVisible2" title="新建画布:" center width="30%">
              <el-form :model="form">
                <el-form-item label="画布名称" :label-width="formLabelWidth">
                  <el-input v-model="designName" autocomplete="off" class="element-form"/>
                </el-form-item>
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


<!--          <el-button class="mt-4" style="width: 100%" @click="onAddDesign"-->
<!--          >新建画布</el-button>-->
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import {onMounted, onUpdated, ref} from 'vue'
import {Menu as IconMenu, Message, Search, Setting} from '@element-plus/icons-vue'
import {reactive} from "vue";
import {getProjectName,getProjId,setDesignId} from '@/utils/token'
import projAPI from '@/api/proj'
import originAPI from '@/api/originDesign'
import {useRouter} from "vue-router";

const router = useRouter()

const form = reactive({
  name: '',
  describe: '',
})

const projName = ref('')
projName.value = getProjectName()

const dialogFormVisible = ref(false)

const dialogFormVisible2 = ref(false)

const formLabelWidth = '140px'

const tableData = ref([])

const designName = ref()

const deleteRow = (index: number) => {
  tableData.value.splice(index, 1)
}

function intoDesign(designId){
  setDesignId(designId)
  console.log('designId',designId)
  router.push('/drag')
  console.log('11111111')
}



async function renameProject() {
  if(form.name === ''){
    dialogFormVisible.value = false
  }else {
    projName.value = form.name
    const result = await projAPI.resetProject(form.name,form.describe)
    dialogFormVisible.value = false
  }
}



async function addDesign() {
  if(designName.value === ''){
    dialogFormVisible2.value = false
  }else {
    const result = await originAPI.addOrigin(designName.value,getProjId())
    console.log('designName',designName.value)
    tableData.value.push({name:designName.value})
    dialogFormVisible2.value = false
    const result2 = await originAPI.getAllDesign(getProjId())
    tableData.value = result2.data
  }
}

onMounted(async ()=>{
  const result = await originAPI.getAllDesign(getProjId())
  tableData.value = result.data
  projName.value = getProjectName()
  console.log('projName',projName.value)
  console.log('result',result)
  console.log('result.data',result.data)
  console.log('result.data.data',result.data.data)
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
  background: var(--el-color-primary-light-8);
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
.menu-item-container {
  display: flex;
  align-items: center;
}

.image {
  width: 24px;
  /* 调整图片宽度 */
  height: 24px;
  /* 调整图片高度 */
  margin-right: 8px;
  /* 添加图片和文字之间的间距 */
}

</style>
