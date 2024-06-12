<template>
    <div class="flex-item-ctn">
        <div class="flex-item">
            <div class="item-title">
                <span>事件信息</span>
            </div>
            <!-- <img style="width: 100%; height : 16rem;"
                src="../../../assets/images/monitorDashboard/middleLeftBottom.png"> -->
            <div class="content-cnt">
                <div class="content-cnt-item" v-for="(it, i) in informList" :key="i">
                    <div class="content-cnt-item-left">信息</div>

                    <div v-if="(it.useDevice + it.useDate).length < 23" class="content-cnt-item-right">检测到
                        <span class="item-device">{{ it.useDevice }} </span>
                        <span class="item-date">{{ it.useDate }} </span>
                        在使用。
                    </div>
                    <el-tooltip v-else effect="customized" :content="`检测到${it.useDevice}${it.useDate}在使用。`"
                        placement="top">
                        <div class="content-cnt-item-right">检测到
                            <span class="item-device">{{ it.useDevice }} </span>
                            <span class="item-date">{{ it.useDate }} </span>
                            在使用。
                        </div>
                    </el-tooltip>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, watch, onMounted, onBeforeUnmount } from "vue";
import { getDayEventInfo } from "@/utils/api/monitorDashboardServer";

const baseURL: any = import.meta.env.BASE_URL;
const informList = ref<any[]>([]);

let interval: any = null; //循环器

onMounted(() => {
    init();
    interval = setInterval(() => {
        init();
    }, 1000 * 30)
});
const init = async () => {
    //请求api
    getDayEventInfo().then((res: any) => {
        if (res.code === 0) {
            informList.value = res.data;
        }
    })
    // informList.value = [
    //     { useDevice: '冰箱、空调、洗衣机', useDate: '2023-11-11 14:00' },
    //     { useDevice: '冰箱、空调', useDate: '2023-11-11 14:00' },
    //     { useDevice: '冰箱、空调', useDate: '2023-11-11 14:00' },
    //     { useDevice: '冰箱、空调', useDate: '2023-11-11 14:00' },
    //     { useDevice: '冰箱、空调', useDate: '2023-11-11 14:00' },
    //     { useDevice: '冰箱、空调', useDate: '2023-11-11 14:00' },
    // ];
};

onBeforeUnmount(() => {
    // console.log('事件信息关闭');
    clearInterval(interval);
})

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

        .content-cnt {
            width: 100%;
            height: 15rem;
            // background-color: rgba(1, 255, 255, 0.2);
            overflow-y: auto;
            color: #fff;

            .content-cnt-item {
                display: flex;
                align-items: center;
                padding: 0.5rem 0;

                .content-cnt-item-left {
                    margin: 0 1rem;
                    background-image: url('../../../assets/images/monitorDashboard/inform.png');
                    background-size: 100% 100%;
                    background-position: center;
                    /* 防止背景图片重复 */
                    background-repeat: no-repeat;
                    width: 4.5rem;
                    height: 2rem;
                    display: flex;
                    justify-content: center;
                    align-items: center
                }

                .content-cnt-item-right {
                    letter-spacing: 0.01rem;
                    font-size: 0.9rem;
                    width: 20rem;
                    background-color: rgba(1, 255, 255, 0.2);
                    // 隐藏超出边界的内容
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    align-items: center;
                    /* 显示的行数 */
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    /* 恢复正常的空白处理 */
                    white-space: normal;
                    /* 可选，增加边框以便更好地展示效果 */
                    // border: 1px solid #ccc;

                    .item-device {
                        color: rgb(255, 87, 36);
                    }

                    .item-date {
                        color: rgb(255, 217, 0);
                    }
                }
            }
        }
    }

}

/* 隐藏滚动条 (仅适用于 Webkit 内核的浏览器，例如 Chrome 和 Safari) */
.content-cnt::-webkit-scrollbar {
    display: none;
}
</style>
