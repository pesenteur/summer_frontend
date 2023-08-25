<template>
  <el-button type="plain" style="margin-left: 16px" @click="drawer = true" >
    OPEN
  </el-button>

  <el-drawer v-model="drawer" title="SUMMER" :with-header="false" direction="ltr" size="15%">
    <span>SUMMER</span>
    <el-divider/>
    <div class="button-container"> 
      <el-button text v-for="button in buttons" :key="button.id" :type="button.type">{{button.text}}</el-button>
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
.button-container{
  display: flex;
  justify-content: center; /* 在主轴上居中 */
  align-items: center; /* 在交叉轴上居中 */
  flex-direction: column; /* 纵向排列按钮 */
}

</style>