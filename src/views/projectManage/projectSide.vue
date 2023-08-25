<template>
    <el-col :span="25">
      <h5 class="mb-2"></h5>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >

        

        <div class="mb-4" style="display: flex;flex-direction: column;"> 
          <el-button text v-for="button in buttons" :key="button.id" :type="button.type" style="width:100%;margin:0">{{button.text}}</el-button>
        </div>

        <el-divider/>
        <div class="mb-4" style="display: flex;flex-direction: column;"> 
          <el-button text v-for="button in buttons" :key="button.id" :type="button.type" style="width:100%;margin:0">{{button.text}}</el-button>
        </div>
      </el-menu>
    </el-col>
    
</template>

<script setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import { reactive } from 'vue'

const buttons = reactive([
  {id:'001',type:'plain',text:'工作项'},
  {id:'002',type:'plain',text:'项目'},
])

const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}
</script>
