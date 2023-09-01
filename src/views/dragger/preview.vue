<template>

  <el-carousel :interval="4000" type="card" height="600px" >

    <el-carousel-item v-for="item in myResult" :key="item.id" >
      <img :src="item.image" alt="图片正在加载中">
    </el-carousel-item>
  </el-carousel>

</template>

<script setup>
import {onMounted, ref} from "vue";
import previewAPI from '@/api/preview'
import {getProjId} from "@/utils/token";

const myResult = ref([])

const image1 = ref('')

onMounted(async ()=>{
  const result = await previewAPI.attainPreview(getProjId())
  myResult.value = result.data
  console.log('preview result.data',result.data)
  console.log('image',myResult.value[0].image)

})

</script>


<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #99a9bf;
  padding: 0px 20px 20px;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 20px 20px;
}

img{
  max-width: 100%;
  max-height: 100%;
}
</style>