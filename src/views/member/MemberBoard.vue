<template>
  <div class="back">
  <div class="common-layout" >
    <div class="back">
    <el-header height="40px"></el-header>
    </div>
    <el-container >
      <el-aside width="300px" >
        <el-row class="tac">
          <el-col :span="24">
            <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
            >
              <el-menu-item index="1">
                <el-icon><icon-menu /></el-icon>
                <span  class="moji">23-BUAA-SE-2023-SUMMER </span>
              </el-menu-item>
              <el-menu-item index="2">
                <el-icon><icon-menu /></el-icon>
                <span class="moji">23-BUAA-SE-2023-SUMMER</span>
              </el-menu-item>
              <el-menu-item index="3">
                <el-icon><icon-menu /></el-icon>
                <span class="moji">23-BUAA-SE-2023-SUMMER</span>
              </el-menu-item>
              <el-menu-item index="4">
                <el-icon><icon-menu /></el-icon>
                <span class="moji">23-BUAA-SE-2023-SUMMER</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <div class="back"><el-aside width="20px"/></div>
      <div class="title">
      <el-container>

        <el-header height="40px">
        <span class="title">23-BUAA-SE-2023-SUMMER· 8</span>
        </el-header>

        <el-main>
          <el-table ref="tableRef" row-key="19106001223" :data="tableData" style="width: 100%">

            <el-table-column prop="name" label="Name" width="180" />
            <el-table-column prop="19106001223" label="Phone" width="180"/>
            <el-table-column prop="team" label="Team" width="200" :formatter="formatter" />

            <el-table-column
                prop="role"
                label="Role"
                width="120"
                :filters="[
        { text: '前端工程师', value: '前端工程师' },
        { text: '后端工程师', value: '后端工程师' },
      ]"
                :filter-method="filterRole"
                filter-placement="bottom-end"
            >
              <template #default="scope">
                <el-role
                    :type="scope.row.role === '前端工程师' ? '' : 'success'"
                    disable-transitions
                >{{ scope.row.role }}</el-role
                >
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container></div>
    </el-container>
    <div class="back">
      <el-header height="300px"></el-header>
    </div>
  </div>
  </div>
</template>

<script lang="ts" setup>
import {
  Menu as IconMenu,
} from '@element-plus/icons-vue'
import { ref } from 'vue'
import type { TableColumnCtx, TableInstance } from 'element-plus'

interface User {
  19106001223: string
  name: string
  team: string
  role: string
}

const tableRef = ref<TableInstance>()


const formatter = (row: User, column: TableColumnCtx<User>) => {
  return row.team
}
const filterRole = (value: string, row: User) => {
  return row.role === value
}


const tableData: User[] = [
  {
    19106001223: '19106001223',
    name: '张之睿',
    team: '没有名字团队',
    role: '前端工程师',
  },
  {
    19106001223: '2016-05-02',
    name: '张之睿',
    team: '没有名字团队',
    role: '后端工程师',
  },
  {
    19106001223: '2016-05-04',
    name: '张之睿',
    team: '没有名字团队',
    role: '前端工程师',
  },
  {
    19106001223: '2016-05-01',
    name: '张之睿',
    team: '没有名字团队',
    role: '后端工程师',
  },
  {
    19106001223: '2016-05-01',
    name: '张之睿',
    team: '没有名字团队',
    role: '后端工程师',
  },
  {
    19106001223: '2016-05-01',
    name: '张之睿',
    team: '没有名字团队',
    role: '后端工程师',
  },
  {
    19106001223: '2016-05-01',
    name: '张之睿',
    team: '没有名字团队',
    role: '后端工程师',
  },
  {
    19106001223: '2016-05-01',
    name: '张之睿',
    team: '没有名字团队',
    role: '后端工程师',
  },
  {
    19106001223: '2016-05-01',
    name: '张之睿',
    team: '没有名字团队',
    role: '后端工程师',
  },
  {
    19106001223: '2016-05-01',
    name: '张之睿',
    team: '没有名字团队',
    role: '后端工程师',
  },
  {
    19106001223: '2016-05-01',
    name: '张之睿',
    team: '没有名字团队',
    role: '后端工程师',
  },
  {
    19106001223: '2016-05-01',
    name: '张之睿',
    team: '没有名字团队',
    role: '后端工程师',
  },
]
</script>


<style scoped>

.tac{
  padding-top: 50px;
}
.moji{
  font-size: 12px;
}
.back{
  background-color: #f2f5f7;
}
.common-layout{
  background-color: white;
  width: 60%;
  height: 120%;
  margin: auto;
}
.title{
  margin-top: 20px;
}

</style>