<template>
  <div class="home">
    <el-container height="100%">
      <el-aside width="100px">
        <Nav></Nav>
      </el-aside>
      <el-main>
        <Index></Index>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Nav from "../components/Nav.vue";
import Index from "./pages/chatHome/index.vue"
export default {
  name: "App",
  components: {
    Nav,
    Index
  },
};
</script>

<style lang="scss" scoped>
.el-main{
  padding: 0;
  margin: 0;
  bottom: 0;
}
.home {
  width: 1000px;
  height: 100vh;
  background-color: white;
  border-radius: 0px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-59%, -45%);
}
</style>