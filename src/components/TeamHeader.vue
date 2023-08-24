<template>
  <div class="common-layout">
    <el-container>
      <el-aside class="aside" width="200px">
        <TeamHeader1/>
      </el-aside>
      <el-main class="main">
        <TeamHeader2/>
      </el-main>
    </el-container>
  </div>
</template>


<script setup>
    import TeamHeader1 from './TeamHeader1.vue'
    import TeamHeader2 from './TeamHeader2.vue'
</script>

<style>
.aside {
position: fixed;
top: 0;
left: 0;
width: 100%;
z-index: 999;
}
.main{
  position: fixed;
top: 0;
left: 0;
width: 100%;
z-index: 999;
}
</style>