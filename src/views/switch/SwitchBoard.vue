<template>
  <div class="back">
    <div class="board">
      <span class="title">请选择团队</span>
      <br>
      <span class="subtitle">选择后将自动为您跳转到主页面</span>
      <el-divider />
      <el-menu v-for="team in teamTeamTable" key="team.id" class="el-menu-vertical-demo">
        <el-menu-item index="1" @click="jumpToHome(team.id)">
          <div class="moji">
            <el-icon><icon-menu /></el-icon>
            <span class="team-name">{{ team.name }}</span>
          </div>
        </el-menu-item>
      </el-menu>
      <el-menu>
        <div class="create-team-btn" @click="dialogFormVisible = true">
          <font-awesome-icon :icon="['fas', 'plus']" />
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
      </el-menu>
    </div>
  </div>
</template>



<script lang="js" setup>
import {
  Menu as IconMenu,
} from '@element-plus/icons-vue'
import { onMounted, ref,  reactive } from 'vue'
import teamFunction from "@/api/team";
import { useRoute, useRouter } from "vue-router";
import { setTeamId } from "@/utils/token"
const dialogFormVisible = ref(false) //弹出的对话框的属性值
const teamTeamTable = ref([])
const route = useRoute();
const router = useRouter();
async function queryALL() {
  console.log('================')
  let result = await teamFunction.queryAllTeams();
  teamTeamTable.value = result.data
}
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
function jumpToHome(team_id) {
  console.log('*******TeamId********')
  console.log(team_id)
  console.log('*********************')
  setTeamId(team_id)
  router.push(('/'))

}
async function submitTeam() {
  dialogFormVisible.value = false
  await teamFunction.addTeam(form.name);
  await queryALL()
}
onMounted(() => {
  queryALL()
});

</script>



<style scoped>
.team-name {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  /* Change the color to your preference */
  margin-left: 10px;
}

.back {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
}

.board {
  background-color: white;
  height: 70%;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 50%;
  text-align: center;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.subtitle {
  color: #999;
  margin-bottom: 20px;
}

.el-divider {
  margin: 20px 0;
}

.team-menu {
  width: 100%;
  border: none;
  background-color: transparent;
}

.team-item {
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.team-item:hover {
  background-color: #f0f0f0;
}

.team-icon {
  margin-right: 10px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
  /* 添加过渡效果 */
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  /* 初始状态为透明 */
  transform: translateY(20px);
  /* 初始状态下向下偏移一些 */
}

.team-name {
  font-size: 18px;
  font-weight: bold;
}

.create-team-btn {
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.create-team-btn:hover {
  background-color: #f0f0f0;
}

.create-team-text {
  font-size: 18px;
  font-weight: bold;
}

.create-team-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  background-color: #f0f0f0;
  border: 2px #333;
  height: 40px;
  margin: 0 auto;
}

.create-team-btn:hover {
  background-color: #999;
}

.create-team-icon {
  font-size: 24px;
  color: #333;
}
</style>