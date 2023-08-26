<template>
  <div class="back">

    <div class="board">
      <span class="title"
      >选择团体</span
      >
      <br>
      <span class="subtitle"
      >选择后将自动为您跳转到主页面</span
      >
      <el-divider />
      <el-menu v-for="team in teamTeamTable" key="team.id" class="el-menu-vertical-demo">
        <el-menu-item index="1" @click="jumpToHome(team.id)" >
          <div class="moji">
          <el-icon><icon-menu /></el-icon>
          <span class="moji" >{{team.name}}</span>
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
import {onMounted, ref} from 'vue'
import teamFunction from "@/api/team";
import {useRoute, useRouter} from "vue-router";

const teamTeamTable = ref([])
const route = useRoute();
const router = useRouter();
async function queryALL(){
  let result = await teamFunction.queryAllTeams();
  teamTeamTable.value = result.data
}

function jumpToHome(team_id){
  console.log(team_id)
  router.push(`/team/${team_id}/chatHome`)
}

onMounted(() => {
  queryALL()
});
</script>



<style scoped>
.back{
  height: 770px;
  background-image: linear-gradient(
      rgba(255, 255, 0, 0.5),
      rgba(0, 0, 255, 0.5)
  ), url("@/assets/switchBackGround.png");
}

.board {
  padding-top: 70px;
  width: 30%;
  margin:auto;
}

.moji{

}
.title{
  font-size: 25px;
}

.subtitle{
  font-size: 18px;
  color: #8c8c8c;
}
</style>