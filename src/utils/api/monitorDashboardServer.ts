import $axios from "@/utils/interceptor";

/**
 * 获取昨日电量统计数据
 * @returns 昨日电量统计数据
 */
export function getYesyterdayJyfhTj() {
  // return $axios({
  //   method: "get",
  //   url: `/api/bigScreen/getYesyterdayJyfhTj`,
  // });
  return new Promise<any>((resolve, reject) => {
    resolve({
      "msg": "操作成功",
      "code": 0,
      "data": {
        "allpz": (Math.random() * 1000).toFixed(1), //总功率
        "daydl": (Math.random() * 100).toFixed(1), //日电量
        "monthdl": "100.15"  //总电量
      }
    })
  })
}

/**
 * 获取家用负荷实时功率，家用电器实时功率曲线数据
 * @returns 家用负荷实时功率曲线数据
 */
export function getSsJyfhGvTj() {
  // return $axios({
  //     method: 'get',
  //     url: '/api/bigScreen/ssJyfhGvTj',
  // })
  return new Promise((resolve, reject) => {
    resolve({
      msg: "操作成功",
      code: 0,
      data: [
        {
          field03: "中央空调",
          data_date: "2014-06-22 00:00:00",
        },
        {
          field03: "室内空调",
          data_date: "2014-06-22 00:00:00",
          pz: (Math.random() * 1000).toFixed(1),
        },
        {
          pz: Number((Math.random() * 100).toFixed(2)),
          field03: "电磁炉",
          data_date: "2014-06-22 00:00:00",
        },
        {
          pz: Number((Math.random() * 100).toFixed(2)),
          field03: "微波炉",
          data_date: "2014-06-22 00:00:00",
        },
        {
          pz: Number((Math.random() * 100).toFixed(2)),
          field03: "洗衣机",
          data_date: "2014-06-22 00:00:00",
        },
        {
          qz: -0.0021,
          pz: 0.0064,
          data_date: "2014-06-22 01:00:00",
          ua: 232.6,
          ub: 233.6,
          uc: 233.7,
          qa: -0.0006,
          pa: 0.0006,
          qb: -0.0015,
          pb: 0.0049,
          qc: 0,
          pc: 0.0007,
          field03: "中央空调",
          ia: 0,
          ib: 0.02,
          ic: 0,
        },
        {
          field03: "室内空调",
          data_date: "2014-06-22 01:00:00",
          pz: (Math.random() * 1000).toFixed(1),
        },
        {
          pz: Number((Math.random() * 100).toFixed(2)),
          field03: "电磁炉",
          data_date: "2014-06-22 01:00:00",
        },
        {
          pz: Number((Math.random() * 100).toFixed(2)),
          field03: "微波炉",
          data_date: "2014-06-22 01:00:00",
        },
        {
          pz: Number((Math.random() * 100).toFixed(2)),
          field03: "洗衣机",
          data_date: "2014-06-22 01:00:00",
        },
        {
          qz: -0.0021,
          pz: 0.0064,
          data_date: "2014-06-22 02:00:00",
          ua: 234,
          ub: 234.8,
          uc: 234.9,
          qa: -0.0006,
          pa: 0.0006,
          qb: -0.0015,
          pb: 0.0049,
          qc: 0,
          pc: 0.0008,
          field03: "中央空调",
          ia: 0,
          ib: 0.02,
          ic: 0,
        },
        {
          field03: "室内空调",
          data_date: "2014-06-22 02:00:00",
          pz: (Math.random() * 1000).toFixed(1),
        },
        {
          pz: Number((Math.random() * 100).toFixed(2)),
          field03: "电磁炉",
          data_date: "2014-06-22 02:00:00",
        },
        {
          pz: Number((Math.random() * 100).toFixed(2)),
          field03: "微波炉",
          data_date: "2014-06-22 02:00:00",
        },
        {
          pz: Number((Math.random() * 100).toFixed(2)),
          field03: "洗衣机",
          data_date: "2014-06-22 02:00:00",
        },
        {
          qz: -0.0021,
          pz: 0.0064,
          data_date: "2014-06-22 03:00:00",
          ua: 233.8,
          ub: 234.8,
          uc: 235,
          qa: -0.0006,
          pa: 0.0006,
          qb: -0.0015,
          pb: 0.0049,
          qc: 0,
          pc: 0.0008,
          field03: "中央空调",
          ia: 0,
          ib: 0.02,
          ic: 0,
        },
        {
          field03: "室内空调",
          data_date: "2014-06-22 03:00:00",
          pz: (Math.random() * 1000).toFixed(1),
        },
        {
          field03: "电磁炉",
          data_date: "2014-06-22 03:00:00",
        },
        {
          field03: "微波炉",
          data_date: "2014-06-22 03:00:00",
        },
        {
          field03: "洗衣机",
          data_date: "2014-06-22 03:00:00",
        },
        {
          qz: -0.002,
          pz: 0.0064,
          data_date: "2014-06-22 04:00:00",
          ua: 235.3,
          ub: 236,
          uc: 236.3,
          qa: -0.0006,
          pa: 0.0006,
          qb: -0.0014,
          pb: 0.0049,
          qc: 0,
          pc: 0.0008,
          field03: "中央空调",
          ia: 0,
          ib: 0.02,
          ic: 0,
        },
        {
          field03: "室内空调",
          data_date: "2014-06-22 04:00:00",
          pz: (Math.random() * 1000).toFixed(1),
        },
        {
          field03: "电磁炉",
          data_date: "2014-06-22 04:00:00",
        },
        {
          field03: "微波炉",
          data_date: "2014-06-22 04:00:00",
        },
        {
          field03: "洗衣机",
          data_date: "2014-06-22 04:00:00",
        },
        {
          qz: -0.0021,
          pz: 0.0064,
          data_date: "2014-06-22 05:00:00",
          ua: 236,
          ub: 236.6,
          uc: 236.9,
          qa: -0.0006,
          pa: 0.0006,
          qb: -0.0015,
          pb: 0.0049,
          qc: 0,
          pc: 0.0008,
          field03: "中央空调",
          ia: 0,
          ib: 0.02,
          ic: 0,
        },
        {
          field03: "室内空调",
          data_date: "2014-06-22 05:00:00",
          pz: (Math.random() * 1000).toFixed(1),
        },
        {
          field03: "电磁炉",
          data_date: "2014-06-22 05:00:00",
        },
        {
          field03: "微波炉",
          data_date: "2014-06-22 05:00:00",
        },
        {
          field03: "洗衣机",
          data_date: "2014-06-22 05:00:00",
        },
        {
          qz: -0.0008,
          pz: 0.064,
          data_date: "2014-06-22 06:00:00",
          ua: 235.4,
          ub: 236.1,
          uc: 236.3,
          qa: -0.0006,
          pa: 0.0006,
          qb: -0.0002,
          pb: 0.0625,
          qc: 0,
          pc: 0.0008,
          field03: "中央空调",
          ia: 0,
          ib: 0.26,
          ic: 0,
        },
        {
          field03: "室内空调",
          data_date: "2014-06-22 06:00:00",
          pz: (Math.random() * 1000).toFixed(1),
        },
        {
          field03: "电磁炉",
          data_date: "2014-06-22 06:00:00",
        },
        {
          field03: "微波炉",
          data_date: "2014-06-22 06:00:00",
        },
        {
          field03: "洗衣机",
          data_date: "2014-06-22 06:00:00",
        },
        {
          qz: -0.001,
          pz: 0.006,
          data_date: "2014-06-22 07:00:00",
          ua: 237.5,
          ub: 238.2,
          uc: 238.4,
          qa: -0.0006,
          pa: 0.0006,
          qb: -0.0004,
          pb: 0.0045,
          qc: 0,
          pc: 0.0008,
          field03: "中央空调",
          ia: 0,
          ib: 0.03,
          ic: 0,
        },
        {
          field03: "室内空调",
          data_date: "2014-06-22 07:00:00",
          pz: (Math.random() * 1000).toFixed(1),
        },
        {
          field03: "电磁炉",
          data_date: "2014-06-22 07:00:00",
        },
        {
          field03: "微波炉",
          data_date: "2014-06-22 07:00:00",
        },
        {
          field03: "洗衣机",
          data_date: "2014-06-22 07:00:00",
        },
        {
          qz: -0.0009,
          pz: 0.0056,
          data_date: "2014-06-22 08:00:00",
          ua: 232.5,
          ub: 233.5,
          uc: 233.6,
          qa: -0.0005,
          pa: 0.0006,
          qb: -0.0004,
          pb: 0.0041,
          qc: 0,
          pc: 0.0008,
          field03: "中央空调",
          ia: 0,
          ib: 0.02,
          ic: 0,
        },
        {
          field03: "室内空调",
          data_date: "2014-06-22 08:00:00",
          pz: (Math.random() * 1000).toFixed(1),
        },
        {
          field03: "电磁炉",
          data_date: "2014-06-22 08:00:00",
        },
        {
          field03: "微波炉",
          data_date: "2014-06-22 08:00:00",
        },
        {
          field03: "洗衣机",
          data_date: "2014-06-22 08:00:00",
        },
        {
          qz: -0.0009,
          pz: 0.0032,
          data_date: "2014-06-22 09:00:00",
          ua: 231.5,
          ub: 232.1,
          uc: 232.3,
          qa: -0.0005,
          pa: 0.0006,
          qb: 0.0003,
          pb: 0.0018,
          qc: 0,
          pc: 0.0007,
          field03: "中央空调",
          ia: 0,
          ib: 0.01,
          ic: 0,
        },
        {
          field03: "室内空调",
          data_date: "2014-06-22 09:00:00",
          pz: (Math.random() * 1000).toFixed(1),
        },
        {
          field03: "电磁炉",
          data_date: "2014-06-22 09:00:00",
        },
        {
          field03: "微波炉",
          data_date: "2014-06-22 09:00:00",
        },
        {
          field03: "洗衣机",
          data_date: "2014-06-22 09:00:00",
        },
        {
          qz: 0,
          pz: 0.0063,
          data_date: "2014-06-22 10:00:00",
          ua: 229.8,
          ub: 230.7,
          uc: 230.7,
          qa: -0.0005,
          pa: 0.0006,
          qb: 0,
          pb: 0.0049,
          qc: 0,
          pc: 0.0007,
          field03: "中央空调",
          ia: 0,
          ib: 0.03,
          ic: 0,
        },
        {
          field03: "室内空调",
          data_date: "2014-06-22 10:00:00",
          pz: (Math.random() * 1000).toFixed(1),
        },
        {
          field03: "电磁炉",
          data_date: "2014-06-22 10:00:00",
        },
        {
          field03: "微波炉",
          data_date: "2014-06-22 10:00:00",
        },
        {
          field03: "洗衣机",
          data_date: "2014-06-22 10:00:00",
        },
        {
          qz: 0,
          pz: 0.0064,
          data_date: "2014-06-22 11:00:00",
          ua: 230.2,
          ub: 231,
          uc: 231,
          qa: -0.0005,
          pa: 0.0006,
          qb: 0,
          pb: 0.0049,
          qc: 0,
          pc: 0.0007,
          field03: "中央空调",
          ia: 0,
          ib: 0.03,
          ic: 0,
        },
        {
          field03: "室内空调",
          data_date: "2014-06-22 11:00:00",
        },
        {
          field03: "电磁炉",
          data_date: "2014-06-22 11:00:00",
        },
        {
          field03: "微波炉",
          data_date: "2014-06-22 11:00:00",
        },
        {
          field03: "洗衣机",
          data_date: "2014-06-22 11:00:00",
        },
        {
          qz: 0,
          pz: 0.0069,
          data_date: "2014-06-22 12:00:00",
          ua: 233.5,
          ub: 234.5,
          uc: 234.5,
          qa: -0.0006,
          pa: 0.0006,
          qb: 0,
          pb: 0.0054,
          qc: 0,
          pc: 0.0008,
          field03: "中央空调",
          ia: 0,
          ib: 0.03,
          ic: 0,
        },
        {
          field03: "室内空调",
          data_date: "2014-06-22 12:00:00",
        },
        {
          field03: "电磁炉",
          data_date: "2014-06-22 12:00:00",
        },
        {
          field03: "微波炉",
          data_date: "2014-06-22 12:00:00",
        },
        {
          field03: "洗衣机",
          data_date: "2014-06-22 12:00:00",
        },
        {
          qz: 0,
          pz: 0.0066,
          data_date: "2014-06-22 13:00:00",
          ua: 232.4,
          ub: 233.3,
          uc: 233.4,
          qa: -0.0006,
          pa: 0.0006,
          qb: 0,
          pb: 0.0051,
          qc: 0,
          pc: 0.0007,
          field03: "中央空调",
          ia: 0,
          ib: 0.03,
          ic: 0,
        },
        {
          field03: "室内空调",
          data_date: "2014-06-22 13:00:00",
        },
        {
          field03: "电磁炉",
          data_date: "2014-06-22 13:00:00",
        },
        {
          field03: "微波炉",
          data_date: "2014-06-22 13:00:00",
        },
        {
          field03: "洗衣机",
          data_date: "2014-06-22 13:00:00",
        },
        {
          qz: -0.001,
          pz: 0.0033,
          data_date: "2014-06-22 14:00:00",
          ua: 231.2,
          ub: 232.1,
          uc: 232.3,
          qa: -0.0006,
          pa: 0.0006,
          qb: -0.0004,
          pb: 0.0018,
          qc: 0,
          pc: 0.0007,
          field03: "中央空调",
          ia: 0,
          ib: 0.01,
          ic: 0,
        },
        {
          field03: "室内空调",
          data_date: "2014-06-22 14:00:00",
        },
        {
          field03: "电磁炉",
          data_date: "2014-06-22 14:00:00",
        },
        {
          field03: "微波炉",
          data_date: "2014-06-22 14:00:00",
        },
        {
          field03: "洗衣机",
          data_date: "2014-06-22 14:00:00",
        },
        {
          qz: 0,
          pz: 0.0064,
          data_date: "2014-06-22 15:00:00",
          ua: 232.4,
          ub: 233.3,
          uc: 233.5,
          qa: -0.0006,
          pa: 0.0006,
          qb: 0,
          pb: 0.0049,
          qc: 0,
          pc: 0.0007,
          field03: "中央空调",
          ia: 0,
          ib: 0.03,
          ic: 0,
        },
        {
          field03: "室内空调",
          data_date: "2014-06-22 15:00:00",
        },
        {
          field03: "电磁炉",
          data_date: "2014-06-22 15:00:00",
        },
        {
          field03: "微波炉",
          data_date: "2014-06-22 15:00:00",
        },
        {
          field03: "洗衣机",
          data_date: "2014-06-22 15:00:00",
        },
        {
          qz: 0,
          pz: 0.0063,
          data_date: "2014-06-22 16:00:00",
          ua: 233.3,
          ub: 234.1,
          uc: 234.1,
          qa: -0.0006,
          pa: 0.0006,
          qb: 0,
          pb: 0.0048,
          qc: 0,
          pc: 0.0007,
          field03: "中央空调",
          ia: 0,
          ib: 0.02,
          ic: 0,
        },
        {
          field03: "室内空调",
          data_date: "2014-06-22 16:00:00",
        },
        {
          field03: "电磁炉",
          data_date: "2014-06-22 16:00:00",
        },
        {
          field03: "微波炉",
          data_date: "2014-06-22 16:00:00",
        },
        {
          field03: "洗衣机",
          data_date: "2014-06-22 16:00:00",
        },
        {
          qz: 0,
          pz: 0.0063,
          data_date: "2014-06-22 17:00:00",
          ua: 233.1,
          ub: 233.8,
          uc: 234,
          qa: -0.0005,
          pa: 0.0006,
          qb: 0,
          pb: 0.0048,
          qc: 0,
          pc: 0.0007,
          field03: "中央空调",
          ia: 0,
          ib: 0.03,
          ic: 0,
        },
        {
          field03: "室内空调",
          data_date: "2014-06-22 17:00:00",
        },
        {
          field03: "电磁炉",
          data_date: "2014-06-22 17:00:00",
        },
        {
          field03: "微波炉",
          data_date: "2014-06-22 17:00:00",
        },
        {
          field03: "洗衣机",
          data_date: "2014-06-22 17:00:00",
        },
        {
          qz: 0,
          pz: 0.0074,
          data_date: "2014-06-22 18:00:00",
          ua: 235.3,
          ub: 236,
          uc: 236.2,
          qa: -0.0006,
          pa: 0.0006,
          qb: 0,
          pb: 0.0059,
          qc: 0,
          pc: 0.0008,
          field03: "中央空调",
          ia: 0,
          ib: 0.03,
          ic: 0,
        },
        {
          field03: "室内空调",
          data_date: "2014-06-22 18:00:00",
        },
        {
          field03: "电磁炉",
          data_date: "2014-06-22 18:00:00",
        },
        {
          field03: "微波炉",
          data_date: "2014-06-22 18:00:00",
        },
        {
          field03: "洗衣机",
          data_date: "2014-06-22 18:00:00",
        },
        {
          qz: 0.001,
          pz: 0.0224,
          data_date: "2014-06-22 19:00:00",
          ua: 235.8,
          ub: 236.5,
          uc: 236.7,
          qa: -0.0006,
          pa: 0.0006,
          qb: -0.0004,
          pb: 0.0209,
          qc: 0,
          pc: 0.0008,
          field03: "中央空调",
          ia: 0,
          ib: 0.09,
          ic: 0,
        },
        {
          field03: "室内空调",
          data_date: "2014-06-22 19:00:00",
        },
        {
          field03: "电磁炉",
          data_date: "2014-06-22 19:00:00",
        },
        {
          field03: "微波炉",
          data_date: "2014-06-22 19:00:00",
        },
        {
          field03: "洗衣机",
          data_date: "2014-06-22 19:00:00",
        },
        {
          qz: -0.001,
          pz: 0.0058,
          data_date: "2014-06-22 20:00:00",
          ua: 233.4,
          ub: 234,
          uc: 234.1,
          qa: -0.0006,
          pa: 0.0006,
          qb: -0.0004,
          pb: 0.0043,
          qc: 0,
          pc: 0.0007,
          field03: "中央空调",
          ia: 0,
          ib: 0.03,
          ic: 0,
        },
        {
          field03: "室内空调",
          data_date: "2014-06-22 20:00:00",
        },
        {
          field03: "电磁炉",
          data_date: "2014-06-22 20:00:00",
        },
        {
          field03: "微波炉",
          data_date: "2014-06-22 20:00:00",
        },
        {
          field03: "洗衣机",
          data_date: "2014-06-22 20:00:00",
        },
        {
          qz: -0.0022,
          pz: 0.0137,
          data_date: "2014-06-22 21:00:00",
          ua: 232.6,
          ub: 233.3,
          uc: 233.4,
          qa: -0.0005,
          pa: 0.0006,
          qb: -0.0017,
          pb: 0.0122,
          qc: 0,
          pc: 0.0007,
          field03: "中央空调",
          ia: 0,
          ib: 0.06,
          ic: 0,
        },
        {
          field03: "室内空调",
          data_date: "2014-06-22 21:00:00",
        },
        {
          field03: "电磁炉",
          data_date: "2014-06-22 21:00:00",
        },
        {
          field03: "微波炉",
          data_date: "2014-06-22 21:00:00",
        },
        {
          field03: "洗衣机",
          data_date: "2014-06-22 21:00:00",
        },
        {
          qz: -0.002,
          pz: 0.0069,
          data_date: "2014-06-22 22:00:00",
          ua: 234,
          ub: 234.8,
          uc: 235.1,
          qa: -0.0006,
          pa: 0.0006,
          qb: -0.0014,
          pb: 0.0054,
          qc: 0,
          pc: 0.0008,
          field03: "中央空调",
          ia: 0,
          ib: 0.03,
          ic: 0,
        },
        {
          field03: "室内空调",
          data_date: "2014-06-22 22:00:00",
        },
        {
          field03: "电磁炉",
          data_date: "2014-06-22 22:00:00",
        },
        {
          field03: "微波炉",
          data_date: "2014-06-22 22:00:00",
        },
        {
          field03: "洗衣机",
          data_date: "2014-06-22 22:00:00",
        },
        {
          qz: -0.002,
          pz: 0.0066,
          data_date: "2014-06-22 23:00:00",
          ua: 233,
          ub: 233.8,
          uc: 233.9,
          qa: -0.0006,
          pa: 0.0006,
          qb: -0.0014,
          pb: 0.0051,
          qc: 0,
          pc: 0.0008,
          field03: "中央空调",
          ia: 0,
          ib: 0.02,
          ic: 0,
        },
        {
          field03: "室内空调",
          data_date: "2014-06-22 23:00:00",
        },
        {
          field03: "电磁炉",
          data_date: "2014-06-22 23:00:00",
        },
        {
          field03: "微波炉",
          data_date: "2014-06-22 23:00:00",
        },
        {
          field03: "洗衣机",
          data_date: "2014-06-22 23:00:00",
        },
      ],
    });
  });
}

/**
 * 获取家用负荷-电量分解（月）数据
 * @param month 时间：“YYYY-MM”
 * @returns 家用负荷-电量分解（月）数据
 */
export function getDlfjMonth(month: string) {
  //   return $axios({
  //     method: "get",
  //     url: `/api/bigScreen/dlfjMonth?date=${month}`,
  //   });
  return new Promise<any>((resolve, reject) => {
    resolve({
      msg: "操作成功",
      code: 0,
      data: [
        {
          field01: "室内空调",
          num: Number((Math.random() * 100).toFixed(2)),
          // num:100,
        },
        {
          field01: "电视机",
          num: Number((Math.random() * 100).toFixed(2)),
          // num:100,
        },
        {
          field01: "微波炉",
          num: Number((Math.random() * 100).toFixed(2)),
          // num:100,
        },
        {
          field01: "洗衣机",
          num: Number((Math.random() * 100).toFixed(2)),
          // num:100,
        }, {
          field01: "冰箱",
          num: Number((Math.random() * 100).toFixed(2)),
          // num:100,
        }, {
          field01: "电磁炉",
          num: Number((Math.random() * 100).toFixed(2)),
          // num:100,
        },
      ],
    });
  });
}

/**
 * 获取家用负荷-电量分解（日）数据
 * @param date 时间：“YYYY-MM-dd”
 * @returns 家用负荷-电量分解（日）数据
 */
export function getDlfj(date: string) {
  //   return $axios({
  //     method: "get",
  //     url: `/api/bigScreen/dlfj?date=${date}`,
  //   });
  return new Promise<any>((resolve, reject) => {
    resolve({
      msg: "操作成功",
      code: 0,
      data: [
        {
          "id": 4,
          "name": "家用负荷",
          "num": Number((Math.random() * 100).toFixed(2)),
          "tjDate": "20140620",
          "field01": "室内空调",
          "field02": null,
          "field03": null
        },
        {
          "id": 5,
          "name": "家用负荷",
          "num": Number((Math.random() * 100).toFixed(2)),
          "tjDate": "20140620",
          "field01": "冰箱",
          "field02": null,
          "field03": null
        },
        {
          "id": 6,
          "name": "家用负荷",
          "num": Number((Math.random() * 100).toFixed(2)),
          "tjDate": "20140620",
          "field01": "洗衣机",
          "field02": null,
          "field03": null
        },
      ],
    });
  });
}

/**
 * 获取家用负荷事件信息数据
 * @returns 家用负荷事件信息数据
 */
export function getDayEventInfo() {
  // return $axios({
  //   method: "get",
  //   url: `/api/bigScreen/dayEventInfo`,
  // });
  return new Promise<any>((resolve, reject) => {
    resolve({
      "msg": "操作成功",
      "code": 0,
      "data": [
        { useDevice: '冰箱、空调、洗衣机', useDate: '2023-11-11 14:00' },
        { useDevice: '冰箱、空调', useDate: `2023-11-11 14:${(Math.random() * 50 + 10).toFixed()}` },
        { useDevice: '冰箱、空调', useDate: `2023-11-11 14:${(Math.random() * 50 + 10).toFixed()}` },
        { useDevice: '冰箱、空调', useDate: `2023-11-11 14:${(Math.random() * 50 + 10).toFixed()}` },
        { useDevice: '冰箱、空调', useDate: `2023-11-11 14:${(Math.random() * 50 + 10).toFixed()}` },
        { useDevice: '冰箱、空调', useDate: `2023-11-11 14:${(Math.random() * 50 + 10).toFixed()}` },
        { useDevice: '冰箱、空调', useDate: '2023-11-11 14:00' },
      ]
    })
  })
}

/**
 * 获取温度曲线接口数据   type  01:中央空调，02室内空调
 * @returns 温度曲线接口数据 
 */
export function getTemperatureInfo() {
  // return $axios({
  //   method: "get",
  //   url: `/api/bigScreen/temperatureInfo`,
  // });
  return new Promise<any>((resolve, reject) => {
    // const data: any = [
    //   { "dataDate": "2024-05-30 00:00:00" },
    //   { "dataDate": "2024-05-30 00:15:00" },
    //   { "dataDate": "2024-05-30 00:30:00" },
    //   { "dataDate": "2024-05-30 00:45:00" },
    //   { "dataDate": "2024-05-30 01:00:00" },
    //   { "dataDate": "2024-05-30 01:15:00" },
    //   { "dataDate": "2024-05-30 01:30:00" },
    //   { "dataDate": "2024-05-30 01:45:00" },
    //   { "dataDate": "2024-05-30 02:00:00" },
    //   { "dataDate": "2024-05-30 02:15:00" },
    //   { "dataDate": "2024-05-30 02:30:00" },
    //   { "dataDate": "2024-05-30 02:45:00" },
    //   { "dataDate": "2024-05-30 03:00:00" },
    //   { "dataDate": "2024-05-30 03:15:00" },
    //   { "dataDate": "2024-05-30 03:30:00" },
    //   { "dataDate": "2024-05-30 03:45:00" },
    //   { "dataDate": "2024-05-30 04:00:00" },
    //   { "dataDate": "2024-05-30 04:15:00" },
    //   { "dataDate": "2024-05-30 04:30:00" },
    //   { "dataDate": "2024-05-30 04:45:00" },
    //   { "dataDate": "2024-05-30 05:00:00" },
    //   { "dataDate": "2024-05-30 05:15:00" },
    //   { "dataDate": "2024-05-30 05:30:00" },
    //   { "dataDate": "2024-05-30 05:45:00" },
    //   { "dataDate": "2024-05-30 06:00:00" },
    //   { "dataDate": "2024-05-30 06:15:00" },
    //   { "dataDate": "2024-05-30 06:30:00" },
    //   { "dataDate": "2024-05-30 06:45:00" },
    //   { "dataDate": "2024-05-30 07:00:00" },
    //   { "dataDate": "2024-05-30 07:15:00" },
    //   { "dataDate": "2024-05-30 07:30:00" },
    //   { "dataDate": "2024-05-30 07:45:00" },
    //   { "dataDate": "2024-05-30 08:00:00" },
    //   { "dataDate": "2024-05-30 08:15:00" },
    //   { "dataDate": "2024-05-30 08:30:00" },
    //   { "dataDate": "2024-05-30 08:45:00" },
    //   { "dataDate": "2024-05-30 09:00:00" },
    //   { "dataDate": "2024-05-30 09:15:00" },
    //   { "dataDate": "2024-05-30 09:30:00" },
    //   { "dataDate": "2024-05-30 09:45:00" },
    //   { "dataDate": "2024-05-30 10:00:00" },
    //   { "dataDate": "2024-05-30 10:15:00" },
    //   { "dataDate": "2024-05-30 10:30:00" },
    //   { "dataDate": "2024-05-30 10:45:00" },
    //   { "dataDate": "2024-05-30 11:00:00" },
    //   { "dataDate": "2024-05-30 11:15:00" },
    //   { "dataDate": "2024-05-30 11:30:00" },
    //   { "dataDate": "2024-05-30 11:45:00" },
    //   { "dataDate": "2024-05-30 12:00:00" },
    //   { "dataDate": "2024-05-30 12:15:00" },
    //   { "dataDate": "2024-05-30 12:30:00" },
    //   { "dataDate": "2024-05-30 12:45:00" },
    //   { "dataDate": "2024-05-30 13:00:00" },
    //   { "dataDate": "2024-05-30 13:15:00" },
    //   { "dataDate": "2024-05-30 13:30:00" },
    //   { "dataDate": "2024-05-30 13:45:00" },
    //   { "dataDate": "2024-05-30 14:00:00" },
    //   { "dataDate": "2024-05-30 14:15:00" },
    //   { "dataDate": "2024-05-30 14:30:00" },
    //   { "dataDate": "2024-05-30 14:45:00" },
    //   { "dataDate": "2024-05-30 15:00:00" },
    //   { "dataDate": "2024-05-30 15:15:00" },
    //   { "dataDate": "2024-05-30 15:30:00" },
    //   { "dataDate": "2024-05-30 15:45:00" },
    //   { "dataDate": "2024-05-30 16:00:00" },
    //   { "dataDate": "2024-05-30 16:15:00" },
    //   { "dataDate": "2024-05-30 16:30:00" },
    //   { "dataDate": "2024-05-30 16:45:00" },
    //   { "dataDate": "2024-05-30 17:00:00" },
    //   { "dataDate": "2024-05-30 17:15:00" },
    //   { "dataDate": "2024-05-30 17:30:00" },
    //   { "dataDate": "2024-05-30 17:45:00" },
    //   { "dataDate": "2024-05-30 18:00:00" },
    //   { "dataDate": "2024-05-30 18:15:00" },
    //   { "dataDate": "2024-05-30 18:30:00" },
    //   { "dataDate": "2024-05-30 18:45:00" },
    //   { "dataDate": "2024-05-30 19:00:00" },
    //   { "dataDate": "2024-05-30 19:15:00" },
    //   { "dataDate": "2024-05-30 19:30:00" },
    //   { "dataDate": "2024-05-30 19:45:00" },
    //   { "dataDate": "2024-05-30 20:00:00" },
    //   { "dataDate": "2024-05-30 20:15:00" },
    //   { "dataDate": "2024-05-30 20:30:00" },
    //   { "dataDate": "2024-05-30 20:45:00" },
    //   { "dataDate": "2024-05-30 21:00:00" },
    //   { "dataDate": "2024-05-30 21:15:00" },
    //   { "dataDate": "2024-05-30 21:30:00" },
    //   { "dataDate": "2024-05-30 21:45:00" },
    //   { "dataDate": "2024-05-30 22:00:00" },
    //   { "dataDate": "2024-05-30 22:15:00" },
    //   { "dataDate": "2024-05-30 22:30:00" },
    //   { "dataDate": "2024-05-30 22:45:00" },
    //   { "dataDate": "2024-05-30 23:00:00" },
    //   { "dataDate": "2024-05-30 23:15:00" },
    //   { "dataDate": "2024-05-30 23:30:00" },
    //   { "dataDate": "2024-05-30 23:45:00" }
    // ];
    const data: any = [
      { "dataDate": "2024-05-30 00:00:00" },
      { "dataDate": "2024-05-30 01:00:00" },
      { "dataDate": "2024-05-30 02:00:00" },
      { "dataDate": "2024-05-30 03:00:00" },
      { "dataDate": "2024-05-30 04:00:00" },
      { "dataDate": "2024-05-30 05:00:00" },
      { "dataDate": "2024-05-30 06:00:00" },
      { "dataDate": "2024-05-30 07:00:00" },
      { "dataDate": "2024-05-30 08:00:00" },
      { "dataDate": "2024-05-30 09:00:00" },
      { "dataDate": "2024-05-30 10:00:00" },
      { "dataDate": "2024-05-30 11:00:00" },
      { "dataDate": "2024-05-30 12:00:00" },
      { "dataDate": "2024-05-30 13:00:00" },
      { "dataDate": "2024-05-30 14:00:00" },
      { "dataDate": "2024-05-30 15:00:00" },
      { "dataDate": "2024-05-30 16:00:00" },
      { "dataDate": "2024-05-30 17:00:00" },
      { "dataDate": "2024-05-30 18:00:00" },
      { "dataDate": "2024-05-30 19:00:00" },
      { "dataDate": "2024-05-30 20:00:00" },
      { "dataDate": "2024-05-30 21:00:00" },
      { "dataDate": "2024-05-30 22:00:00" },
      { "dataDate": "2024-05-30 23:00:00" },
    ];
    for (let i = 0; i < data.length; i++) {
      data[i].id = i + 1;
      data[i].type = '02';
    }
    for (let i = 0; i < 11; i++) {
      Object.assign(data[i], {
        snTemperature: (Math.random() * 40).toFixed(),
        swTemperature: (Math.random() * 40).toFixed(),
        field01: null,
        field02: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null,
      })
    }
    resolve({
      "msg": "操作成功",
      "code": 0,
      "data": data,
      // [
      //   {
      //     "createBy": null,
      //     "createTime": null,
      //     "updateBy": null,
      //     "updateTime": null,
      //     "remark": null,
      //     "id": 1,
      //     "dataDate": "2024-05-30 12:50:30",
      //     "snTemperature": "25",
      //     "swTemperature": "30",
      //     "type": "01",
      //     "field01": null,
      //     "field02": null
      //   },
      //   {
      //     "createBy": null,
      //     "createTime": null,
      //     "updateBy": null,
      //     "updateTime": null,
      //     "remark": null,
      //     "id": 2,
      //     "dataDate": "2024-05-30",
      //     "snTemperature": "21",
      //     "swTemperature": "32",
      //     "type": "01",
      //     "field01": null,
      //     "field02": null
      //   },
      //   {
      //     "createBy": null,
      //     "createTime": null,
      //     "updateBy": null,
      //     "updateTime": null,
      //     "remark": null,
      //     "id": 3,
      //     "dataDate": "2024-05-30",
      //     "snTemperature": "22",
      //     "swTemperature": "32",
      //     "type": "02",
      //     "field01": null,
      //     "field02": null
      //   },
      //   {
      //     "createBy": null,
      //     "createTime": null,
      //     "updateBy": null,
      //     "updateTime": null,
      //     "remark": null,
      //     "id": 4,
      //     "dataDate": "2024-05-30",
      //     "snTemperature": "22",
      //     "swTemperature": "30",
      //     "type": "02",
      //     "field01": null,
      //     "field02": null
      //   }
      // ]
    })
  })
}
