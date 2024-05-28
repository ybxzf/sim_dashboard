<template>
    <div class="flex-item-ctn">
        <div class="flex-item">
            <div class="item-title">
                <span>昨日电量统计</span>
            </div>
            <div class="pie-item-unit">单位：kWh</div>
            <div class="pie-item" :class="`pie-item-${index + 1}`" v-for="(item, index) in seriesData" :key="index">
                <div>{{ item.name }}</div>
                <div :style="{ color: item.itemStyle.color }" class="item-value">{{ item.value }}</div>
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
const seriesData = ref<any>([]);

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
onMounted(() => {
    myChart = echarts.init(lineChartRef.value);
    init();
    setInterval(() => {
        // console.log('更新数据：昨日电量统计');
        init();
    }, 5000)
    window.addEventListener('resize', () => {
        myChart.resize();
    });
});
const init = async () => {
    //默认日发电量请求API
    // const res: any = await API();
    // option.legend.data = ['光伏发电量', '储能总充电量', '充电桩耗电量', '储能总放电量', '搜索引擎'];
    seriesData.value = [
        { value: 8975, name: '光伏发电量', itemStyle: { color: 'skyblue' }, },
        { value: 12594, name: '储能总充电量', itemStyle: { color: 'green' }, },
        { value: 12594, name: '储能总放电量', itemStyle: { color: 'orange' }, },
        { value: 12594, name: '充电桩耗电量', itemStyle: { color: 'red' }, },
    ];
    try {
        const res: any = await getYesterdayElectricity();
        // console.log(res);
        if (res.code === 0) {
            res?.data.map((it: any) => {
                if (it.typeCode === '光伏') {
                    seriesData.value[0] = Number(it.quantity);
                } else if (it.typeCode === '储能充') {
                    seriesData.value[1] = Number(it.quantity);
                } else if (it.typeCode === '储能放') {
                    seriesData.value[2] = Number(it.quantity);
                } else {
                    seriesData.value[3] = Number(it.quantity);
                }
            })
        } else {
            new Error('失败');
        }
    } catch (error) {
        // console.log('error：昨日电量统计数据获取失败!');
    }



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
    }
}
</style>
