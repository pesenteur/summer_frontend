<script setup>
  import {ref} from "vue";

  const name=ref('SUMMER')

  function changeProjectName(){
    name.value = 'niubi'
  }

</script>

<template>
  <el-container>
    <el-aside width="200px">
      <img src="@/assets/cat1.png" alt="avatar" class="image">
    </el-aside>
    <el-main>
      <span class="demo">{{name}}</span>
      <div>
        <el-button type="info" @click="changeProjectName">
          修改项目名称
        </el-button>
      </div>

    </el-main>
  </el-container>
</template>

<style scoped>
.image{
  width:50px;
  height:50px;
  margin: auto;
  border-radius: 50%; /* 将边框半径设置为50%，使图像变成圆形 */
  overflow: hidden; /* 隐藏超出边界的部分 */
}

.demo{


}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>