<template>
    <div class="pg-ctn">
        <el-row class="pg-title-ctn">
            <el-col class="pg-title-col" :span="24">
                <titleComp />
            </el-col>
        </el-row>
        <el-row class="pg-content-ctn">
            <el-col :span="6">
                <el-row class="content-item">
                    <el-col :span="24">
                        <middleLeftTopComp />
                    </el-col>
                    <el-col :span="24">
                        <middleLeftMiddleComp />
                    </el-col>
                    <el-col :span="24">
                        <middleLeftBottomComp />
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="12">
                <el-row class="content-item">
                    <el-col :span="24">
                        <middleMiddleTopComp />
                    </el-col>
                    <el-col :span="24">
                        <middleMiddleBottomComp />
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="6">
                <el-row class="content-item">
                    <el-col :span="24">
                        <middleRightComp />
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, watch, onMounted, onBeforeUnmount } from "vue";
import titleComp from "./components/titleComp.vue";
import middleLeftTopComp from "./components/middleLeftTopComp.vue";
import middleLeftMiddleComp from "./components/middleLeftMiddleComp.vue";
import middleLeftBottomComp from "./components/middleLeftBottomComp.vue";
import middleMiddleTopComp from "./components/middleMiddleTopComp.vue";
import middleMiddleBottomComp from "./components/middleMiddleBottomComp.vue";
import middleRightComp from "./components/middleRightComp.vue";

onMounted(() => {
    init();
});
const init = async () => { };
</script>
<style lang="less" scoped>
.pg-ctn {
    width: 120rem;
    height: 67.5rem;
    background-image: url('../../assets/images/base/bg.png');
    background-size: 100% 100%;
    overflow-x: hidden !important;

    .pg-title-ctn {
        height: 5rem;
    }

    .pg-content-ctn {
        height: 62.5rem;
    }
}
</style>
