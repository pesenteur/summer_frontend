<template>
  <el-container class="layout-container-demo" style="height: 500px">
    <el-aside width="200px" >
      <el-row class="tac">
        <el-col :span="24">


          <el-menu
              default-active="2"
              class="element-back"
          >
            <el-menu-item  index="1">
              <div class="menu-item-container">
                <img src="@/assets/imgs/emoji/smiling-face-with-horns.png" alt="!!!" class="image">
                <span class="element-title">{{projectName}}</span>
                <el-button :icon="Search">
                </el-button>
              </div>
            </el-menu-item>
            <el-divider/>
            <el-menu-item index="2">
              <div class="menu-item-container">
                <img src="@/assets/imgs/emoji/sparkles.png" alt="!!!" class="image">
                <span class="element-title" @click="addCanvas">新建画布</span>
              </div>
            </el-menu-item>
            <el-divider/>

            <el-menu-item index="3">
              <img src="@/assets/imgs/emoji/rainbow.png" alt="!!!" class="image">
              <span class="element-title">页面视图</span>
            </el-menu-item>

<!--            <el-menu-item index="4">-->

              <div class="mb-4" style="display: flex;flex-direction: column;">

                <el-menu-item v-for="page in pages" :key="page.id" index="4">

                  <el-button class="mb-4" text style="width:100%;margin:0" >{{page.text}}</el-button>

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
            <iframe :src="iframeSrc" title="SUMMER"
                    style="position: absolute; width: 100%; height: 100%; top: 0;">
            </iframe>
          </div>
        </el-scrollbar>
      </el-main>
    </el-container>

</template>

<script setup>
import {computed, reactive, ref} from 'vue'
import {Menu as IconMenu, Message, Search, Setting} from '@element-plus/icons-vue'
import router from "@/router";

const projectName = ref('')

const iframeSrc = computed(() => {
  return `../../public/dist/index.html?id=${pageId.value}`;
});

const pageId = ref('1')

const pages = reactive([
  {id:'1',type:'plain',text:'画布'},
])

const item = {
  date: '2016-05-02',
  name: 'Tom',
  address: 'No. 189, Grove St, Los Angeles',
}
const tableData = ref(Array.from({ length: 20 }).fill(item))

function addCanvas(){
  const page = {id:(parseInt(pageId.value)+1).toString(),type:'plain',text:'画布'}
  pages.push(page)
}

</script>

<style scoped>
.element-back{
  background-color: #ffffff;
}
.layout-container-demo .el-header {
  position: relative;
  background-color: white;
  color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
  background-color: white;
//background-image: url('../../assets/2.jpg');
//background-size: cover;
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
  width: 24px; /* 调整图片宽度 */
  height: 24px; /* 调整图片高度 */
  margin-right: 8px; /* 添加图片和文字之间的间距 */
}

.element-title {
  font-size: 16px; /* 调整文字大小 */
}
</style>
