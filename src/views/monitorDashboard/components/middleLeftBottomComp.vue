<template>
    <div class="flex-item-ctn">
        <div class="flex-item">
            <div class="item-title">
                <span>时间信息</span>
            </div>
            <img style="width: 100%; height : 16rem;"
                src="../../../assets/images/monitorDashboard/middleLeftBottom.png">
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

};

</script>
<style lang="less" scoped>
.flex-item-ctn {
    display: block;
    position: relative;
    font-size: 1rem;
    font-weight: bolder;

    .flex-item {
        width: 100%;
        height: 20rem;
    }

    .item-chart {
        width: 100%;
        height: 16rem;
        // border: 1px solid red;
    }
}
</style>
