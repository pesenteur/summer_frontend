<template>

  <el-tabs
      v-model="editableTabsValue"
      type="card"
      class="demo-tabs"
      closable
      @click="changeDesign(editableTabsValue)"
  >
    <el-tab-pane
        v-for="(item,index) in editableTabs"
        :label="item.label"
        :name="index"
    >
      <div style="position: relative; width: 100%;
               padding-top: calc(100% * 720 / 1280);
               border: 2px rgb(255,255,255) solid;">
        <iframe :src="iframeSrc" title="SUMMER" style="position: absolute; width: 100%; height: 100%; top: 0;">
        </iframe>

      </div>

    </el-tab-pane>
  </el-tabs>


</template>

<script setup>

import {onMounted, ref} from "vue";
import {getDesignId, getProjId} from "@/utils/token";
import originAPI from '@/api/originDesign'

const iframeSrc = ref('../../public/dist')

const myResult = ref([])

onMounted(async ()=>{

  const result = await originAPI.getAllDesign(getProjId())
  myResult.value = result.data
  for(let i = 0;i<result.data.length;i++){
    console.log('loop:result.data.title',result.data[i].title)
    editableTabs.value.push({label:result.data[i].title,id:result.data[i].id})
  }
  console.log(editableTabs)
  iframeSrc.value = `../../public/dist/index.html?design=${getDesignId()}&project=${getProjId()}`;
  console.log('11111111111111111111111111111111111111111getDesignId',getDesignId())
})

const editableTabsValue = ref('0')
const editableTabs = ref([])


function changeDesign(designPosition){
  console.log('editableTabs',editableTabs.value)
  console.log("sad",designPosition)
  let designId = editableTabs.value[designPosition].id
  console.log('designId',designId)
  iframeSrc.value = `../../public/dist/index.html?design=${designId}&project=${getProjId()}`;
  console.log('editableTabsValue[designPosition].id',editableTabs.value[designPosition].id)
  console.log('designPosition',designPosition)
  console.log('designId',designId)
}



</script>

<style>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
