<template>
    <div class="flex-item-ctn">
        <div class="flex-item">
            <!-- <img src="../../../assets/images/monitorDashboard/laboratory.png"> -->
            <div class="item-ctn" :style="{
                backgroundImage: `url('${baseURL}images/monitorDashboard/laboratory.png')`,
            }"></div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, watch, onMounted, onBeforeUnmount } from "vue";

const baseURL: any = import.meta.env.BASE_URL;

onMounted(() => {
    init();
});
const init = async () => {

    //请求API

};


</script>
<style lang="less" scoped>
.flex-item-ctn {
    background-image: url('');
    // background-color: rgba(128, 201, 60, 0.767);

    .flex-item {
        // background-color: rgba(255, 116, 116, 0.5);
        height: 35.5rem;
        width: 100%;
        position: relative;

        .item-ctn {
            width: 100%;
            height: 100%;
            background-size: 120% 130%;
            background-position: center;
            /* 防止背景图片重复 */
            background-repeat: no-repeat;
            position: relative;
        }
    }
}
</style>
