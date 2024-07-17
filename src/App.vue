<template>
  <div id="app" @mousemove="resetTimer" @mousedown="resetTimer" @keypress="resetTimer" @touchstart="resetTimer">
    <router-view />
  </div>
</template>
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted, onBeforeUnmount } from "vue";

const timer = ref<any>(null);

onMounted(() => {
  startTimer();
  //监听鼠标键盘所有事件，触发时重置刷新时间
  window.addEventListener('mousemove', resetTimer);
  window.addEventListener('mousedown', resetTimer);
  window.addEventListener('keypress', resetTimer);
  window.addEventListener('touchstart', resetTimer);
});

const startTimer = () => {
  clearTimer();
  timer.value = setTimeout(() => {
    handleInactivity();
  }, 1000 * 60 * 15);
};

const clearTimer = () => {
  if (timer.value) {
    clearTimeout(timer.value);
  }
};

const resetTimer = () => {
  startTimer();
};

const handleInactivity = () => {
  //设置超时刷新
  window.location.reload();
};

onBeforeUnmount(() => {
  clearTimer();
  window.removeEventListener('mousemove', resetTimer);
  window.removeEventListener('mousedown', resetTimer);
  window.removeEventListener('keypress', resetTimer);
  window.removeEventListener('touchstart', resetTimer);
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
