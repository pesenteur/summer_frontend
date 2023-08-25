<script setup>
  import projectNameHeader from './projectNameHeader.vue'
  import {ref} from "vue";

  const name=ref('asd')
  const content=ref('aaaaaaaaa')
</script>

<template>
  <el-col>
    <div>
      <el-card>
        <el-container>
          <el-header>
            <projectNameHeader/>
          </el-header>

            <div>
              <div>项目创建人:<i class="el-icon-edit"></i>{{name}}</div>
              <div>项目描述:{{content}}</div>
            </div>

        </el-container>
      </el-card>
    </div>
  </el-col>

</template>

<style scoped>

</style>