<template>
  <el-button type="info" :icon="Message" circle @click="table = true" class="butt"/>
  <el-drawer
      v-model="table"
      title="我的消息"
      direction="rtl"
      size="30%"
  >

    <el-table ref="tableRef" row-key="date" :data="tableData" style="width: 100%">
      <el-table-column
          prop="date"
          label="Date"
          sortable
          width="180"
      />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" :formatter="formatter" />

      <el-table-column
          prop="tag"
          label="Isread"
          width="100"
          :filters="[
        { text: 'Read', value: 'Read' },
        { text: 'Unread', value: 'Unread' },
      ]"
          :filter-method="filterIsread"
          filter-placement="bottom-end"
      >
        <template #default="scope">
          <el-tag
              :type="scope.row.tag === 'Read' ? '' : 'success'"
              disable-transitions
          >{{ scope.row.tag }}</el-tag
          >
        </template>
      </el-table-column>
    </el-table>
  </el-drawer>

</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElDrawer, ElMessageBox } from 'element-plus'
import {Edit, Message} from "@element-plus/icons-vue";

const formLabelWidth = '80px'
let timer

const table = ref(false)
const dialog = ref(false)
const loading = ref(false)

const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})


const drawerRef = ref<InstanceType<typeof ElDrawer>>()
const onClick = () => {
  drawerRef.value!.close()
}

import type { TableColumnCtx, TableInstance } from 'element-plus'

interface User {
  date: string
  name: string
  content: string
  isread: string
}

const tableRef = ref<TableInstance>()

const resetDateFilter = () => {
  tableRef.value!.clearFilter(['date'])
}
// TODO: improvement typing when refactor table
const formatter = (row: User, column: TableColumnCtx<User>) => {
  return row.content
}
const filterisread = (value: string, row: User) => {
  return row.isread === value
}

const tableData: User[] = [
  {
    date: '2016-05-03',
    name: '吴鑫宇',
    content: '很抱歉打扰您......',
    isread: 'read',
  },
  {
    date: '2016-05-02',
    name: '吴鑫宇',
    content: '很抱歉打扰您......',
    isread: 'unread',
  },
  {
    date: '2016-05-04',
    name: '吴鑫宇',
    content: '很抱歉打扰您......',
    isread: 'read',
  },
  {
    date: '2016-05-01',
    name: '吴鑫宇',
    content: '很抱歉打扰您......',
    isread: 'unread',
  },
]
</script>

<style scoped>
.butt{
  margin-top: 12px;
}
</style>
