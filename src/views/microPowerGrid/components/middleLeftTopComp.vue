<template>
    <div class="flex-item-ctn">
        <div class="flex-item">
            <div class="item-title">
                <span>昨日电量统计</span>
            </div>
            <div class="pie-item-unit">单位：kWh</div>
            <div class="pie-item" :class="`pie-item-${index + 1}`" v-for="(item, index) in seriesData" :key="index">
                <div>{{ item.name }}</div>
                <div v-if="String(item.value).length < 7" :style="{ color: item.itemStyle?.color }" class="item-value">
                    {{ item.value }}</div>
                <el-tooltip v-else effect="customized" :content="`${item.value}`" placement="top">
                    <div :style="{ color: item.itemStyle?.color }" class="item-value">{{ String(item.value).slice(0, 3)
                        }}...
                    </div>
                </el-tooltip>
            </div>
            <div ref="lineChartRef" class="item-chart"></div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, watch, onMounted, onBeforeUnmount } from "vue";
import * as echarts from 'echarts';
import { getYesterdayElectricity } from '@/utils/api/microPowerGridServer'

const lineChartRef = ref<any>();
const seriesData = ref<any[]>([
    { value: 0, name: '光伏发电量', itemStyle: { color: 'skyblue' }, },
    { value: 0, name: '储能总充电量', itemStyle: { color: 'green' }, },
    { value: 0, name: '储能总放电量', itemStyle: { color: 'orange' }, },
    { value: 0, name: '充电桩耗电量', itemStyle: { color: 'red' }, },
]);

let myChart: any = null;
let option: any = {
    title: {
        text: '电量',
        left: "center",//对齐方式居中
        top: "center",//距离顶部
        textStyle: {//文字配置
            color: "#ffffff",//文字颜色
            fontSize: '2rem',//字号
            align: "center"//对齐方式
        }
    },
    tooltip: {
        position: 'right',
        trigger: 'item',
        borderColor: 'transparent',
        backgroundColor: 'rgb(101, 211, 255, 0.5)',
        borderRadius: '2',
        textStyle: {
            color: "#fff", // 文字的颜色
            border: 'none',
        },
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
            radius: ['40%', '45%'],
            avoidLabelOverlap: false,
            startAngle: 180,//  起始角度
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
let interval: any = null; //循环器

onMounted(() => {
    myChart = echarts.init(lineChartRef.value);
    init();
    interval = setInterval(() => {
        // console.log('更新数据：昨日电量统计');
        init();
    }, 5000)
    window.addEventListener('resize', () => {
        myChart.resize();
    });
});
const init = () => {
    //请求API
    getYesterdayElectricity().then((res: any) => {
        // console.log(res);
        if (res.code === 0) {
            if (Object.prototype.hasOwnProperty.call(res, 'data')) {
                res.data.map((item: any) => {
                    if (item.typeCode === '光伏') {
                        seriesData.value[0].value = Number(item.quantity);
                    } else if (item.typeCode === '储能充') {
                        seriesData.value[1].value = Number(item.quantity);
                    } else if (item.typeCode === '储能放') {
                        seriesData.value[2].value = Number(item.quantity);
                    } else {
                        seriesData.value[3].value = Number(item.quantity);
                    }
                })
            }
        } else {
            new Error('yesterdayElectricity失败');
        }

    });



    option.series[0].data = seriesData.value;
    myChart.setOption(option);
    myChart.resize();
};

onBeforeUnmount(() => {
    // console.log('关闭');
    myChart.clear();
    clearInterval(interval);
})

</script>
<style lang="less" scoped>
.flex-item-ctn {
    display: block;
    position: relative;
    font-size: 1rem;
    font-weight: bolder;

    .pie-item-unit {
        position: absolute;
        left: 11.5rem;
        top: 4.5rem;
        color: #fff;
        font-size: 1.2rem;
    }

    .pie-item {
        position: absolute;
        color: #b3b3b3;
        z-index: 2;

        >* {
            display: flex;
            justify-content: center;
        }

        .item-right-bottom {
            height: 2.5rem;
            display: flex;
            align-items: end;
            color: rgb(199, 239, 255);
        }
    }

    .item-value {
        font-size: 1.5rem;
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
        right: 2rem;
    }

    .pie-item-4 {
        bottom: 2rem;
        left: 2rem;
    }

    .item-chart {
        width: 100%;
        height: 16rem;
        // border: 1px solid red;
        // background-color: rgba(255, 255, 255, 0.5);
    }
}
</style>
