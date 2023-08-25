<template>

  <el-button type="plain" style="margin-left: 16px;margin-top: 12px" @click="drawer = true" >
    OPEN
  </el-button>


  <el-drawer v-model="drawer" title="SUMMER" :with-header="false" direction="ltr" size="15%">
    <span>SUMMER</span>
    <el-divider/>
    <div class="mb-4" style="display: flex;flex-direction: column;"> 
      <el-button text v-for="button in buttons" :key="button.id" :type="button.type" style="width:100%;margin:0">{{button.text}}</el-button>
    </div>
  </el-drawer>
</template>

<script setup>
import { reactive, ref } from 'vue'
const drawer = ref(false)

const buttons = reactive([
  { id:"001", type: 'plain', text: '项目协作' },
  { id:"002", type: 'plain', text: '原型设计' },
  { id:"003", type: 'plain', text: '???...' },
  { id:"004", type: 'plain', text: '聊天室' },
]) 
</script>
<style scoped>


</style>