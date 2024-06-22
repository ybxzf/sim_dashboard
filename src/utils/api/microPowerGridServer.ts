import $axios from "@/utils/interceptor";
import { BASE_URL } from "@/assets/config";

/**
 * 获取昨日电量统计数据
 * @returns 昨日电量统计数据
 */
export function getYesterdayElectricity() {
  return $axios({
    method: "get",
    url: BASE_URL + "/api/bigScreen/yesterdayElectricity",
  });
  // return new Promise<any>((resolve, reject) => {
  //   resolve({
  //     msg: "操作成功",
  //     code: 0,
  //     data: [
  //       {
  //         quantity: Number((Math.random() * 10000).toFixed(1)),
  //         typeCode: "光伏",
  //       },
  //       {
  //         quantity: Number((Math.random() * 10000).toFixed(1)),
  //         typeCode: "充电桩",
  //       },
  //       {
  //         quantity: Number((Math.random() * 10000).toFixed(1)),
  //         typeCode: "储能放",
  //       },
  //       {
  //         quantity: Number((Math.random() * 10000).toFixed(1)),
  //         typeCode: "储能充",
  //       },
  //     ],
  //   });
  // });
}

/**
 * 判断场景切换接口是否成功
 * @param type 场景
 * @returns 场景切换结果
 */
export function getSelectScene(type: string) {
  return $axios({
    method: "get",
    url: BASE_URL + `/api/bigScreen/selectScene?type=${type}`,
  });
  // return new Promise<any>((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve({
  //       msg: "操作成功",
  //       code: 0,
  //       data: [],
  //     });
  //   }, 1000);
  // });
}

/**
 * 获取光伏发电情况(日)数据
 * @returns 光伏发电情况(日)数据
 */
export function getSsPhotovoltaicPower() {
  return $axios({
    method: "get",
    url: BASE_URL + "/api/bigScreen/ssPhotovoltaicPower",
  });
  // return new Promise<any>((resolve, reject) => {
  //   resolve({
  //     msg: "操作成功",
  //     code: 0,
  //     data: [
  //       {
  //         createBy: null,
  //         createTime: null,
  //         updateBy: null,
  //         updateTime: null,
  //         remark: null,
  //         id: null,
  //         cjMpId: null,
  //         dataDate: "2014-06-20 01:00:00",
  //         dataSource: null,
  //         writeDate: null,
  //         zxygz: Number((Math.random() * 10).toFixed(1)),
  //         fxygz: null,
  //         zxwgz: null,
  //         fxwgz: null,
  //         field01: null,
  //         field03: null,
  //         field02: null,
  //       },
  //       {
  //         createBy: null,
  //         createTime: null,
  //         updateBy: null,
  //         updateTime: null,
  //         remark: null,
  //         id: null,
  //         cjMpId: null,
  //         dataDate: "2014-06-20 02:00:00",
  //         dataSource: null,
  //         writeDate: null,
  //         zxygz: 4.8,
  //         fxygz: null,
  //         zxwgz: null,
  //         fxwgz: null,
  //         field01: null,
  //         field03: null,
  //         field02: null,
  //       },
  //       {
  //         createBy: null,
  //         createTime: null,
  //         updateBy: null,
  //         updateTime: null,
  //         remark: null,
  //         id: null,
  //         cjMpId: null,
  //         dataDate: "2014-06-20 03:00:00",
  //         dataSource: null,
  //         writeDate: null,
  //         zxygz: 6,
  //         fxygz: null,
  //         zxwgz: null,
  //         fxwgz: null,
  //         field01: null,
  //         field03: null,
  //         field02: null,
  //       },
  //       {
  //         createBy: null,
  //         createTime: null,
  //         updateBy: null,
  //         updateTime: null,
  //         remark: null,
  //         id: null,
  //         cjMpId: null,
  //         dataDate: "2014-06-20 04:00:00",
  //         dataSource: null,
  //         writeDate: null,
  //         zxygz: 6,
  //         fxygz: null,
  //         zxwgz: null,
  //         fxwgz: null,
  //         field01: null,
  //         field03: null,
  //         field02: null,
  //       },
  //       {
  //         createBy: null,
  //         createTime: null,
  //         updateBy: null,
  //         updateTime: null,
  //         remark: null,
  //         id: null,
  //         cjMpId: null,
  //         dataDate: "2014-06-20 05:00:00",
  //         dataSource: null,
  //         writeDate: null,
  //         zxygz: 6,
  //         fxygz: null,
  //         zxwgz: null,
  //         fxwgz: null,
  //         field01: null,
  //         field03: null,
  //         field02: null,
  //       },
  //       {
  //         createBy: null,
  //         createTime: null,
  //         updateBy: null,
  //         updateTime: null,
  //         remark: null,
  //         id: null,
  //         cjMpId: null,
  //         dataDate: "2014-06-20 06:00:00",
  //         dataSource: null,
  //         writeDate: null,
  //         zxygz: 6,
  //         fxygz: null,
  //         zxwgz: null,
  //         fxwgz: null,
  //         field01: null,
  //         field03: null,
  //         field02: null,
  //       },
  //       {
  //         createBy: null,
  //         createTime: null,
  //         updateBy: null,
  //         updateTime: null,
  //         remark: null,
  //         id: null,
  //         cjMpId: null,
  //         dataDate: "2014-06-20 07:00:00",
  //         dataSource: null,
  //         writeDate: null,
  //         zxygz: 6,
  //         fxygz: null,
  //         zxwgz: null,
  //         fxwgz: null,
  //         field01: null,
  //         field03: null,
  //         field02: null,
  //       },
  //       {
  //         createBy: null,
  //         createTime: null,
  //         updateBy: null,
  //         updateTime: null,
  //         remark: null,
  //         id: null,
  //         cjMpId: null,
  //         dataDate: "2014-06-20 08:00:00",
  //         dataSource: null,
  //         writeDate: null,
  //         zxygz: 4.8,
  //         fxygz: null,
  //         zxwgz: null,
  //         fxwgz: null,
  //         field01: null,
  //         field03: null,
  //         field02: null,
  //       },
  //       {
  //         createBy: null,
  //         createTime: null,
  //         updateBy: null,
  //         updateTime: null,
  //         remark: null,
  //         id: null,
  //         cjMpId: null,
  //         dataDate: "2014-06-20 09:00:00",
  //         dataSource: null,
  //         writeDate: null,
  //         zxygz: 4.8,
  //         fxygz: null,
  //         zxwgz: null,
  //         fxwgz: null,
  //         field01: null,
  //         field03: null,
  //         field02: null,
  //       },
  //       {
  //         createBy: null,
  //         createTime: null,
  //         updateBy: null,
  //         updateTime: null,
  //         remark: null,
  //         id: null,
  //         cjMpId: null,
  //         dataDate: "2014-06-20 10:00:00",
  //         dataSource: null,
  //         writeDate: null,
  //         zxygz: 6,
  //         fxygz: null,
  //         zxwgz: null,
  //         fxwgz: null,
  //         field01: null,
  //         field03: null,
  //         field02: null,
  //       },
  //       {
  //         createBy: null,
  //         createTime: null,
  //         updateBy: null,
  //         updateTime: null,
  //         remark: null,
  //         id: null,
  //         cjMpId: null,
  //         dataDate: "2014-06-20 11:00:00",
  //         dataSource: null,
  //         writeDate: null,
  //         zxygz: 6,
  //         fxygz: null,
  //         zxwgz: null,
  //         fxwgz: null,
  //         field01: null,
  //         field03: null,
  //         field02: null,
  //       },
  //       {
  //         createBy: null,
  //         createTime: null,
  //         updateBy: null,
  //         updateTime: null,
  //         remark: null,
  //         id: null,
  //         cjMpId: null,
  //         dataDate: "2014-06-20 12:00:00",
  //         dataSource: null,
  //         writeDate: null,
  //         zxygz: 4.8,
  //         fxygz: null,
  //         zxwgz: null,
  //         fxwgz: null,
  //         field01: null,
  //         field03: null,
  //         field02: null,
  //       },
  //       {
  //         createBy: null,
  //         createTime: null,
  //         updateBy: null,
  //         updateTime: null,
  //         remark: null,
  //         id: null,
  //         cjMpId: null,
  //         dataDate: "2014-06-20 13:00:00",
  //         dataSource: null,
  //         writeDate: null,
  //         zxygz: 4.8,
  //         fxygz: null,
  //         zxwgz: null,
  //         fxwgz: null,
  //         field01: null,
  //         field03: null,
  //         field02: null,
  //       },
  //       {
  //         createBy: null,
  //         createTime: null,
  //         updateBy: null,
  //         updateTime: null,
  //         remark: null,
  //         id: null,
  //         cjMpId: null,
  //         dataDate: "2014-06-20 14:00:00",
  //         dataSource: null,
  //         writeDate: null,
  //         zxygz: 4.8,
  //         fxygz: null,
  //         zxwgz: null,
  //         fxwgz: null,
  //         field01: null,
  //         field03: null,
  //         field02: null,
  //       },
  //       {
  //         createBy: null,
  //         createTime: null,
  //         updateBy: null,
  //         updateTime: null,
  //         remark: null,
  //         id: null,
  //         cjMpId: null,
  //         dataDate: "2014-06-20 15:00:00",
  //         dataSource: null,
  //         writeDate: null,
  //         zxygz: 6,
  //         fxygz: null,
  //         zxwgz: null,
  //         fxwgz: null,
  //         field01: null,
  //         field03: null,
  //         field02: null,
  //       },
  //       {
  //         createBy: null,
  //         createTime: null,
  //         updateBy: null,
  //         updateTime: null,
  //         remark: null,
  //         id: null,
  //         cjMpId: null,
  //         dataDate: "2014-06-20 16:00:00",
  //         dataSource: null,
  //         writeDate: null,
  //         zxygz: 4.8,
  //         fxygz: null,
  //         zxwgz: null,
  //         fxwgz: null,
  //         field01: null,
  //         field03: null,
  //         field02: null,
  //       },
  //       {
  //         createBy: null,
  //         createTime: null,
  //         updateBy: null,
  //         updateTime: null,
  //         remark: null,
  //         id: null,
  //         cjMpId: null,
  //         dataDate: "2014-06-20 17:00:00",
  //         dataSource: null,
  //         writeDate: null,
  //         zxygz: 4.8,
  //         fxygz: null,
  //         zxwgz: null,
  //         fxwgz: null,
  //         field01: null,
  //         field03: null,
  //         field02: null,
  //       },
  //       {
  //         createBy: null,
  //         createTime: null,
  //         updateBy: null,
  //         updateTime: null,
  //         remark: null,
  //         id: null,
  //         cjMpId: null,
  //         dataDate: "2014-06-20 18:00:00",
  //         dataSource: null,
  //         writeDate: null,
  //         zxygz: 6,
  //         fxygz: null,
  //         zxwgz: null,
  //         fxwgz: null,
  //         field01: null,
  //         field03: null,
  //         field02: null,
  //       },
  //       {
  //         createBy: null,
  //         createTime: null,
  //         updateBy: null,
  //         updateTime: null,
  //         remark: null,
  //         id: null,
  //         cjMpId: null,
  //         dataDate: "2014-06-20 19:00:00",
  //         dataSource: null,
  //         writeDate: null,
  //         zxygz: 6,
  //         fxygz: null,
  //         zxwgz: null,
  //         fxwgz: null,
  //         field01: null,
  //         field03: null,
  //         field02: null,
  //       },
  //       {
  //         createBy: null,
  //         createTime: null,
  //         updateBy: null,
  //         updateTime: null,
  //         remark: null,
  //         id: null,
  //         cjMpId: null,
  //         dataDate: "2014-06-20 20:00:00",
  //         dataSource: null,
  //         writeDate: null,
  //         zxygz: 4.8,
  //         fxygz: null,
  //         zxwgz: null,
  //         fxwgz: null,
  //         field01: null,
  //         field03: null,
  //         field02: null,
  //       },
  //       {
  //         createBy: null,
  //         createTime: null,
  //         updateBy: null,
  //         updateTime: null,
  //         remark: null,
  //         id: null,
  //         cjMpId: null,
  //         dataDate: "2014-06-20 21:00:00",
  //         dataSource: null,
  //         writeDate: null,
  //         zxygz: 6,
  //         fxygz: null,
  //         zxwgz: null,
  //         fxwgz: null,
  //         field01: null,
  //         field03: null,
  //         field02: null,
  //       },
  //       {
  //         createBy: null,
  //         createTime: null,
  //         updateBy: null,
  //         updateTime: null,
  //         remark: null,
  //         id: null,
  //         cjMpId: null,
  //         dataDate: "2014-06-20 22:00:00",
  //         dataSource: null,
  //         writeDate: null,
  //         zxygz: 6,
  //         fxygz: null,
  //         zxwgz: null,
  //         fxwgz: null,
  //         field01: null,
  //         field03: null,
  //         field02: null,
  //       },
  //       {
  //         createBy: null,
  //         createTime: null,
  //         updateBy: null,
  //         updateTime: null,
  //         remark: null,
  //         id: null,
  //         cjMpId: null,
  //         dataDate: "2014-06-20 23:00:00",
  //         dataSource: null,
  //         writeDate: null,
  //         zxygz: 4.8,
  //         fxygz: null,
  //         zxwgz: null,
  //         fxwgz: null,
  //         field01: null,
  //         field03: null,
  //         field02: null,
  //       },
  //     ],
  //   });
  // });
}

/**
 * 获取光伏发电情况(周)数据
 * @returns 获取光伏发电情况(周)数据
 */
export function getSsPhotovoltaicPowerWeek() {
  return $axios({
    method: "get",
    url: BASE_URL + "/api/bigScreen/ssPhotovoltaicPowerWeek",
  });
  // return new Promise<any>((resolve, reject) => {
  //   resolve({
  //     msg: "操作成功",
  //     code: 0,
  //     data: [
  //       {
  //         id: "1",
  //         name: "光伏",
  //         num: "100.00",
  //         tjDate: "20240512",
  //       },
  //       {
  //         id: "2",
  //         name: "光伏",
  //         num: Number((Math.random() * 100).toFixed(1)),
  //         tjDate: "20240513",
  //       },
  //       {
  //         id: "3",
  //         name: "光伏",
  //         num: "100.00",
  //         tjDate: "20240514",
  //       },
  //       {
  //         id: "4",
  //         name: "光伏",
  //         num: "100.00",
  //         tjDate: "20240515",
  //       },
  //       {
  //         id: "5",
  //         name: "光伏",
  //         num: "100.00",
  //         tjDate: "20240516",
  //       },
  //       {
  //         id: "6",
  //         name: "光伏",
  //         num: "100.00",
  //         tjDate: "20240517",
  //       },
  //       {
  //         id: "7",
  //         name: "光伏",
  //         num: "100.00",
  //         tjDate: "20240518",
  //       },
  //     ],
  //   });
  // });
}

/**
 * 获取光伏使用情况数据
 * @returns 光伏使用情况数据
 */
export function getSelectDlsyqk() {
  return $axios({
    method: "get",
    url: BASE_URL + "/api/bigScreen/selectDlsyqk",
  });
  // return new Promise<any>((resolve, reject) => {
  //   resolve({
  //     msg: "操作成功",
  //     code: 0,
  //     data: [
  //       {
  //         // "num": 1001,
  //         num: Number((Math.random() * 1000).toFixed(1)),
  //         name: "光伏",
  //       },
  //       {
  //         // "num": 1001,
  //         num: Number((Math.random() * 1000).toFixed(1)),
  //         name: "储能充",
  //       },
  //       {
  //         // "num": 1001,
  //         num: Number((Math.random() * 1000).toFixed(1)),
  //         name: "储能放",
  //       },
  //       {
  //         // "num": 9,
  //         num: Number((Math.random() * 1000).toFixed(1)),
  //         name: "充电桩",
  //       },
  //       {
  //         // "num": 9,
  //         num: Number((Math.random() * 1000).toFixed(1)),
  //         name: "家用负荷总",
  //       },
  //       {
  //         num: 128.4,
  //         NAME: "中央空调", //中央空调这里的数据，放到首页下面的中央空调总电量这里。
  //       },
  //     ],
  //   });
  // });
}

/**
 * 获取光储充功率监测曲线数据，type_code：01 光伏 02 储能 03 充电桩 04 家用负荷
 * @returns 光储充功率监测曲线数据
 */
export function getSsGvTj() {
  return $axios({
    method: "get",
    url: BASE_URL + "/api/bigScreen/ssGvTj",
  });
  // return new Promise((resolve, reject) => {
  //   const data: any = {
  //     msg: "操作成功",
  //     code: 0,
  //     data: [
  //       {
  //         qz: 0,
  //         pz: Number((Math.random() * 100).toFixed(2)),
  //         data_date: "2014-06-25 00:00:00",
  //         ua: 234.6,
  //         ub: 0,
  //         uc: 0,
  //         qa: 0,
  //         pa: 0,
  //         qb: 0,
  //         pb: 0,
  //         qc: 0,
  //         pc: 0,
  //         ia: 0,
  //         ib: 0,
  //         ic: 0,
  //         type_code: "01",
  //       },
  //       {
  //         data_date: "2014-06-25 00:00:00",
  //         pz: Number((Math.random() * 100).toFixed(2)),
  //         type_code: "02",
  //       },
  //       {
  //         data_date: "2014-06-25 00:00:00",
  //         pz: Number((Math.random() * 100).toFixed(2)),
  //         type_code: "03",
  //       },
  //       {
  //         qz: 0,
  //         pz: Number((Math.random() * 100).toFixed(2)),
  //         data_date: "2014-06-25 01:00:00",
  //         ua: 235.9,
  //         ub: 0,
  //         uc: 0,
  //         qa: 0,
  //         pa: 0,
  //         qb: 0,
  //         pb: 0,
  //         qc: 0,
  //         pc: 0,
  //         ia: 0,
  //         ib: 0,
  //         ic: 0,
  //         type_code: "01",
  //       },
  //       {
  //         data_date: "2014-06-25 01:00:00",
  //         pz: Number((Math.random() * 100).toFixed(2)),
  //         type_code: "02",
  //       },
  //       {
  //         data_date: "2014-06-25 01:00:00",
  //         pz: Number((Math.random() * 100).toFixed(2)),
  //         type_code: "03",
  //       },
  //       {
  //         qz: 0,
  //         pz: Number((Math.random() * 100).toFixed(2)),
  //         data_date: "2014-06-25 02:00:00",
  //         ua: 236.3,
  //         ub: 0,
  //         uc: 0,
  //         qa: 0,
  //         pa: 0,
  //         qb: 0,
  //         pb: 0,
  //         qc: 0,
  //         pc: 0,
  //         ia: 0,
  //         ib: 0,
  //         ic: 0,
  //         type_code: "01",
  //       },
  //       {
  //         data_date: "2014-06-25 02:00:00",
  //         pz: Number((Math.random() * 100).toFixed(2)),
  //         type_code: "02",
  //       },
  //       {
  //         data_date: "2014-06-25 02:00:00",
  //         pz: Number((Math.random() * 100).toFixed(2)),
  //         type_code: "03",
  //       },
  //       {
  //         qz: 0,
  //         pz: 0,
  //         data_date: "2014-06-25 03:00:00",
  //         ua: 236,
  //         ub: 0,
  //         uc: 0,
  //         qa: 0,
  //         pa: 0,
  //         qb: 0,
  //         pb: 0,
  //         qc: 0,
  //         pc: 0,
  //         ia: 0,
  //         ib: 0,
  //         ic: 0,
  //         type_code: "01",
  //       },
  //       {
  //         data_date: "2014-06-25 03:00:00",
  //         type_code: "02",
  //       },
  //       {
  //         data_date: "2014-06-25 03:00:00",
  //         type_code: "03",
  //       },
  //       {
  //         qz: 0,
  //         pz: 0,
  //         data_date: "2014-06-25 04:00:00",
  //         ua: 235.8,
  //         ub: 0,
  //         uc: 0,
  //         qa: 0,
  //         pa: 0,
  //         qb: 0,
  //         pb: 0,
  //         qc: 0,
  //         pc: 0,
  //         ia: 0,
  //         ib: 0,
  //         ic: 0,
  //         type_code: "01",
  //       },
  //       {
  //         data_date: "2014-06-25 04:00:00",
  //         type_code: "02",
  //       },
  //       {
  //         data_date: "2014-06-25 04:00:00",
  //         type_code: "03",
  //       },
  //       {
  //         qz: 0,
  //         pz: 0,
  //         data_date: "2014-06-25 05:00:00",
  //         ua: 236.8,
  //         ub: 0,
  //         uc: 0,
  //         qa: 0,
  //         pa: 0,
  //         qb: 0,
  //         pb: 0,
  //         qc: 0,
  //         pc: 0,
  //         ia: 0,
  //         ib: 0,
  //         ic: 0,
  //         type_code: "01",
  //       },
  //       {
  //         data_date: "2014-06-25 05:00:00",
  //         type_code: "02",
  //       },
  //       {
  //         data_date: "2014-06-25 05:00:00",
  //         type_code: "03",
  //       },
  //       {
  //         qz: 0,
  //         pz: 0,
  //         data_date: "2014-06-25 06:00:00",
  //         ua: 235.7,
  //         ub: 0,
  //         uc: 0,
  //         qa: 0,
  //         pa: 0,
  //         qb: 0,
  //         pb: 0,
  //         qc: 0,
  //         pc: 0,
  //         ia: 0,
  //         ib: 0,
  //         ic: 0,
  //         type_code: "01",
  //       },
  //       {
  //         data_date: "2014-06-25 06:00:00",
  //         type_code: "02",
  //       },
  //       {
  //         data_date: "2014-06-25 06:00:00",
  //         type_code: "03",
  //       },
  //       {
  //         qz: 0,
  //         pz: 0,
  //         data_date: "2014-06-25 07:00:00",
  //         ua: 234.4,
  //         ub: 0,
  //         uc: 0,
  //         qa: 0,
  //         pa: 0,
  //         qb: 0,
  //         pb: 0,
  //         qc: 0,
  //         pc: 0,
  //         ia: 0,
  //         ib: 0,
  //         ic: 0,
  //         type_code: "01",
  //       },
  //       {
  //         data_date: "2014-06-25 07:00:00",
  //         type_code: "02",
  //       },
  //       {
  //         data_date: "2014-06-25 07:00:00",
  //         type_code: "03",
  //       },
  //       {
  //         qz: 0,
  //         pz: 0,
  //         data_date: "2014-06-25 08:00:00",
  //         ua: 226.7,
  //         ub: 0,
  //         uc: 0,
  //         qa: 0,
  //         pa: 0,
  //         qb: 0,
  //         pb: 0,
  //         qc: 0,
  //         pc: 0,
  //         ia: 0,
  //         ib: 0,
  //         ic: 0,
  //         type_code: "01",
  //       },
  //       {
  //         data_date: "2014-06-25 08:00:00",
  //         type_code: "02",
  //       },
  //       {
  //         data_date: "2014-06-25 08:00:00",
  //         type_code: "03",
  //       },
  //       {
  //         qz: 0,
  //         pz: 0,
  //         data_date: "2014-06-25 09:00:00",
  //         ua: 227.9,
  //         ub: 0,
  //         uc: 0,
  //         qa: 0,
  //         pa: 0,
  //         qb: 0,
  //         pb: 0,
  //         qc: 0,
  //         pc: 0,
  //         ia: 0,
  //         ib: 0,
  //         ic: 0,
  //         type_code: "01",
  //       },
  //       {
  //         data_date: "2014-06-25 09:00:00",
  //         type_code: "02",
  //       },
  //       {
  //         data_date: "2014-06-25 09:00:00",
  //         type_code: "03",
  //       },
  //       {
  //         qz: 0,
  //         pz: 0,
  //         data_date: "2014-06-25 10:00:00",
  //         ua: 225.1,
  //         ub: 0,
  //         uc: 0,
  //         qa: 0,
  //         pa: 0,
  //         qb: 0,
  //         pb: 0,
  //         qc: 0,
  //         pc: 0,
  //         ia: 0,
  //         ib: 0,
  //         ic: 0,
  //         type_code: "01",
  //       },
  //       {
  //         data_date: "2014-06-25 10:00:00",
  //         type_code: "02",
  //       },
  //       {
  //         data_date: "2014-06-25 10:00:00",
  //         type_code: "03",
  //       },
  //       {
  //         qz: 0,
  //         pz: Number((Math.random() * 100).toFixed(2)),
  //         data_date: "2014-06-25 11:00:00",
  //         ua: 228.4,
  //         ub: 0,
  //         uc: 0,
  //         qa: 0,
  //         pa: 0,
  //         qb: 0,
  //         pb: 0,
  //         qc: 0,
  //         pc: 0,
  //         ia: 0,
  //         ib: 0,
  //         ic: 0,
  //         type_code: "01",
  //       },
  //       {
  //         data_date: "2014-06-25 11:00:00",
  //         type_code: "02",
  //       },
  //       {
  //         data_date: "2014-06-25 11:00:00",
  //         type_code: "03",
  //       },
  //       {
  //         data_date: "2014-06-25 12:00:00",
  //         type_code: "01",
  //       },
  //       {
  //         data_date: "2014-06-25 12:00:00",
  //         type_code: "02",
  //       },
  //       {
  //         data_date: "2014-06-25 12:00:00",
  //         type_code: "03",
  //       },
  //       {
  //         data_date: "2014-06-25 13:00:00",
  //         type_code: "01",
  //       },
  //       {
  //         data_date: "2014-06-25 13:00:00",
  //         type_code: "02",
  //       },
  //       {
  //         data_date: "2014-06-25 13:00:00",
  //         type_code: "03",
  //       },
  //       {
  //         data_date: "2014-06-25 14:00:00",
  //         type_code: "01",
  //       },
  //       {
  //         data_date: "2014-06-25 14:00:00",
  //         type_code: "02",
  //       },
  //       {
  //         data_date: "2014-06-25 14:00:00",
  //         type_code: "03",
  //       },
  //       {
  //         data_date: "2014-06-25 15:00:00",
  //         type_code: "01",
  //       },
  //       {
  //         data_date: "2014-06-25 15:00:00",
  //         type_code: "02",
  //       },
  //       {
  //         data_date: "2014-06-25 15:00:00",
  //         type_code: "03",
  //       },
  //       {
  //         data_date: "2014-06-25 16:00:00",
  //         type_code: "01",
  //       },
  //       {
  //         data_date: "2014-06-25 16:00:00",
  //         type_code: "02",
  //       },
  //       {
  //         data_date: "2014-06-25 16:00:00",
  //         type_code: "03",
  //       },
  //       {
  //         data_date: "2014-06-25 17:00:00",
  //         type_code: "01",
  //       },
  //       {
  //         data_date: "2014-06-25 17:00:00",
  //         type_code: "02",
  //       },
  //       {
  //         data_date: "2014-06-25 17:00:00",
  //         type_code: "03",
  //       },
  //       {
  //         data_date: "2014-06-25 18:00:00",
  //         type_code: "01",
  //       },
  //       {
  //         data_date: "2014-06-25 18:00:00",
  //         type_code: "02",
  //       },
  //       {
  //         data_date: "2014-06-25 18:00:00",
  //         type_code: "03",
  //       },
  //       {
  //         data_date: "2014-06-25 19:00:00",
  //         type_code: "01",
  //       },
  //       {
  //         data_date: "2014-06-25 19:00:00",
  //         type_code: "02",
  //       },
  //       {
  //         data_date: "2014-06-25 19:00:00",
  //         type_code: "03",
  //       },
  //       {
  //         data_date: "2014-06-25 20:00:00",
  //         type_code: "01",
  //       },
  //       {
  //         data_date: "2014-06-25 20:00:00",
  //         type_code: "02",
  //       },
  //       {
  //         data_date: "2014-06-25 20:00:00",
  //         type_code: "03",
  //       },
  //       {
  //         data_date: "2014-06-25 21:00:00",
  //         type_code: "01",
  //       },
  //       {
  //         data_date: "2014-06-25 21:00:00",
  //         type_code: "02",
  //       },
  //       {
  //         data_date: "2014-06-25 21:00:00",
  //         type_code: "03",
  //       },
  //       {
  //         data_date: "2014-06-25 22:00:00",
  //         type_code: "01",
  //       },
  //       {
  //         data_date: "2014-06-25 22:00:00",
  //         type_code: "02",
  //       },
  //       {
  //         data_date: "2014-06-25 22:00:00",
  //         type_code: "03",
  //       },
  //       {
  //         data_date: "2014-06-25 23:00:00",
  //         type_code: "01",
  //       },
  //       {
  //         data_date: "2014-06-25 23:00:00",
  //         type_code: "02",
  //       },
  //       {
  //         data_date: "2014-06-25 23:00:00",
  //         type_code: "03",
  //       },
  //     ],
  //   };
  //   const time: any = [
  //     { dataDate: "2024-05-30 00:00:00" },
  //     { dataDate: "2024-05-30 01:00:00" },
  //     { dataDate: "2024-05-30 02:00:00" },
  //     { dataDate: "2024-05-30 03:00:00" },
  //     { dataDate: "2024-05-30 04:00:00" },
  //     { dataDate: "2024-05-30 05:00:00" },
  //     { dataDate: "2024-05-30 06:00:00" },
  //     { dataDate: "2024-05-30 07:00:00" },
  //     { dataDate: "2024-05-30 08:00:00" },
  //     { dataDate: "2024-05-30 09:00:00" },
  //     { dataDate: "2024-05-30 10:00:00" },
  //     { dataDate: "2024-05-30 11:00:00" },
  //     { dataDate: "2024-05-30 12:00:00" },
  //     { dataDate: "2024-05-30 13:00:00" },
  //     { dataDate: "2024-05-30 14:00:00" },
  //     { dataDate: "2024-05-30 15:00:00" },
  //     { dataDate: "2024-05-30 16:00:00" },
  //     { dataDate: "2024-05-30 17:00:00" },
  //     { dataDate: "2024-05-30 18:00:00" },
  //     { dataDate: "2024-05-30 19:00:00" },
  //     { dataDate: "2024-05-30 20:00:00" },
  //     { dataDate: "2024-05-30 21:00:00" },
  //     { dataDate: "2024-05-30 22:00:00" },
  //     { dataDate: "2024-05-30 23:00:00" },
  //   ];
  //   for (let i = 0; i < time.length; i++) {
  //     if (i < 12) {
  //       data.data.push({
  //         type_code: "06",
  //         data_date: time[i].dataDate,
  //         pz: Number((Math.random() * 1000).toFixed(2)),
  //       });
  //     } else {
  //       data.data.push({
  //         type_code: "06",
  //         data_date: time[i].dataDate,
  //       });
  //     }
  //   }
  //   resolve(data);
  // });
}

/**
 * 获取温度曲线接口数据   type  01:中央空调，02空调
 * @returns 温度曲线接口数据
 */
export function getTemperatureInfo() {
  return $axios({
    method: "get",
    url: BASE_URL + `/api/bigScreen/temperatureInfo`,
  });
  // return new Promise<any>((resolve, reject) => {
  //   // const data: any = [
  //   //   { "dataDate": "2024-05-30 00:00:00" },
  //   //   { "dataDate": "2024-05-30 00:15:00" },
  //   //   { "dataDate": "2024-05-30 00:30:00" },
  //   //   { "dataDate": "2024-05-30 00:45:00" },
  //   //   { "dataDate": "2024-05-30 01:00:00" },
  //   //   { "dataDate": "2024-05-30 01:15:00" },
  //   //   { "dataDate": "2024-05-30 01:30:00" },
  //   //   { "dataDate": "2024-05-30 01:45:00" },
  //   //   { "dataDate": "2024-05-30 02:00:00" },
  //   //   { "dataDate": "2024-05-30 02:15:00" },
  //   //   { "dataDate": "2024-05-30 02:30:00" },
  //   //   { "dataDate": "2024-05-30 02:45:00" },
  //   //   { "dataDate": "2024-05-30 03:00:00" },
  //   //   { "dataDate": "2024-05-30 03:15:00" },
  //   //   { "dataDate": "2024-05-30 03:30:00" },
  //   //   { "dataDate": "2024-05-30 03:45:00" },
  //   //   { "dataDate": "2024-05-30 04:00:00" },
  //   //   { "dataDate": "2024-05-30 04:15:00" },
  //   //   { "dataDate": "2024-05-30 04:30:00" },
  //   //   { "dataDate": "2024-05-30 04:45:00" },
  //   //   { "dataDate": "2024-05-30 05:00:00" },
  //   //   { "dataDate": "2024-05-30 05:15:00" },
  //   //   { "dataDate": "2024-05-30 05:30:00" },
  //   //   { "dataDate": "2024-05-30 05:45:00" },
  //   //   { "dataDate": "2024-05-30 06:00:00" },
  //   //   { "dataDate": "2024-05-30 06:15:00" },
  //   //   { "dataDate": "2024-05-30 06:30:00" },
  //   //   { "dataDate": "2024-05-30 06:45:00" },
  //   //   { "dataDate": "2024-05-30 07:00:00" },
  //   //   { "dataDate": "2024-05-30 07:15:00" },
  //   //   { "dataDate": "2024-05-30 07:30:00" },
  //   //   { "dataDate": "2024-05-30 07:45:00" },
  //   //   { "dataDate": "2024-05-30 08:00:00" },
  //   //   { "dataDate": "2024-05-30 08:15:00" },
  //   //   { "dataDate": "2024-05-30 08:30:00" },
  //   //   { "dataDate": "2024-05-30 08:45:00" },
  //   //   { "dataDate": "2024-05-30 09:00:00" },
  //   //   { "dataDate": "2024-05-30 09:15:00" },
  //   //   { "dataDate": "2024-05-30 09:30:00" },
  //   //   { "dataDate": "2024-05-30 09:45:00" },
  //   //   { "dataDate": "2024-05-30 10:00:00" },
  //   //   { "dataDate": "2024-05-30 10:15:00" },
  //   //   { "dataDate": "2024-05-30 10:30:00" },
  //   //   { "dataDate": "2024-05-30 10:45:00" },
  //   //   { "dataDate": "2024-05-30 11:00:00" },
  //   //   { "dataDate": "2024-05-30 11:15:00" },
  //   //   { "dataDate": "2024-05-30 11:30:00" },
  //   //   { "dataDate": "2024-05-30 11:45:00" },
  //   //   { "dataDate": "2024-05-30 12:00:00" },
  //   //   { "dataDate": "2024-05-30 12:15:00" },
  //   //   { "dataDate": "2024-05-30 12:30:00" },
  //   //   { "dataDate": "2024-05-30 12:45:00" },
  //   //   { "dataDate": "2024-05-30 13:00:00" },
  //   //   { "dataDate": "2024-05-30 13:15:00" },
  //   //   { "dataDate": "2024-05-30 13:30:00" },
  //   //   { "dataDate": "2024-05-30 13:45:00" },
  //   //   { "dataDate": "2024-05-30 14:00:00" },
  //   //   { "dataDate": "2024-05-30 14:15:00" },
  //   //   { "dataDate": "2024-05-30 14:30:00" },
  //   //   { "dataDate": "2024-05-30 14:45:00" },
  //   //   { "dataDate": "2024-05-30 15:00:00" },
  //   //   { "dataDate": "2024-05-30 15:15:00" },
  //   //   { "dataDate": "2024-05-30 15:30:00" },
  //   //   { "dataDate": "2024-05-30 15:45:00" },
  //   //   { "dataDate": "2024-05-30 16:00:00" },
  //   //   { "dataDate": "2024-05-30 16:15:00" },
  //   //   { "dataDate": "2024-05-30 16:30:00" },
  //   //   { "dataDate": "2024-05-30 16:45:00" },
  //   //   { "dataDate": "2024-05-30 17:00:00" },
  //   //   { "dataDate": "2024-05-30 17:15:00" },
  //   //   { "dataDate": "2024-05-30 17:30:00" },
  //   //   { "dataDate": "2024-05-30 17:45:00" },
  //   //   { "dataDate": "2024-05-30 18:00:00" },
  //   //   { "dataDate": "2024-05-30 18:15:00" },
  //   //   { "dataDate": "2024-05-30 18:30:00" },
  //   //   { "dataDate": "2024-05-30 18:45:00" },
  //   //   { "dataDate": "2024-05-30 19:00:00" },
  //   //   { "dataDate": "2024-05-30 19:15:00" },
  //   //   { "dataDate": "2024-05-30 19:30:00" },
  //   //   { "dataDate": "2024-05-30 19:45:00" },
  //   //   { "dataDate": "2024-05-30 20:00:00" },
  //   //   { "dataDate": "2024-05-30 20:15:00" },
  //   //   { "dataDate": "2024-05-30 20:30:00" },
  //   //   { "dataDate": "2024-05-30 20:45:00" },
  //   //   { "dataDate": "2024-05-30 21:00:00" },
  //   //   { "dataDate": "2024-05-30 21:15:00" },
  //   //   { "dataDate": "2024-05-30 21:30:00" },
  //   //   { "dataDate": "2024-05-30 21:45:00" },
  //   //   { "dataDate": "2024-05-30 22:00:00" },
  //   //   { "dataDate": "2024-05-30 22:15:00" },
  //   //   { "dataDate": "2024-05-30 22:30:00" },
  //   //   { "dataDate": "2024-05-30 22:45:00" },
  //   //   { "dataDate": "2024-05-30 23:00:00" },
  //   //   { "dataDate": "2024-05-30 23:15:00" },
  //   //   { "dataDate": "2024-05-30 23:30:00" },
  //   //   { "dataDate": "2024-05-30 23:45:00" }
  //   // ];
  //   const data: any = [
  //     { dataDate: "2024-05-30 00:00:00" },
  //     { dataDate: "2024-05-30 01:00:00" },
  //     { dataDate: "2024-05-30 02:00:00" },
  //     { dataDate: "2024-05-30 03:00:00" },
  //     { dataDate: "2024-05-30 04:00:00" },
  //     { dataDate: "2024-05-30 05:00:00" },
  //     { dataDate: "2024-05-30 06:00:00" },
  //     { dataDate: "2024-05-30 07:00:00" },
  //     { dataDate: "2024-05-30 08:00:00" },
  //     { dataDate: "2024-05-30 09:00:00" },
  //     { dataDate: "2024-05-30 10:00:00" },
  //     { dataDate: "2024-05-30 11:00:00" },
  //     { dataDate: "2024-05-30 12:00:00" },
  //     { dataDate: "2024-05-30 13:00:00" },
  //     { dataDate: "2024-05-30 14:00:00" },
  //     { dataDate: "2024-05-30 15:00:00" },
  //     { dataDate: "2024-05-30 16:00:00" },
  //     { dataDate: "2024-05-30 17:00:00" },
  //     { dataDate: "2024-05-30 18:00:00" },
  //     { dataDate: "2024-05-30 19:00:00" },
  //     { dataDate: "2024-05-30 20:00:00" },
  //     { dataDate: "2024-05-30 21:00:00" },
  //     { dataDate: "2024-05-30 22:00:00" },
  //     { dataDate: "2024-05-30 23:00:00" },
  //   ];
  //   for (let i = 0; i < data.length; i++) {
  //     data[i].id = i + 1;
  //     data[i].type = "01";
  //   }
  //   for (let i = 0; i < 12; i++) {
  //     Object.assign(data[i], {
  //       snTemperature: (Math.random() * 40).toFixed(),
  //       swTemperature: (Math.random() * 40).toFixed(),
  //       field01: null,
  //       field02: null,
  //       createBy: null,
  //       createTime: null,
  //       updateBy: null,
  //       updateTime: null,
  //       remark: null,
  //     });
  //   }
  //   resolve({
  //     msg: "操作成功",
  //     code: 0,
  //     data: data,
  //     // [
  //     //   {
  //     //     "createBy": null,
  //     //     "createTime": null,
  //     //     "updateBy": null,
  //     //     "updateTime": null,
  //     //     "remark": null,
  //     //     "id": 1,
  //     //     "dataDate": "2024-05-30 12:50:30",
  //     //     "snTemperature": "25",
  //     //     "swTemperature": "30",
  //     //     "type": "01",
  //     //     "field01": null,
  //     //     "field02": null
  //     //   },
  //     //   {
  //     //     "createBy": null,
  //     //     "createTime": null,
  //     //     "updateBy": null,
  //     //     "updateTime": null,
  //     //     "remark": null,
  //     //     "id": 2,
  //     //     "dataDate": "2024-05-30",
  //     //     "snTemperature": "21",
  //     //     "swTemperature": "32",
  //     //     "type": "01",
  //     //     "field01": null,
  //     //     "field02": null
  //     //   },
  //     //   {
  //     //     "createBy": null,
  //     //     "createTime": null,
  //     //     "updateBy": null,
  //     //     "updateTime": null,
  //     //     "remark": null,
  //     //     "id": 3,
  //     //     "dataDate": "2024-05-30",
  //     //     "snTemperature": "22",
  //     //     "swTemperature": "32",
  //     //     "type": "02",
  //     //     "field01": null,
  //     //     "field02": null
  //     //   },
  //     //   {
  //     //     "createBy": null,
  //     //     "createTime": null,
  //     //     "updateBy": null,
  //     //     "updateTime": null,
  //     //     "remark": null,
  //     //     "id": 4,
  //     //     "dataDate": "2024-05-30",
  //     //     "snTemperature": "22",
  //     //     "swTemperature": "30",
  //     //     "type": "02",
  //     //     "field01": null,
  //     //     "field02": null
  //     //   }
  //     // ]
  //   });
  // });
}

/**
 * 获取日电量，中央空调和光储充实时数据里的当日电量数据
 * @returns 日电量，中央空调和光储充实时数据里的当日电量数据
 */
export function getNowDltj() {
  return $axios({
    method: "get",
    url: BASE_URL + "/api/bigScreen/nowDltj",
  });
  // return new Promise<any>((resolve, reject) => {
  //   resolve({
  //     msg: "操作成功",
  //     code: 0,
  //     data: [
  //       {
  //         typeCode: "光伏",
  //         quantity: (Math.random() * 3000).toFixed(2),
  //       },
  //       {
  //         typeCode: "中央空调",
  //         quantity: (Math.random() * 3000).toFixed(2),
  //       },
  //       {
  //         typeCode: "储能充",
  //         quantity: (Math.random() * 3000).toFixed(2),
  //       },
  //       {
  //         typeCode: "储能放",
  //         quantity: (Math.random() * 3000).toFixed(2),
  //       },
  //       {
  //         typeCode: "充电桩",
  //         quantity: (Math.random() * 3000).toFixed(2),
  //       },
  //     ],
  //   });
  // });
}

/**
 * 获取月电量，中央空调和光储充实时数据里的当月电量（主要是中央空调 当月耗电）数据
 * @returns 月电量，中央空调和光储充实时数据里的当月电量（主要是中央空调 当月耗电）数据
 */
export function getSelectMonthDlsyqk() {
  return $axios({
    method: "get",
    url: BASE_URL + "/api/bigScreen/selectMonthDlsyqk",
  });
  // return new Promise<any>((resolve, reject) => {
  //   resolve({
  //     msg: "操作成功",
  //     code: 0,
  //     data: [
  //       {
  //         name: "中央空调",
  //         num: (Math.random() * 3000).toFixed(2),
  //       },
  //       {
  //         name: "家用负荷总",
  //         num: (Math.random() * 3000).toFixed(2),
  //       },
  //     ],
  //   });
  // });
}

/**
 * 获取实时电压电流功率信息（光储充 实时数据）数据
 * @returns 月电量，中央空调和光储充实时数据里的当月电量（主要是中央空调 当月耗电）数据
 */
export function getAllPzUaIak() {
  return $axios({
    method: "get",
    url: BASE_URL + "/api/bigScreen/getAllPzUaIa",
  });
  // return new Promise<any>((resolve, reject) => {
  //   resolve({
  //     msg: "操作成功",
  //     code: 0,
  //     data: [
  //       {
  //         type_code: "01", // 01 光伏 02 储能 03 充电桩
  //         pz: (Math.random() * 3000).toFixed(2), // 功率
  //         ua: (Math.random() * 1000).toFixed(), //电压
  //         ia: (Math.random() * 100).toFixed(), // 电流
  //       },
  //       {
  //         type_code: "02",
  //         pz: (Math.random() * 3000).toFixed(2),
  //         ua: (Math.random() * 1000).toFixed(),
  //         ia: (Math.random() * 100).toFixed(),
  //       },
  //       {
  //         type_code: "03",
  //         pz: (Math.random() * 3000).toFixed(2),
  //         ua: (Math.random() * 1000).toFixed(),
  //         ia: (Math.random() * 100).toFixed(),
  //       },
  //     ],
  //   });
  // });
}

/**
 * 获取光伏充电信息数据
 * @returns 光伏充电信息数据
 */
export function getGfFdDataNew() {
  return $axios({
    method: "get",
    url: BASE_URL + "/api/bigScreen/getGfFdDataNew",
  });
}

/**
 * 获取光伏充电状态数据
 * @returns 光伏充电状态数据
 */
export function getCnCdzStatus() {
  return $axios({
    method: "get",
    url: BASE_URL + "/api/bigScreen/getCnCdzStatus",
  });
}

/**
 * 获取光伏充电状态数据
 * @returns 光伏充电状态数据
 */
export function getSceneList() {
  return $axios({
    method: "get",
    url: "/sceneList.JSON",
  });
}
