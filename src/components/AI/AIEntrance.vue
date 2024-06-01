<template>
    <div class="ai-entrance-container">
        <img class="img-container" src="..\..\assets\images\customer_service.png" alt="no image" @click="openDialogBox()">
    </div>

    <el-dialog
      v-model="centerDialogVisible"
      title="生活小助手"
      width="70%"
      align-center
    >
        <ChatMechine/>
    </el-dialog>
</template>

<script>
import ChatMechine from "./ChatBox.vue"
export default {
    name: "AIEntrance",
    components: {
        ChatMechine,
    },
    data() {
        return{
            centerDialogVisible: false,
        }
    },
    methods: {
        openDialogBox(){
            this.centerDialogVisible = true;
        }
    }
}
</script>

<style scoped>
.ai-entrance-container {
  bottom: 110px;
  right: 70px;
  width: 60px;
  height: 60px;
  position: fixed;
  display: flex;
  align-items: center;
}

.img-container{
width: 60px;
  height: 60px;
}
</style>