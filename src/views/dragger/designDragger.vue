<template>

  <el-container>
    <el-aside width="200px">
      <el-row class="tac">
        <el-col :span="24">
          <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
            <el-sub-menu index="1">
              <template #title>
                <el-icon>
                  <location />
                </el-icon>
                <span>画布视图</span>
              </template>
              <el-menu-item-group title="画布列表">
                <el-menu-item v-for="design in myResult" @click="openDesign(design.id)">
                  画布-{{design.title}}
                </el-menu-item>
              </el-menu-item-group>


            </el-sub-menu>
            <el-menu-item index="2">
<!--              <el-icon><icon-menu /></el-icon>-->
              <span style="margin:auto" @click="dialogFormVisible2 = true">新建画布</span>
              <el-dialog draggable=true v-model="dialogFormVisible2" title="新建画布:" center width="30%">
                <el-form :model="form">
                  <el-form-item label="画布名称" :label-width="formLabelWidth">
                    <el-input v-model="designName" autocomplete="off" class="element-form" />
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

            </el-menu-item>

            <el-menu-item index="3" @click="goPreview">
                <span style="margin:auto">生成预览</span>
            </el-menu-item>

            <el-menu-item index="4" @click="closePreview">
              <span style="margin:auto">删除预览</span>
            </el-menu-item>

            <el-menu-item index="5" @click="goBehind">
              <span style="margin:auto">返回上一级</span>
            </el-menu-item>

            <el-dialog v-model="dialogVisible" title="预览地址" width="30%" draggable>

              <router-link :to="previewPath">{{previewSrc}}</router-link>
              <template #footer>
                <span class="dialog-footer">
                  <el-button @click="dialogVisible = false">取消</el-button>
                  <el-button type="primary" @click="dialogVisible = false">
                    确定
                  </el-button>
                </span>
              </template>
            </el-dialog>

          </el-menu>
        </el-col>
      </el-row>
    </el-aside>

    <el-main>
      <el-tabs
          v-model="editableTabsValue"
          type="card"
          class="demo-tabs"
          closable
          @tab-remove="removeTab"
          @click="changeDesign(editableTabsValue)"
      >
        <el-tab-pane
            v-for="item in editableTabs"
            :key="item.name"
            :label="item.label"
            :name="item.name"

        >
          <div style="position: relative; width: 100%;
               padding-top: calc(100% * 720 / 1280);
               border: 2px rgb(255,255,255) solid;">
            <iframe :src="iframeSrc" title="SUMMER" style="position: absolute; width: 100%; height: 100%; top: 0;">
            </iframe>

          </div>

        </el-tab-pane>
      </el-tabs>

    </el-main>

  </el-container>

</template>

<script setup>

import {onBeforeMount, onMounted, ref} from "vue";
import {getDesignId, getProjId} from "@/utils/token";
import originAPI from '@/api/originDesign';
import previewAPI from '@/api/preview'
import {Location} from "@element-plus/icons-vue";
import form from "mockjs";
import {useRouter} from "vue-router";

const router = useRouter()

const previewSrc = ref('')

const iframeSrc = ref('../../public/static/dist')

const myResult = ref([])

const editableTabsValue = ref('')
const editableTabs = ref([])

const designName = ref()

const dialogFormVisible2 = ref(false)

const formLabelWidth = '140px'

const dialogVisible = ref(false)

function openDesign(designId){
  console.log('designId',designId)
  // editableTabsValue.value = designId

  console.log('out editableTabs.value',editableTabs.value)

  let flag = 1
  for(let i = 0 ; i < editableTabs.value.length ; i++){
    if(editableTabs.value[i].id === designId){
      flag = 0
      break;
    }
  }

  if(flag === 1){
    editableTabsValue.value = designId
    let designTitle = ''
    for(let i = 0 ; i < myResult.value.length ; i++){
      if(myResult.value[i].id === designId){
        designTitle = myResult.value[i].title
        break
      }
    }

    editableTabs.value.push({label:designTitle, id:designId, name:designId})
    console.log('editableTabs.value',editableTabs.value)

    console.log('-----------------------------------------------------------------------')

    changeDesign(designId)
  }
}

async function addDesign() {
  if (designName.value === '') {
    dialogFormVisible2.value = false
  } else {
    const result = await originAPI.addOrigin(designName.value, getProjId())
    console.log('designName', designName.value)
    myResult.value.push({ name: designName.value })
    dialogFormVisible2.value = false
    const result2 = await originAPI.getAllDesign(getProjId())
    myResult.value = result2.data
  }
}

async function get_all_design() {
  const result = await originAPI.getAllDesign(getProjId())
  myResult.value = result.data
}

const previewPath = ref();
async function goPreview(){
  const result = await previewAPI.startPreview(getProjId())
  previewSrc.value = 'http://localhost:5173/preview?project='+getProjId()
  previewPath.value = '/preview?project='+getProjId();
  dialogVisible.value = true
}

async function closePreview(){
  const result = await previewAPI.cancelPreview(getProjId())
  window.alert('预览已关闭，链接失效')

}

function goBehind(){
  router.push('/design')
}

onMounted(async ()=>{
  editableTabs.value = []
  await get_all_design()
  let designTitle = ''
  console.log('myResult 111',myResult.value)

  console.log('getDesignId',getDesignId())

  for(let i = 0 ; i < myResult.value.length ; i++){
    if(myResult.value[i].id === getDesignId()){
      designTitle = myResult.value[i].title
      console.log('myResult.value[i].title',myResult.value[i].title)
    }
  }
  console.log('&&&&!!!title',designTitle)
  // editableTabs.value.push({label:designTitle, id:getDesignId(), name:getDesignId()})
  iframeSrc.value = `../../public/static/dist/index.html?design=${getDesignId()}&project=${getProjId()}`;
  editableTabsValue.value = getDesignId()
  editableTabs.value.push({label:designTitle, id:getDesignId(), name:getDesignId()})
})


function changeDesign(designId){
  console.log('editableTabs',editableTabs.value)
  console.log('designId',designId)
  iframeSrc.value = `../../public/static/dist/index.html?design=${designId}&project=${getProjId()}`;
  console.log('designId',designId)
}

const removeTab = (targetName) => {
  if(editableTabs.value.length !== 1) {
    editableTabsValue.value = targetName
    console.log('targetName', targetName)
    const tabs = editableTabs.value
    console.log('tabs', tabs)
    let activeName = editableTabsValue.value
    console.log('activeName', activeName)
    if (activeName === targetName) {
      console.log('tabs', tabs)

      const newArray = editableTabs.value.filter(item => item.id !== targetName)
      editableTabs.value = newArray

      console.log('new editableTabs.value', editableTabs.value)

      const nextTab = editableTabs.value[0]
      activeName = nextTab.id

      console.log('nextTab.id', nextTab.id)

      changeDesign(activeName)
      editableTabsValue.value = activeName
    }
  }

}

</script>

<style scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
