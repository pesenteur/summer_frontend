<template>
  <div class="side">
    <div class="common-layout">
      <div class="back">
        <el-header>
          <h2>团队管理</h2>
        </el-header>
      </div>
      <el-container class="container">
        <el-aside width="250px">
          <div class="leftbox">
            <el-row class="tac" id="container1">
              <el-col :span="24">
                <div class="btton">
                  <div class="avatar"><el-icon class="custom-icon-button"></el-icon></div>
                  <div class="manage">
                    <button class="btn" @click="dialogFormVisible = true">创建新的团队
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
        <div class="rightbox" v-if="teamId">
          <el-container>
            <el-header height="40px" width="100%">
              <div class="mainTitle">
                <div class="teamName">
                  <div class="title">{{ titleName }}</div>
                  <!-- <el-button text class="custom-icon-button">
            <el-icon class="el-icon--right"><arrow-down /></el-icon>
          </el-button> -->
                  <el-button v-if="!isNormal" text class="interval" @click="dialogTableVisible = true">
                    <el-icon class="el-icon--right"></el-icon>
                  </el-button>
                </div>
                <el-dialog v-model="dialogTableVisible" title="用户列表">
                  <el-table :data="userTableData" style="width: 100%">
                    <el-table-column prop="name" label="Name" sortable/>
                    <el-table-column prop="username" label="Username" sortable/>
                    <el-table-column prop="email" label="Email" sortable/>
                    <el-table-column align="right" width="200">
                      <template #header>
                        <form class="search-bar" @submit.prevent>
                          <input v-model="searchUser" size="small" placeholder="Type to search"
                            @change="queryAllUser(searchUser)" />
                          <button><i class='bx bx-search'></i></button>
                        </form>
                      </template>
                      <template #default="scope">
                        <el-button size="small" type="danger" @click="handleAdd(scope.row)">ADD</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-dialog>
              </div>
            </el-header>

            <el-main>
              <el-table :data="filterTableData" style="width: 800px">
                <el-table-column prop="name" label="姓名" sortable/>
                <el-table-column prop="username" label="昵称" sortable/>
                <el-table-column prop="email" label="邮箱" sortable/>
                <el-table-column prop="role" label="身份" sortable/>
                <el-table-column align="right" width="200">
                  <template #header>
                    <form class="search-bar" @submit.prevent>
                      <input v-model="search" type="text" placeholder="Search..." @change="" />
                      <button><i class='bx bx-search'></i></button>
                    </form>
                  </template>
                  <template #default="scope">
                    <el-button size="small" v-if="scope.row.role === '团队管理员' && isCreate === true"
                      @click="handleRmv(scope.$index, scope.row)">RmvAuth</el-button>
                    <el-button size="small" v-if="scope.row.role === '普通成员' && isNormal === false"
                      @click="handleEdit(scope.$index, scope.row)">Auth</el-button>
                    <el-button size="small" v-if="(scope.row.role === '普通成员' && isNormal === false)||(scope.row.role === '团队管理员'&& isCreate === true)"
                               type="danger" @click="handleDelete(scope.row)">Delete</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-main>
          </el-container>
        </div>
        <div class="rightbox" v-else style="width:100%;">
          <el-empty description="请选择团队" style="height:100%;"/>
        </div>
      </el-container>
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
import {ElMessage} from "element-plus";
import {getUserId} from '../../utils/token.js'
const teamData = ref([]) //侧栏的数据
const tableData = ref([]) //主表的数据
const userTableData = ref([]) //搜索表中所有的数据
const dialogFormVisible = ref(false) //弹出的对话框的属性值
const dialogTableVisible = ref(false)
const titleName = ref('') //主表的标题
const search = ref('') //搜索框用
const searchUser = ref('')
const formLabelWidth = '140px'
const teamId = ref()
const isNormal = ref(false)
const isAdmin = ref(false)
const isCreate = ref(false)

const cancelEvent = () => {
  console.log('cancel!')
}

function judgeIsNormal(){
	tableData.value.forEach((item)=>{
		if(item.role === '团队创建者'&& item.id.toString() === getUserId()){
			isCreate.value = true
			isNormal.value = false
			isAdmin.value =false
		}
		if(item.role === '团队管理员' && item.id.toString() === getUserId()){
			isNormal.value = false
			isCreate.value = false
			isAdmin.value =true
		}
		if(item.role === '普通成员' && item.id.toString() === getUserId()){
			isNormal.value = true
			isAdmin.value = false
			isCreate.value =false
		}
	})
}
async function handleAdd(userInfo) {
	let res = await teamFunction.inviteTeamMember(teamId.value, userInfo.id)
	//todo 以后记得删
	// await teamFunction.acceptInvitation(res.data.id, true)
	await refreshTeamMember()
	dialogTableVisible.value=false
}
async function queryALL() {
	let result = await teamFunction.queryAllTeams();
	teamData.value = result.data
	judgeIsNormal()
}
async function selectTeam(team_id, teamName) {
	try {
		const result = await teamFunction.queryTeamMember(team_id)
		tableData.value = result.data.members.sort((a,b)=>{
			const temp = {
				'团队创建者': 1,
				'团队管理员': 2,
				'普通成员': 3
			}
			return temp[a.role] - temp[b.role]
		})
		console.log(tableData.value)
		titleName.value = teamName
		teamId.value = team_id
		judgeIsNormal()
	}catch (e) {
		ElMessage.error(e.message)
	}

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
async function handleDelete(userInfo) {
	try {
		if (userInfo.role === "普通成员") {
			await teamFunction.deleteTeamMember(teamId.value, userInfo.id)
		} else {
			ElMessage.error('不能删除管理员')
		}
		await refreshTeamMember()
	}catch (e){
		console.log(e.message)
	}
}
async function queryAllUser(search_number) {
  let result = await teamFunction.queryAllUser(search_number)
  console.log('***********Userresult***********')
  console.log(result.data)
  console.log('***********result***********')
  userTableData.value = result.data.results
}
async function refreshTeamMember() {
	let result = await teamFunction.queryTeamMember(teamId.value)
	tableData.value = result.data.members.sort((a,b)=>{
		const temp = {
			'团队创建者': 1,
			'团队管理员': 2,
			'普通成员': 3
		}
		return temp[a.role] - temp[b.role]
	})
}
async function addAdminister(memberId) {
  console.log("handle")
  console.log(memberId)
  await teamFunction.addAdmin(teamId.value, memberId)
  await refreshTeamMember()
}
async function rmvAdminister(memberId) {
  await teamFunction.deleteAdmin(teamId.value, memberId)
  await refreshTeamMember()
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
      !search.value || data.name.toLowerCase().includes(search.value.toLowerCase())
  )
)


const handleEdit = (index, userInfo) => {
  addAdminister(userInfo.id)
}
const handleRmv = (index, userInfo) => {
  rmvAdminister(userInfo.id)
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
  width: 80%;
  height: 120%;
  margin: 0 auto;
}

.container {
  margin-bottom: 80px;
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
  transition: box-shadow 0.3s ease;
    /* Adjust border properties as needed */
  height: 500px;
}

.leftbox:hover {
  box-shadow: 15px 15px 15px rgba(0, 0, 0, 0.2);
  /* Adjust border properties as needed */
}

.rightbox {
  border-style: ridge;
  border-color: #e8e8e8;
  box-shadow: 15px 15px 15px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
    /* Adjust border properties as needed */
  height: 500px;
  overflow: auto;
}

.rightbox:hover {
  ƒ: 15px 15px 15px rgba(0, 0, 0, 0.2);
  /* Adjust border properties as needed */
}</style>
