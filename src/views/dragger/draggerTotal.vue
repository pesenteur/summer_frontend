<template>
  <el-container class="layout-container-demo" style="height: 800px">
    <el-aside width="200px">
      <el-row class="tac">
        <el-col :span="24">
          <el-menu default-active="2" class="element-back">
            <el-menu-item index="1">
              <div class="menu-item-container">
                <img src="@/assets/imgs/emoji/smiling-face-with-horns.png" alt="!!!" class="image">
                <span class="element-title">{{ projectName }}</span>
                <el-button :icon="Search">
                </el-button>
              </div>
            </el-menu-item>
            <el-divider />

            <el-menu-item index="2">
              <div class="menu-item-container">
                <img src="@/assets/imgs/emoji/sparkles.png" alt="!!!" class="image">
                <span class="element-title" @click="jump">项目文档</span>
              </div>
            </el-menu-item>
            <el-divider />

            <el-menu-item index="3">

<!--              <div>-->
<!--                <el-button style="margin-right: 8px; margin-top: 0px;" @click="dialogFormVisible = true" >新建画布</el-button>-->
<!--                <el-dialog z-index="999999" :draggable=true v-model="dialogFormVisible" title="创建一个新的画布:" center width="30%">-->
<!--                  <el-form :model="form">-->
<!--                    <el-form-item label="画布名称" :label-width="formLabelWidth">-->
<!--                      <el-input v-model="form.name" autocomplete="off" class="element-form"/>-->
<!--                    </el-form-item>-->

<!--                    <el-form-item label="画布描述" :label-width="formLabelWidth">-->
<!--                      <el-input v-model="form.describe" autocomplete="off" class="element-form"/>-->
<!--                    </el-form-item>-->

<!--                  </el-form>-->
<!--                  <template #footer>-->
<!--                <span class="dialog-footer">-->
<!--                  <el-button @click="dialogFormVisible = false">-->
<!--                    取消-->
<!--                  </el-button>-->
<!--                  <el-button type="primary" @click="addCanvas">-->
<!--                    确定-->
<!--                  </el-button>-->
<!--                </span>-->
<!--                  </template>-->
<!--                </el-dialog>-->
<!--              </div>-->


              <div class="menu-item-container">
                <img src="@/assets/imgs/emoji/sparkles.png" alt="!!!" class="image">
                <span class="element-title" @click="addCanvas">新建画布</span>
              </div>
            </el-menu-item>
            <el-divider />

            <el-menu-item index="4">
              <img src="@/assets/imgs/emoji/rainbow.png" alt="!!!" class="image">
              <span class="element-title">页面视图</span>
            </el-menu-item>

            <!--            <el-menu-item index="4">-->

            <div class="mb-4" style="display: flex;flex-direction: column;">

              <el-menu-item v-for="page in pages" :key="page.id" index="4">

                <el-button class="mb-4" text style="width:100%;margin:0">{{ page.text }}</el-button>

              </el-menu-item>
            </div>
            <!--            </el-menu-item>-->


          </el-menu>
        </el-col>
      </el-row>
    </el-aside>

    <el-main>
      <el-scrollbar>
        <div style="position: relative; width: 100%;
               padding-top: calc(100% * 720 / 1280);
               border: 2px rgb(255,255,255) solid;">
          <iframe :src="iframeSrc" title="SUMMER" style="position: absolute; width: 100%; height: 100%; top: 0;">
          </iframe>
        </div>
      </el-scrollbar>
    </el-main>
  </el-container>
</template>

<script setup>
import {computed, onMounted, reactive, ref} from 'vue'
import { Menu as IconMenu, Message, Search, Setting } from '@element-plus/icons-vue'

import { useRoute, useRouter } from "vue-router";

import editor from '../editor/editor.vue'
import projectAPI from "@/api/proj";
import originAPI from '@/api/originDesign'
import form from "mockjs";
import {getProjId} from "@/utils/token";

const dialogFormVisible = ref(false)

const router = useRouter()

const projectName = ref('')

const formLabelWidth = '140px'

const iframeSrc = computed(() => {
  return `../../public/dist/index.html?id=${pageId.value}`;
});

const pageId = ref('1')

const pages = reactive([
  { id: '1', type: 'plain', text: '画布' },
])

const item = {
  date: '2016-05-02',
  name: 'Tom',
  address: 'No. 189, Grove St, Los Angeles',
}
const tableData = ref(Array.from({ length: 20 }).fill(item))


// async function addCanvas() {
//   if(form.name === ''){
//     dialogFormVisible.value = true
//   }else {
//     const result = await projectAPI.addProject(form.name, form.describe, team.value);
//     dialogFormVisible.value = false
//     await router.push('/drag')
//     console.log('addProject成功被调用！')
//   }
// }

async function addCanvas() {

  const result = await originAPI.addOrigin()
  const page = { id: (parseInt(pageId.value) + 1).toString(), type: 'plain', text: '画布' }
  pages.push(page)
}

function jump() {
  router.push('/document')
}

// onMounted(async ()=>{
//   const result = await originAPI.getSaveData(getProjId())
//
// })
</script>

<style scoped>
.element-back {
  background-color: #ffffff;
}

.layout-container-demo .el-header {
  position: relative;
  background-color: white;
  color: var(--el-text-color-primary);
}

.layout-container-demo .el-aside {
  opacity: 0.15;
  background-image: url('../../assets/2.jpg');
  background-size: cover;
}

.layout-container-demo .el-menu {
  border-right: none;
}

.layout-container-demo .el-main {
  padding: 0;
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

.element-title {
  font-size: 16px;
  /* 调整文字大小 */
}</style>
