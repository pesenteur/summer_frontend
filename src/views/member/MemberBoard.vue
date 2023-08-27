<template>
  <div class="side">
    <div class="common-layout">
      <div class="back">
        <el-header>
          <h2>团队管理</h2>
        </el-header>
      </div>
      <el-container>
        <el-aside width="250px">
          <div class="leftbox">
            <el-row class="tac" id="container1">
              <el-col :span="24">
                <div class="btton">
                  <div class="avatar"><el-icon class="custom-icon-button"></el-icon></div>
                  <div class="manage">
                    <button class="btn" text @click="dialogFormVisible = true">创建新的团队
                    </button>
                  </div>
                  <el-dialog v-model="dialogFormVisible" title="欢迎来到寄了网站，请创建团队" center width="35%">
                    <el-form :model="form">
                      <el-form-item label="团队名称" :label-width="formLabelWidth">
                        <el-input v-model="form.name" autocomplete="off" />
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
                  <el-menu-item v-for="team in teamData" :key="team.id" @click="selectTeam(team.id, team.name)">
                    <el-icon><icon-menu /></el-icon>
                    <span class="moji">{{ team.name }}</span>
                    <el-popconfirm confirm-button-text="Yes" cancel-button-text="No" :icon="InfoFilled"
                      icon-color="#626AEF" title="你确定要删除该团队吗?" @confirm="deleteTeam(team.id)" @cancel="cancelEvent">
                      <template #reference>
                        <el-button>Delete</el-button>
                      </template>
                    </el-popconfirm>
                  </el-menu-item>
                </el-menu>
              </el-col>
            </el-row>
          </div>


        </el-aside>
        <div class="back">
          <el-aside width="20px" />
        </div>
        <div class="rightbox">
          <el-container>
            <el-header height="40px" width="100%">
              <div class="mainTitle">
                <div class="teamName">
                  <div class="title">{{ titleName }}</div>
                  <!-- <el-button text class="custom-icon-button">
            <el-icon class="el-icon--right"><arrow-down /></el-icon>
          </el-button> -->
                  <el-button text class="interval" @click="dialogTableVisible = true">
                    <el-icon class="el-icon--right"></el-icon>
                  </el-button>
                </div>
                <el-dialog v-model="dialogTableVisible" title="用户列表">
                  <el-table :data="userTableData" style="width: 100%">
                    <el-table-column prop="name" label="Name" />
                    <el-table-column prop="username" label="Username" />
                    <el-table-column prop="email" label="Email" />
                    <el-table-column align="right" width="200">
                      <template #header>
                        <form class="search-bar" @submit.prevent>
                          <input v-model="searchUser" size="small" placeholder="Type to search"
                            @change="queryAllUser(searchUser)" />
                          <button><i class='bx bx-search'></i></button>
                        </form>
                      </template>
                      <template #default="scope">
                        <el-button size="small" type="danger" @click="handleAdd()">ADD</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-dialog>
              </div>

            </el-header>

            <el-main>
              <el-table :data="filterTableData" style="width: 800px">
                <el-table-column prop="name" label="Name" />
                <el-table-column prop="username" label="Nickname" />
                <el-table-column prop="email" label="Email" />
                <el-table-column align="right" width="200">
                  <template #header>
                    <form class="search-bar" @submit.prevent>
                      <input v-model="search" type="text" placeholder="Search..." @change=""/>
                      <button><i class='bx bx-search'></i></button>
                    </form>
                  </template>
                  <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                    <el-button size="small" type="danger" @click="handleDelete()">Delete</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-main>
          </el-container>
        </div>
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
import { onMounted, reactive, ref, computed } from 'vue'
import type { TableColumnCtx, TableInstance } from 'element-plus'

import teamFunction from '../../api/team.js'
import { InfoFilled } from '@element-plus/icons-vue'
const teamData = ref([]) //侧栏的数据
const tableData = ref([]) //主表的数据
const userTableData = ref([]) //搜索表中所有的数据
const dialogFormVisible = ref(false) //弹出的对话框的属性值
const dialogTableVisible = ref(false)
const isAdd = ref(true)
const titleName = ref('') //主表的标题
const search = ref('') //搜索框用
const searchUser = ref('')


const formLabelWidth = '140px'

const cancelEvent = () => {
  console.log('cancel!')
}
async function handleAdd() {

}
async function queryALL() {
  let result = await teamFunction.queryAllTeams();
  teamData.value = result.data
}
async function selectTeam(team_id, teamName) {
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
  dialogFormVisible.value = false
  await teamFunction.addTeam(form.name);
  await queryALL()
}
async function deleteTeam(team_id) {
  await teamFunction.deleteTeam(team_id)
  await queryALL()
}
async function handleDelete() {

}
async function queryAllUser(search_number) {
  let result = await teamFunction.queryAllUser(search_number)
  console.log('***********Userresult***********')
  console.log(result.data)
  console.log('***********result***********')
  userTableData.value = result.data.results
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




</script>


<style scoped>
@import url('https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css');


.search-bar {
  height: 30px;
  background-color: transparent;
  border: 2px solid #2a6bc8;
  border-radius: 6px;
  display: flex;
  align-items: center;
}

.title {
  font-size: 20px;
  /* 修改字体大小为 20px */
}

.search-bar input {
  width: 100%;
  background-color: transparent;
  border: none;
  outline: none;
  color: #2a6bc8;
  font-size: 16px;
  padding-left: 10px;
}

.search-bar button {
  width: 40px;
  height: 100%;
  background: transparent;
  outline: none;
  border: none;
  color: #2a6bc8;
  cursor: pointer;
}

.search-bar input::placeholder {
  color: #2a6bc8;
}

.search-bar button i {
  font-size: 22px;
}

.custom-icon-button {
  background-image: url('@/assets/userAvtar.png');
  /* 根据您的项目路径调整 */
  background-size: 50px;
  /* 根据需要调整 */
  background-repeat: no-repeat;
  width: 50px;
  /* 根据需要调整 */
  height: 50px;
  /* 根据需要调整 */
  margin-top: -20px;

  left: 35%;

}

.interval {
  background-image: url('@/assets/add.png');
  /* 根据您的项目路径调整 */
  background-size: 30px;
  /* 根据需要调整 */
  background-repeat: no-repeat;
  width: 30px;
  /* 根据需要调整 */
  height: 30px;
  position: relative;
  /* 根据需要调整 */
}



h2 {
  padding-top: 20px;
  max-width: 600px;
  word-wrap: break-word;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  display: block;
}

.teamName {
  padding: 0px;
  margin: 0px;
  max-width: 6000px;
  word-wrap: break-word;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn {
  padding: 10px 20px;
  margin: 10px;
  left: 16%;
  border-radius: 8px;
  background: none;
  border: 2px solid #2a6bc8;
  color: #2a6bc8;
  cursor: pointer;
  position: relative;
  transition: color 0.4s linear;
}

.btn::before {
  content: ' ';
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #2a6bc8;
  transition: transform 0.5s;
  transform-origin: 0 0;
  transition-timing-function: cubic-bezier(0.5, 1.6, 0.4, 0.7);
}

.btn:hover {
  color: #fff;
}

.btn::before {
  left: 0;
  top: 0;
}

.btn::before {
  transform: scaleX(0);
}

.btn:hover::before {
  transform: scaleX(1);
}

.tac {
  padding-top: 50px;
}

.moji {
  font-size: 12px;
  padding-right: 25px;
}

.back {
  background-color: white;
}

.common-layout {
  background-color: white;
  width: 100%;
  height: 120%;
  margin-left: 20%;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}



.btton {
  margin-left: 10px;
}

.el-menu-vertical-demo {
  padding-bottom: 20px;
}

.mainTitle {
  margin-top: 20px;
  margin-left: -10px;
}

.leftbox {
  border-style: ridge;
  border-color: #e8e8e8;
  box-shadow: 15px 15px 15px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease
    /* Adjust border properties as needed */
}

.leftbox:hover {
  box-shadow: 15px 15px 15px rgba(0, 0, 0, 0.2);
  /* Adjust border properties as needed */
}
.rightbox {
  border-style: ridge;
  border-color: #e8e8e8;
  box-shadow: 15px 15px 15px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease
    /* Adjust border properties as needed */
}

.rightbox:hover {
  box-shadow: 15px 15px 15px rgba(0, 0, 0, 0.2);
  /* Adjust border properties as needed */
}
</style>
