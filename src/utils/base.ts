/**
 * 用于生成echarts-3D图形时调用的方法
 * @param startRatio 起始坐标
 * @param endRatio 结束坐标
 * @param isSelected 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
 * @param isHovered 计算高亮效果的放大比例（未高亮，则比例为 1）
 * @param k 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
 * @param height
 * @returns
 */
export function getParametricEquation(
  startRatio: number,
  endRatio: number,
  isSelected: boolean,
  isHovered: boolean,
  k: any,
  height: any
) {
  // 计算
  const midRatio: any = (startRatio + endRatio) / 2;

  const startRadian: any = startRatio * Math.PI * 2;
  const endRadian: any = endRatio * Math.PI * 2;
  const midRadian: any = midRatio * Math.PI * 2;

  // 如果只有一个扇形，则不实现选中效果。
  if (startRatio === 0 && endRatio === 1) {
    isSelected = false;
  }

  // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
  k = typeof k !== "undefined" ? k : 1 / 3;

  // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
  const offsetX: any = isSelected ? Math.cos(midRadian) * 0.1 : 0;
  const offsetY: any = isSelected ? Math.sin(midRadian) * 0.1 : 0;

  // 计算高亮效果的放大比例（未高亮，则比例为 1）
  const hoverRate: any = isHovered ? 1.05 : 1;

  // 返回曲面参数方程
  return {
    u: {
      min: -Math.PI,
      max: Math.PI * 3,
      step: Math.PI / 32,
    },

    v: {
      min: 0,
      max: Math.PI * 2,
      step: Math.PI / 20,
    },

    x: function (u: any, v: any) {
      if (u < startRadian) {
        return (
          offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate
        );
      }
      if (u > endRadian) {
        return (
          offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
        );
      }
      return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
    },

    y: function (u: any, v: any) {
      if (u < startRadian) {
        return (
          offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate
        );
      }
      if (u > endRadian) {
        return (
          offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
        );
      }
      return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
    },

    z: function (u: any, v: any) {
      if (u < -Math.PI * 0.5) {
        return Math.sin(u);
      }
      if (u > Math.PI * 2.5) {
        return Math.sin(u);
      }
      return Math.sin(v) > 0 ? 1 * height : -1;
    },
  };
}
/**
 * 生成模拟 3D 饼图的配置项
 * @param pieData 饼图数据
 * @param internalDiameterRatio 透明的空心占比
 * @returns
 */
export function getPie3D(pieData: any, internalDiameterRatio: number) {
  const series: any[] = [];
  let sumValue = 0;
  let startValue = 0;
  let endValue = 0;
  const legendData: any = [];
  const k: any =
    typeof internalDiameterRatio !== "undefined"
      ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
      : 1 / 3;

  // 为每一个饼图数据，生成一个 series-surface 配置
  for (let i = 0; i < pieData.length; i++) {
    sumValue += pieData[i].value;

    const seriesItem: any = {
      name:
        typeof pieData[i].name === "undefined" ? `series${i}` : pieData[i].name,
      type: "surface",
      parametric: true,
      wireframe: {
        show: false,
      },
      pieData: pieData[i],
      pieStatus: {
        selected: false,
        hovered: false,
        k: k,
      },
    };

    if (typeof pieData[i].itemStyle != "undefined") {
      const itemStyle: any = {};

      typeof pieData[i].itemStyle.color != "undefined"
        ? (itemStyle.color = pieData[i].itemStyle.color)
        : null;
      typeof pieData[i].itemStyle.opacity != "undefined"
        ? (itemStyle.opacity = pieData[i].itemStyle.opacity)
        : null;

      seriesItem.itemStyle = itemStyle;
    }
    series.push(seriesItem);
  }

  // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
  // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
  for (let i = 0; i < series.length; i++) {
    endValue = startValue + series[i].pieData.value;
    series[i].pieData.startRatio = startValue / sumValue;
    series[i].pieData.endRatio = endValue / sumValue;
    series[i].parametricEquation = getParametricEquation(
      series[i].pieData.startRatio,
      series[i].pieData.endRatio,
      false,
      false,
      k,
      series[i].pieData.value
    );

    startValue = endValue;

    legendData.push(series[i].name);
  }
  return series;
}

/**
 * 将时间戳格式化为“YYYY-MM-DD”格式
 * @param date 时间戳
 * @returns “YYYY-MM-DD”格式字符串日期
 */
export function formatterDate(date: Date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

/**
 * 将时间戳格式化为“YYYY-MM”格式
 * @param date 时间戳
 * @returns “YYYY-MM”格式字符串日期
 */
export function formatterMonth(date: Date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const formattedDate = `${year}-${month}`;
  return formattedDate;
}
