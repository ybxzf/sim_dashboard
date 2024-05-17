<template>
    <div class="flex-item-ctn">
        <div class="flex-item">
            <span class="item-title">示范小区光储充微电网</span>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, watch, onMounted, onBeforeUnmount } from "vue";


const init = async () => { };
onMounted(() => {
    init();
});
</script>
<style lang="less" scoped>
.flex-item-ctn {
    background-image: url('');

    .flex-item {
        // border: 1px solid #83eeb0;
        width: 120rem;
        display: flex;
        justify-content: center;
    }

    .item-title {
        font-size: 2rem;
        padding: 0 1rem 0 7rem;
        letter-spacing: 0.3rem; //字体间隔
    }
}
</style>
