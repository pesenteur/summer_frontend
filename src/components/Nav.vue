<template>
  <div class="nav">
    <div class="nav-menu-wrapper">
    </div>
    <div class="own-pic">
      <HeadPortrait :imgUrl="imgUrl"></HeadPortrait>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import HeadPortrait from "./HeadPortrait.vue";

const menuList = ref([
  "icon-xinxi",
  "icon-shipin",
  "icon-shu",
  "icon-shandian",
  "icon-shezhi",
]);
const current = ref(0);
import imgUrl from '@/assets/img/head_portrait.jpg';


const changeMenu = (index) => {
  switch (index) {
    case 0:
      this.$router.push({
        name: "ChatHome",
      });
      break;
    case 1:
    case 2:
    case 3:
    case 4:
      this.$message("该功能还没有开发哦，敬请期待一下吧~🥳");
      break;
    default:
      this.$router.push({
        name: "ChatHome",
      });
  }
  current.value = index;
};

</script>

<style lang="scss" scoped>
@import url(../assets/font/iconfont.css);
.iconfont {
  font-family: "iconfont" !important;
  font-style: normal;
  font-size: 25px;
  vertical-align: middle;
  color: rgb(117,120,137);
  transition: .3s;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.nav {
  width: 100%;
  height: 90vh;
  position: relative;
  border-radius: 20px 0 0 20px;

  .nav-menu-wrapper {
    position: absolute;
    top: 40%;
    transform: translate(0, -50%);

    .menu-list {
      margin-left: 10px;

      li {
        margin: 40px 0 0 30px;
        list-style: none;
        cursor: pointer;
        position: relative;

        .block {
          background-color: rgb(29, 144, 245);
          position: absolute;
          left: -40px;
          width: 6px;
          height: 25px;
          transition: 0.5s;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
          opacity: 0;
        }

        &:hover {
          span {
            color: rgb(29, 144, 245);
          }

          .block {
            opacity: 1;
          }
        }
      }
    }
  }

  .own-pic {
    position: absolute;
    bottom: 10%;
    margin-left: 25px;
  }
}

.activeNav {
  span {
    color: rgb(29, 144, 245);
  }

  .block {
    opacity: 1 !important;
  }
}</style>