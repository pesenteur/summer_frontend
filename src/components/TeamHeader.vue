<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <TeamHeader1/>
      </el-aside>
      <el-main>
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
*{
    z-index: 3;
}
</style>