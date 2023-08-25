<template>

  <img  src="@/assets/甜甜圈.svg" @click="drawer = true" class="img-decorate">
<!--  <el-button type="plain" style="margin-left: 16px;margin-top: 12px" @click="drawer = true" >-->
<!--    <i class="el-icon-custom expand-icon"></i>-->
<!--  </el-button>-->


  <el-drawer v-model="drawer" title="SUMMER" :with-header="false" direction="ltr" size="15%">
    <span>SUMMER</span>
    <el-divider/>
    <div class="mb-4" style="display: flex;flex-direction: column;"> 
      <el-button text v-for="button in buttons" :key="button.id" :type="button.type" style="width:100%;margin:0" @click="jump(button.id)">{{button.text}}</el-button>
    </div>
  </el-drawer>
</template>

<script setup>
import { reactive, ref } from 'vue'
import router from "@/router";
const drawer = ref(false)

const buttons = reactive([
  { id:"001", type: 'plain', text: '项目协作' },
  { id:"002", type: 'plain', text: '原型设计' },
  { id:"003", type: 'plain', text: '团队管理' },
  { id:"004", type: 'plain', text: '聊天室' },
])

function jump(buttonId) {
  if(buttonId === '001'){
    drawer.value = !drawer.value
    router.push('/project')
  }else if(buttonId === '002'){
    drawer.value = !drawer.value
    router.push('/')
  }else if(buttonId === '003'){
    drawer.value = !drawer.value
    router.push('/member')
  }else if(buttonId === '004'){
    drawer.value = !drawer.value
    router.push('/')
  }else{
    router.push('/')
  }

}

</script>


<style scoped>
.img-decorate{

  margin:auto;
  width:20px;
  height:auto;

  position: absolute;
  top: 50%;
  left: 2%;


}



</style>