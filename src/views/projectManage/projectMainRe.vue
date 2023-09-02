<template>
  <div>
    <el-row v-for="(row, rowIndex) in rows" :key="rowIndex" class="card-row">
      <el-col v-for="(o, colIndex) in row" :key="colIndex" :span="4" class="card-col">
        <el-card shadow="hover" :body-style="{ padding: '0px' }" class="small-card">
          <img src="https://pic1.zhimg.com/v2-65354520edd978c49d00a7a710feb9c5_r.jpg?source=1940ef5c" class="image" />
          <div style="padding: 10px">
            <span>项目名称:{{projectName[(rowIndex)*4+colIndex]}}</span>
            <el-button @click="restore((rowIndex)*4+colIndex)" text><el-icon><RefreshLeft /></el-icon></el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import {ref, reactive, onMounted, computed, onUpdated, onBeforeUpdate} from 'vue'
import projectDialog from "./projectDialog.vue";
import {useRouter} from "vue-router";

import projectAPI from '@/api/proj.js'
import {CircleCloseFilled, RefreshLeft} from "@element-plus/icons-vue";

const router = useRouter()

const props = defineProps(['teamId'])

const projectName = ref([])

const totalCards = ref()

const myResult = ref([])

const cardsPerRow = 4
const rows = ref([])

const numRows = computed(()=>{
  return Math.ceil(totalCards.value / cardsPerRow)
})

const dialogFormVisible = ref(false)

const team=ref('')

team.value = props.teamId

console.log(team.value)

const form = reactive({
  name: '',
  describe:'',
})

function handleExtraCardClick(){
  console.log('成功被调用！')
}

async function getData(){
  const result = await projectAPI.getReProject(team.value)
  myResult.value = result.data
}

function showProjects(){
  rows.value = []

  // const result = await projectAPI.getReProject(team.value)
  // myResult.value = result.data
  // projectName.value = result.data.name
  console.log('myResult',myResult)
  let projNames = []
  for(const proj of myResult.value){
    projNames.push(proj.name)
  }
  projectName.value = projNames
  totalCards.value = projNames.length
  console.log('numRows',numRows.value)
  for (let i = 0; i < numRows.value; i++) {
    let row = []
    for (let j = 0; j < cardsPerRow; j++) {
      let cardIndex = i * cardsPerRow + j
      if (cardIndex < totalCards.value) {
        row.push(cardIndex)
      }
    }
    rows.value.push(row)
    console.log("rows",rows)
  }

  console.log(totalCards.value)
  console.log('name::::',projectName.value)
  console.log('name@@@@',projectName.value[0])
}

async function restore(projPos){
  let projId = myResult.value[projPos].id
  console.log('projPos',projPos)
  console.log('projId',projId)
  totalCards.value--
  const result = await projectAPI.restoreProject(team.value,projId)
  await getData()
  showProjects()
}

defineExpose({
  showProjects,getData
})

onMounted(async() => {
  await getData()
  showProjects()
  console.log('$$$$$$$$$$',totalCards.value)
})

// onBeforeUpdate(async() => {
//   await showProjects()
//   console.log('$$$$$$$$$$',totalCards.value)
// })

</script>

<style scoped>
.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  height: 80px;
  display: block;
  object-fit: cover;
}

.small-card {
  width: 100%;
  height: 100%;
}

.card-row{
  margin-left: auto;
  margin-right: auto;
}

.card-col {
  margin:30px;
}
</style>
