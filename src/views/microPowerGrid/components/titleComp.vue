<template>
    <div class="flex-item-ctn">
        <div class="flex-item">
            <span class="item-title">{{ title }}</span>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, watch, onMounted, onBeforeUnmount } from "vue";
import { getTitle } from "@/utils/api/microPowerGridServer";
import { ElMessage } from 'element-plus'

const title = ref<string>("");
onMounted(() => {
    init();
});
const init = async () => {
    getTitle().then((res: any) => {
        if (res.code === 0) {
            title.value = res.msg;
        }
    }).catch((_err: any) => {
        ElMessage({
            message: `标题请求失败！`,
            type: 'error',
        });
    })
};
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
