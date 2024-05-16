<template>
    <div class="flex-item-ctn">
        <div class="flex-item">
            <div class="item-title">
            </div>
            <div class="pie-item" :class="`pie-item-${index + 1}`" v-for="(item, index) in seriesData" :key="index">
                <div>{{ item.name }}</div>
                <div :style="{ color: item.itemStyle.color }" class="item-value">{{ item.value }}</div>
            </div>
            <!-- <div class=" pie-item pie-item-1">
                <div>光伏发电量</div>
                <div>xxx</div>
            </div>
            <div class="pie-item pie-item-2">
                <div>储能总充电量</div>
                <div>xxx</div>
            </div>
            <div class="pie-item pie-item-3">
                <div>充电桩耗电量</div>
                <div>xxx</div>
            </div>
            <div class="pie-item pie-item-4">
                <div>储能总放电量</div>
                <div>xxx</div>
            </div> -->
            <div ref="lineChart" class="item-chart"></div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, watch, onMounted, onBeforeUnmount } from "vue";
import * as echarts from 'echarts';

const lineChart = ref<any>();
const seriesData = ref<any>([]);

let myChart: any = null;
let option: any = {
    title: {
        // 图形标题(如果想要换行则使用ES6 `` 模板字符串)
        // 例如： `示例
        //   这里的文字会变为第二行(因为会保留格式)
        text: '电量',
        left: "center",//对齐方式居中
        top: "center",//距离顶部
        textStyle: {//文字配置
            color: "#ffaaff",//文字颜色
            fontSize: '2rem',//字号
            align: "center"//对齐方式
        }
    },
    tooltip: {
        position: 'right',
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c}kw/h ({d}%)'
    },
    legend: {
        // show: false,
        orient: 'vertical',
        left: 10,
        data: [],
    },
    series: [
        {
            name: '电量',
            type: 'pie',
            radius: ['40%', '47%'],
            avoidLabelOverlap: false,
            label: {
                // show: false,
                // position: 'center',
                formatter: ''
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '30',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [],
        }
    ]
};
onMounted(() => {
    myChart = echarts.init(lineChart.value);
    init();
    window.addEventListener('resize', () => {
        myChart.resize();
    });
});
const init = async () => {
    //默认日发电量请求API
    // const res: any = await API();
    // option.legend.data = ['光伏发电量', '储能总充电量', '充电桩耗电量', '储能总放电量', '搜索引擎'];
    seriesData.value = [
        { value: 8975, name: '光伏发电量', itemStyle: { color: 'skyblue' } },
        { value: 12594, name: '储能总充电量', itemStyle: { color: 'green' }, },
        {
            value: 12594, name: '充电桩耗电量', itemStyle: { color: 'red' },
        },
        { value: 12594, name: '储能总放电量', itemStyle: { color: 'orange' } },
    ];
    option.series[0].data = seriesData.value;
    myChart.setOption(option);
    myChart.resize();
};

</script>
<style lang="less" scoped>
.flex-item-ctn {
    display: block;
    position: relative;
    font-size: 1rem;
    font-weight: bolder;

    .item-title {
        border: 1px solid #83eeb0;
        height: 2.7rem;
        font-size: 1rem;
        padding-right: 1rem;
    }

    .pie-item {
        position: absolute;
        color: #b3b3b3;

        >* {
            display: flex;
            justify-content: center;
        }

        .item-value {
            font-size: 1.5rem;
        }
    }

    .pie-item-1 {
        top: 5rem;
        left: 2rem;
    }

    .pie-item-2 {
        top: 5rem;
        right: 2rem;
    }

    .pie-item-3 {
        bottom: 2rem;
        left: 2rem;
    }

    .pie-item-4 {
        bottom: 2rem;
        right: 2rem;
    }

    .item-chart {
        width: 100%;
        height: 16rem;
        border: 1px solid red;
    }
}
</style>
