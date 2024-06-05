<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from "vue";

onMounted(() => {
  //10分钟刷新一次页面
  setInterval(() => {
    window.location.reload();
  }, 1000 * 60 * 10)
});
</script>

<style lang="less" scoped>
html,
body {
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
}

#app {
  // font-family: "Avenir", Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  // color: #2c3e50;
}

// .router-view {
//   width: 100%;
//   height: auto;
//   position: absolute;
//   top: 0;
//   bottom: 0;
//   margin: 0 auto;
// }</style>
