<template>
    <div class="flex-item-ctn">
        <div class="flex-item">
            <div class="item-title">
                <span>中央空调实时监控</span>
            </div>
            <div class="item-content">
                <div class="content-title">
                    <img src="../../../assets//images//microPowerGrid/mini_title.png">
                    <span>运行概况</span>
                </div>
                <div class="content-cnt">
                    <div class="content-cnt-item">
                        <div style="flex:1">1.1</div>
                        <div style="flex:2">1.2</div>
                    </div>
                    <div class="content-cnt-item">
                        <div style="flex:1">1.1</div>
                        <div style="flex:2">1.2</div>
                    </div>
                    <div class="content-cnt-item">
                        <div style="flex:1">1.1</div>
                        <div style="flex:2">1.2</div>
                    </div>
                    <div class="content-cnt-item">
                        <div style="flex:1">1.1</div>
                        <div style="flex:2">1.2</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, watch, onMounted, onBeforeUnmount } from "vue";


onMounted(() => {
    init();
});
const init = async () => { };
</script>
<style lang="less" scoped>
.flex-item-ctn {
    display: block;
    font-size: 1rem;
    background-image: url('');

    .flex-item {
        padding: 0 1rem 1rem 1rem;

        .item-title {
            // border: 1px solid #53ff5b;
            height: 3rem;
            font-size: 1rem;
            display: flex;
            align-items: center;
        }

        .item-content {
            width: 30rem;
            height: 16.7rem;
            // border: 1px solid red;

            .content-title {
                // border: 1px solid #fff;
                height: 1.7rem;
                position: relative;
                padding-left: 2rem;
                font-style: italic;
                font-weight: bolder;
                color: #fff;
                background: linear-gradient(to bottom, white, rgb(148, 203, 255));
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;

                img {
                    position: absolute;
                    width: 20rem;
                    left: 1.2rem;
                }
            }

            .content-cnt {
                // border: 1px solid #fff;
                background-color: #fff;

                height: 15rem;
                display: flex;
                flex-wrap: wrap;
                justify-content: center;

                .content-cnt-item {
                    border: 1px solid;
                    flex-basis: 13rem;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;

                    >* {
                        border: 1px solid;
                        // flex-basis: 6rem;
                    }
                }
            }
        }
    }
}
</style>
