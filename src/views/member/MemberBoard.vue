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
            <div class="btton">
              <el-button text @click="dialogFormVisible = true">
                创建新的团队
              </el-button>
              <el-dialog v-model="dialogFormVisible" title="欢迎来到寄了网站，请创建团队" center width="35%">
                <el-form :model="form">
                  <el-form-item label="团队名称" :label-width="formLabelWidth" >
                    <el-input v-model="form.name" autocomplete="off"/>
                  </el-form-item>
                </el-form>
                <template #footer>
                <span class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">Cancel</el-button>
                  <el-button type="primary" @click="submitTeam">
                    Confirm
                  </el-button>
                </span>
                </template>
              </el-dialog>
            </div>
            <el-divider />
            <el-menu class="el-menu-vertical-demo">
              <el-menu-item v-for="team in teamData" :key="team.id" @click="selectTeam(team.id,team.name)">
                <el-popconfirm
                    confirm-button-text="Yes"
                    cancel-button-text="No"
                    :icon="InfoFilled"
                    icon-color="#626AEF"
                    title="你确定要删除该团队吗?"
                    @confirm="deleteTeam(team.id)"
                    @cancel="cancelEvent"
                >
                  <template #reference>
                    <el-button>Delete</el-button>
                  </template>
                </el-popconfirm>
                <el-icon><icon-menu /></el-icon>
                <span class="moji" >{{team.name}}</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <div class="back"><el-aside width="20px"/></div>
      <div class="title">
      <el-container>
        <el-header height="40px">
          <div class="mainTitle">
            <el-button text @click="dialogTableVisible = true" :disabled="isAdd" type="primary" >
              添加成员
            </el-button>
            <el-text size="large">{{titleName}}</el-text>
            <el-dialog v-model="dialogTableVisible" title="用户列表">
              <el-table :data="filterUserTableData" style="width: 100%">
                <el-table-column prop="name" label="Name" width="150" />
                <el-table-column prop="nickname" label="Nickname" width="150"/>
                <el-table-column prop="email" label="Email" width="180"/>
                <el-table-column align="right" width="150">
                  <template #header>
                    <el-input v-model="search" size="small" placeholder="Type to search" />
                  </template>
                  <template #default="scope">
                    <el-button
                        size="small"
                        type="danger"
                        @click="handleAdd()"
                    >ADD</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </el-dialog>
          </div>

        </el-header>

        <el-main>
          <el-table :data="filterTableData" style="width: 100%">
            <el-table-column prop="name" label="Name" width="150" />
            <el-table-column prop="nickname" label="Nickname" width="150"/>
            <el-table-column prop="email" label="Email" width="180"/>
            <el-table-column align="right" width="150">
              <template #header>
                <el-input v-model="search" size="small" placeholder="Type to search" />
              </template>
              <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
                >Edit</el-button
                >
                <el-button
                    size="small"
                    type="danger"
                    @click="handleDelete()"
                >Delete</el-button
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
import {onMounted, reactive, ref,computed} from 'vue'
import type { TableColumnCtx, TableInstance } from 'element-plus'

import teamFunction from '../../api/team.js'
import { InfoFilled } from '@element-plus/icons-vue'
const filterRole = (value: string, row) => {
  return row.role === value
}
const teamData = ref([]) //侧栏的数据
const tableData = ref([]) //主表的数据
const userTableData = ref([]) //搜索表中所有的数据
const dialogFormVisible = ref(false) //弹出的对话框的属性值
const dialogTableVisible = ref(false)
const isAdd = ref(true)
const titleName = ref('') //主表的标题
const search = ref('') //搜索框用


const formLabelWidth = '140px'

const cancelEvent = () => {
  console.log('cancel!')
}
async function handleAdd(){

}
async function queryALL(){
  let result = await teamFunction.queryAllTeams();
  teamData.value = result.data
}
async function selectTeam(team_id,teamName){
  console.log(team_id)
  let result = await teamFunction.queryTeamMember(team_id)
  console.log('***********result***********')
  console.log(result.data.members)
  console.log('***********result***********')
  tableData.value = result.data.members
  titleName.value = teamName
  isAdd.value = false
}
async function submitTeam() {
  dialogFormVisible.value=false
  await teamFunction.addTeam(form.name);
  await queryALL()
}
async function deleteTeam(team_id){
  await teamFunction.deleteTeam(team_id)
  await queryALL()
}
async function handleDelete(){

}

onMounted(() => {
  queryALL()
});

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

const filterTableData = computed(() =>
    tableData.value.filter(
        (data) =>
            !search.value ||
            data.name.toLowerCase().includes(search.value.toLowerCase())
    )
)

const filterUserTableData = computed(() =>
    userTableData.value.filter(
        (data) =>
            !search.value ||
            data.name.toLowerCase().includes(search.value.toLowerCase())
    )
)
const handleEdit = (index, row) => {
  console.log(index, row)
}


const gridData = [
  {
    date: '2016-05-02',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District',
  },
  {
    date: '2016-05-04',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District',
  },
  {
    date: '2016-05-01',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District',
  },
  {
    date: '2016-05-03',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District',
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

.dialog-footer button:first-child {
  margin-right: 10px;
}

.btton{
  margin-left: 10px;
}
.el-menu-vertical-demo{
  padding-bottom: 20px;
}
.mainTitle{
  margin-top: 20px;
  margin-left: -10px;
}
</style>