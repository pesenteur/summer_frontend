<template>
  <div>
    <el-button type="text" @click="dialogVisible = true">新建项目</el-button>

    <el-dialog
        title="提示"
        v-model="dialogVisible"
        width="30%"
        :before-close="handleClose">
      <span>这是一段信息</span>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(() => {
            done(); // 调用关闭对话框的回调函数
          })
          .catch(() => {});
    },
    handleConfirm() {
      // 在这里处理确认按钮点击的逻辑
      this.dialogVisible = false; // 关闭对话框
    }
  }
};
</script>