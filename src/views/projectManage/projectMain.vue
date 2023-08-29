<template>
  <div>
    <el-row v-for="(row, rowIndex) in rows" :key="rowIndex" class="card-row">
      <el-col v-for="(o, colIndex) in row" :key="colIndex" :span="4" class="card-col">
        <el-card shadow="hover" :body-style="{ padding: '0px' }" class="small-card">
          <img @click="getSingleProj((rowIndex)*4+colIndex)" src="https://pic1.zhimg.com/v2-65354520edd978c49d00a7a710feb9c5_r.jpg?source=1940ef5c" class="image" />
          <div style="padding: 10px">
            <span>项目名称:{{projectName[(rowIndex)*4+colIndex]}}</span>
            <el-button @click="deleteCard((rowIndex)*4+colIndex)" text><el-icon><CircleCloseFilled /></el-icon></el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script setup>
import {ref, reactive, onMounted, computed} from 'vue'
import projectDialog from "./projectDialog.vue";
import {useRouter} from "vue-router";

import projectAPI from '@/api/proj.js'
import {CircleCloseFilled} from "@element-plus/icons-vue";
import {setDesignId, setProjId} from "@/utils/token";
import originAPI from "@/api/originDesign";

const router = useRouter()


const currentDate = reactive(new Date())

const projectName = ref([])

const totalCards = ref()

const myResult = ref([])

const cardsPerRow = 4
const rows = ref([])

const numRows = computed(()=>{
  return Math.ceil(totalCards.value / cardsPerRow)
})

const dialogFormVisible = ref(false)

const formLabelWidth = '140px'

const props = defineProps(['teamId'])

const team=ref('')

team.value = props.teamId

const form = reactive({
  name: '',
  describe:'',
})

function handleExtraCardClick(){
  console.log('成功被调用！')
}


async function getSingleProj(projPos) {
    let projId = myResult.value[projPos].id

    console.log('projPos111',projPos)

    const result = await projectAPI.getSingleProject(projId);

    setProjId(projId)

    // let title = '画布'
    // for(let i=0;i<result.data.length;i++){
    //   if(result.data !== []){
    //     let id = result.data[0].id
    //     const result = await getSaveData.getSingleDesign(projId,id)
    //     console.log("result drag",result)
    //     this.comData = result.data.content
    //     this.canData = result.data.style
    //     break;
    //   }
    // }


    // const result = await originAPI.getAllDesign(projId)
    // if (result.data){
    //   console.log('data0',result.data[0])
    //   let id = result.data[0].id
    //   setDesignId(id)
    // }
    // const result = await originAPI.addOrigin(title,projId)
    // console.log('this is a result:',result)
    // setDesignId(result.data.id)

    dialogFormVisible.value = false
    await router.push('/drag')
    console.log('getSingleProject成功被调用！')
}

async function deleteCard(projPos) {
  let projId = myResult.value[projPos].id
  console.log('projPos',projPos)
  console.log('projId',projId)
  totalCards.value--

  const result = await projectAPI.deleteProject(team.value,projId)
  await showProjects1()

}
async function showProjects1(){
  rows.value = []
  const result = await projectAPI.getAllProjects(team.value)
  myResult.value = result.data
  // projectName.value = result.data.name
  console.log('result',result)
  let projNames = []
  for(const proj of result.data){
    projNames.push(proj.name)
  }
  projectName.value = projNames
  totalCards.value = projNames.length
  console.log('numRows',numRows.value)
  for (let i = 0; i < numRows.value; i++) {
    console.log('mco;rejwvc')
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

defineExpose({
  showProjects1
})

onMounted(async() => {
  await showProjects1()
  console.log('$$$$$$$$$$',totalCards.value)
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
