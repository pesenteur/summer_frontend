<template>
  <div>
    <el-row v-for="(row, rowIndex) in rows" :key="rowIndex">
      <el-col v-for="(o, colIndex) in row" :key="colIndex" :span="4" class="card-col">
        <el-card :body-style="{ padding: '0px' }" class="small-card">
          <img src="https://pic1.zhimg.com/v2-65354520edd978c49d00a7a710feb9c5_r.jpg?source=1940ef5c" class="image" />
          <div style="padding: 10px">
            <span @click="jumpToMyProject">项目名称</span>
          </div>
        </el-card>
      </el-col>


      <el-col :span="4" class="card-col" v-if="rowIndex === rows.length - 1">
        <el-card :body-style="{ padding: '0px' }" class="small-card" @click="handleExtraCardClick">
          <img src="https://pic1.zhimg.com/v2-48232582b70ecd9c53a3026ffb21e078_r.jpg?source=1940ef5c" class="image" />
          <div style="padding: 10px">
            <changeName/>
          </div>
        </el-card>
      </el-col>

    </el-row>

  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import changeName from "./changeName.vue";

const currentDate = reactive(new Date())

const totalCards = 5
const cardsPerRow = 4
const rows = ref([])

const numRows = Math.ceil(totalCards / cardsPerRow)

for (let i = 0; i < numRows; i++) {
  const row = []
  for (let j = 0; j < cardsPerRow; j++) {
    const cardIndex = i * cardsPerRow + j
    if (cardIndex < totalCards) {
      row.push(cardIndex)
    }
  }
  rows.value.push(row)
}

function handleExtraCardClick(){
  console.log('成功被调用！')
}

function jumpToMyProject(){
  router.push('/workSpace')
}
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

.card-col {
  margin:50px;
}
</style>
