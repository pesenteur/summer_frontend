<template>
  <div class="back">

    <div class="board">
      <span class="title">请选择团体</span>
      <br>
      <span class="subtitle">选择后将自动为您跳转到主页面</span>
      <el-divider />
      <el-menu v-for="team in teamTeamTable" key="team.id" class="el-menu-vertical-demo">
        <el-menu-item index="1" @click="jumpToHome(team.id)">
          <div class="moji">
            <el-icon><icon-menu /></el-icon>
            <span class="moji">{{ team.name }}</span>
          </div>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>



<script lang="js" setup>
import {
  Menu as IconMenu,
} from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue'
import teamFunction from "@/api/team";
import { useRoute, useRouter } from "vue-router";

const teamTeamTable = ref([])
const route = useRoute();
const router = useRouter();
async function queryALL() {
  let result = await teamFunction.queryAllTeams();
  teamTeamTable.value = result.data
}

function jumpToHome(team_id) {
  console.log(team_id)
  router.push(`/team/${team_id}/chatHome`)
}

onMounted(() => {
  queryALL()
});
const showItems = ref(false);

onMounted(() => {
  setTimeout(() => {
    showItems.value = true;
  }, 200);
});

</script>



<style scoped>
.back {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
}

.board {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 300px;
  
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
  transition: opacity 0.5s ease, transform 0.5s ease; /* 添加过渡效果 */
}
.fade-enter,
.fade-leave-to {
  opacity: 0; /* 初始状态为透明 */
  transform: translateY(20px); /* 初始状态下向下偏移一些 */
}
.team-name {
  font-size: 18px;
  font-weight: bold;
}
</style>