<template>
  <div>
    <el-row v-for="(row, rowIndex) in rows" :key="rowIndex" class="card-row">
      <el-col v-for="(o, colIndex) in row" :key="colIndex" :span="4" class="card-col">
        <el-card @click="getSingleProject" shadow="hover" :body-style="{ padding: '0px' }" class="small-card">
          <img src="https://pic1.zhimg.com/v2-65354520edd978c49d00a7a710feb9c5_r.jpg?source=1940ef5c" class="image" />
          <div style="padding: 10px">
            <span>项目名称{{projectName}}</span>
            <el-button @click="deleteCard" text><el-icon><CircleCloseFilled /></el-icon></el-button>
          </div>
        </el-card>
      </el-col>


      <el-col :span="4" class="card-col" v-if="rowIndex === rows.length - 1">
        <el-card shadow="hover" :body-style="{ padding: '0px' }" class="small-card" @click="handleExtraCardClick">
          <img src="https://pic1.zhimg.com/v2-48232582b70ecd9c53a3026ffb21e078_r.jpg?source=1940ef5c" class="image" />
          <div style="padding: 10px">

            <projectDialog/>

          </div>
        </el-card>
      </el-col>

    </el-row>

  </div>
</template>

<script setup>
import {ref, reactive, onMounted} from 'vue'
import projectDialog from "./projectDialog.vue";
import {useRouter} from "vue-router";

import projectAPI from '@/api/proj.js'
import {CircleCloseFilled} from "@element-plus/icons-vue";

const router = useRouter()

const currentDate = reactive(new Date())

const projectName = reactive([])


// const totalCards = ref()

const totalCards = 12
const cardsPerRow = 4
const rows = ref([])

const numRows = Math.ceil(totalCards / cardsPerRow)

const dialogFormVisible = ref(false)

const formLabelWidth = '140px'

const team=ref('2145f25c-f9ec-4a42-9b90-1e2fac1b9ddd')

const form = reactive({
  name: '',
  describe:'',
})

for (let i = 0; i < numRows; i++) {
  const row = []
  for (let j = 0; j < cardsPerRow; j++) {
    const cardIndex = i * cardsPerRow + j
    if (cardIndex < totalCards) {
      row.push(cardIndex)
    }
  }
  rows.value.push(row)
  console.log("@@@",rows.value[1])
}

function handleExtraCardClick(){
  console.log('成功被调用！')
}


async function getSingleProject() {
    const result = await projectAPI.getSingleProject(form.name, form.describe, team.value);
    dialogFormVisible.value = false
    projectName.value = result.data.name
    await router.push('/drag')
    console.log('getSingleProject成功被调用！')
}

async function deleteCard() {
  const result = await projectAPI.deleteProject()
}

onMounted(() => {

    const result = projectAPI.getAllProjects()
    projectName.value = result.data.name

})

</script>

<style>
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
