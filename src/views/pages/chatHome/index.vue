<template>
  <div class="chatHome">
    <div class="chatLeft">
      <div class="title">
        <h1>小组聊天室</h1>
      </div>
      <form class="search-bar">
        <input type="text" placeholder="Search..." v-model="search_word" />
        <button @click="filteredPersonList"><i class='bx bx-search'></i></button>
      </form>
      <div class="online-person">
        <span class="onlin-text">聊天列表</span>
        <div class="person-cards-wrapper">
          <div class="personList" v-for="personInfo in filteredPersonList" :key="personInfo.id" @click="clickPerson(personInfo)">
            <PersonCard :personInfo="personInfo" :pcCurrent="pcCurrent"></PersonCard>
          </div>
        </div>
      </div>
    </div>
    <div class="chatRight">
      <!-- <router-view></router-view> -->
      <div v-if="showChatWindow">
        <ChatWindow :frinedInfo="chatWindowInfo" @personCardSort="personCardSort"></ChatWindow>
      </div>
      <div class="showIcon" v-else>
        <span class="iconfont icon-snapchat"></span>
        <!-- <img src="@/assets/img/snapchat.png" alt="" /> -->
      </div>
    </div>
    <!-- <el-col :span="4"><div class="grid-content bg-purple"></div></el-col> -->
  </div>
</template>

<script>
import PersonCard from "@/components/PersonCard.vue";
import ChatWindow from "./chatwindow.vue";

import { getFriend } from "@/api/getData";
export default {
  name: "App",
  components: {
    PersonCard,
    ChatWindow,
  },
  data() {
    return {
      search_word: "",
      pcCurrent: "",
      personList: [],
      showChatWindow: false,
      chatWindowInfo: {},
    };
  },
  mounted() {
    getFriend().then((res) => {
      this.personList = res;
    });
  },
  computed: {
    filteredPersonList() {
      if (!this.search_word) {
        return this.personList; // 如果搜索词为空，返回完整列表
      }
      const searchTerm = this.search_word.toLowerCase();
      return this.personList.filter(personInfo => {
        return personInfo.name.toLowerCase().includes(searchTerm); // 根据名字筛选
      });
    }
  },
  
  methods: {
    clickPerson(info) {
      console.log(this.search_word)
      this.showChatWindow = true;
      this.chatWindowInfo = info;
      this.personInfo = info;
      this.pcCurrent = info.id;
    },
    personCardSort(id) {
      if (id !== this.personList[0].id) {
        console.log(id);
        let nowPersonInfo;
        for (let i = 0; i < this.personList.length; i++) {
          if (this.personList[i].id == id) {
            nowPersonInfo = this.personList[i];
            this.personList.splice(i, 1);
            break;
          }
        }
        this.personList.unshift(nowPersonInfo);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import url('https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css');

.search-bar {
  width: 250px;
  height: 45px;
  background-color: transparent;
  border: 2px solid black;
  border-radius: 6px;
  display: flex;
  align-items: center;
}

.search-bar input {
  width: 100%;
  background-color: transparent;
  border: none;
  outline: none;
  color: black;
  font-size: 16px;
  padding-left: 10px;
}

.search-bar button {
  width: 40px;
  height: 100%;
  background: transparent;
  outline: none;
  border: none;
  color: black;
  cursor: pointer;
}

.search-bar input::placeholder {
  color: black;
}

.search-bar button i {
  font-size: 22px;
}

.chatHome {
  // margin-top: 20px;
  display: flex;

  .chatLeft {
    width: 280px;

    .title {
      color: #fff;
      padding-left: 10px;
    }

    .online-person {
      margin-top: 50px;

      .onlin-text {
        padding-left: 10px;
        color: blac;
      }

      .person-cards-wrapper {
        padding-left: 10px;
        height: 65vh;
        margin-top: 0px;
        overflow: hidden;
        overflow-y: scroll;
        box-sizing: border-box;

        &::-webkit-scrollbar {
          width: 0;
          /* Safari,Chrome 隐藏滚动条 */
          height: 0;
          /* Safari,Chrome 隐藏滚动条 */
          display: none;
          /* 移动端、pad 上Safari，Chrome，隐藏滚动条 */
        }
      }
    }
  }

  .chatRight {
    flex: 1;
    padding-right: 30px;

    .showIcon {
      position: absolute;
      top: calc(50% - 150px);
      /*垂直居中 */
      left: calc(50% - 50px);

      /*水平居中 */
      .icon-snapchat {
        width: 300px;
        height: 300px;
        font-size: 300px;
        // color: rgb(28, 30, 44);
      }
    }
  }
}
</style>