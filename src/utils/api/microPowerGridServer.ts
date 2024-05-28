import $axios from '@/utils/interceptor';

/**
 * 获取昨日电量统计数据
 * @returns 昨日电量统计数据
 */
export function getYesterdayElectricity() {
    return $axios({
        method: 'get',
        url: '/api/bigScreen/yesterdayElectricity',
    })
}
/**
 * 获取光储充功率监测曲线数据，type_code：01 光伏 02 储能 03 充电桩 04 家用负荷
 * @returns 光储充功率监测曲线数据
 */
export function getSsGvTj() {
    // return $axios({
    //     method: 'get',
    //     url: '/api/bigScreen/ssGvTj',
    // })
    return new Promise((resolve, reject) => {
        resolve({
            msg: "操作成功",
            code: 0,
            data: [
                {
                    "qz": 0,
                    "pz": Number((Math.random() * 100).toFixed(2)),
                    "data_date": "2014-06-25 00:00:00",
                    "ua": 234.6,
                    "ub": 0,
                    "uc": 0,
                    "qa": 0,
                    "pa": 0,
                    "qb": 0,
                    "pb": 0,
                    "qc": 0,
                    "pc": 0,
                    "ia": 0,
                    "ib": 0,
                    "ic": 0,
                    "type_code": "01"
                },
                {
                    "data_date": "2014-06-25 00:00:00",
                    "type_code": "02"
                },
                {
                    "data_date": "2014-06-25 00:00:00",
                    "type_code": "03"
                },
                {
                    "qz": 0,
                    "pz": Number((Math.random() * 100).toFixed(2)),
                    "data_date": "2014-06-25 01:00:00",
                    "ua": 235.9,
                    "ub": 0,
                    "uc": 0,
                    "qa": 0,
                    "pa": 0,
                    "qb": 0,
                    "pb": 0,
                    "qc": 0,
                    "pc": 0,
                    "ia": 0,
                    "ib": 0,
                    "ic": 0,
                    "type_code": "01"
                },
                {
                    "data_date": "2014-06-25 01:00:00",
                    "type_code": "02"
                },
                {
                    "data_date": "2014-06-25 01:00:00",
                    "type_code": "03"
                },
                {
                    "qz": 0,
                    "pz": Number((Math.random() * 100).toFixed(2)),
                    "data_date": "2014-06-25 02:00:00",
                    "ua": 236.3,
                    "ub": 0,
                    "uc": 0,
                    "qa": 0,
                    "pa": 0,
                    "qb": 0,
                    "pb": 0,
                    "qc": 0,
                    "pc": 0,
                    "ia": 0,
                    "ib": 0,
                    "ic": 0,
                    "type_code": "01"
                },
                {
                    "data_date": "2014-06-25 02:00:00",
                    "type_code": "02"
                },
                {
                    "data_date": "2014-06-25 02:00:00",
                    "type_code": "03"
                },
                {
                    "qz": 0,
                    "pz": 0,
                    "data_date": "2014-06-25 03:00:00",
                    "ua": 236,
                    "ub": 0,
                    "uc": 0,
                    "qa": 0,
                    "pa": 0,
                    "qb": 0,
                    "pb": 0,
                    "qc": 0,
                    "pc": 0,
                    "ia": 0,
                    "ib": 0,
                    "ic": 0,
                    "type_code": "01"
                },
                {
                    "data_date": "2014-06-25 03:00:00",
                    "type_code": "02"
                },
                {
                    "data_date": "2014-06-25 03:00:00",
                    "type_code": "03"
                },
                {
                    "qz": 0,
                    "pz": 0,
                    "data_date": "2014-06-25 04:00:00",
                    "ua": 235.8,
                    "ub": 0,
                    "uc": 0,
                    "qa": 0,
                    "pa": 0,
                    "qb": 0,
                    "pb": 0,
                    "qc": 0,
                    "pc": 0,
                    "ia": 0,
                    "ib": 0,
                    "ic": 0,
                    "type_code": "01"
                },
                {
                    "data_date": "2014-06-25 04:00:00",
                    "type_code": "02"
                },
                {
                    "data_date": "2014-06-25 04:00:00",
                    "type_code": "03"
                },
                {
                    "qz": 0,
                    "pz": 0,
                    "data_date": "2014-06-25 05:00:00",
                    "ua": 236.8,
                    "ub": 0,
                    "uc": 0,
                    "qa": 0,
                    "pa": 0,
                    "qb": 0,
                    "pb": 0,
                    "qc": 0,
                    "pc": 0,
                    "ia": 0,
                    "ib": 0,
                    "ic": 0,
                    "type_code": "01"
                },
                {
                    "data_date": "2014-06-25 05:00:00",
                    "type_code": "02"
                },
                {
                    "data_date": "2014-06-25 05:00:00",
                    "type_code": "03"
                },
                {
                    "qz": 0,
                    "pz": 0,
                    "data_date": "2014-06-25 06:00:00",
                    "ua": 235.7,
                    "ub": 0,
                    "uc": 0,
                    "qa": 0,
                    "pa": 0,
                    "qb": 0,
                    "pb": 0,
                    "qc": 0,
                    "pc": 0,
                    "ia": 0,
                    "ib": 0,
                    "ic": 0,
                    "type_code": "01"
                },
                {
                    "data_date": "2014-06-25 06:00:00",
                    "type_code": "02"
                },
                {
                    "data_date": "2014-06-25 06:00:00",
                    "type_code": "03"
                },
                {
                    "qz": 0,
                    "pz": 0,
                    "data_date": "2014-06-25 07:00:00",
                    "ua": 234.4,
                    "ub": 0,
                    "uc": 0,
                    "qa": 0,
                    "pa": 0,
                    "qb": 0,
                    "pb": 0,
                    "qc": 0,
                    "pc": 0,
                    "ia": 0,
                    "ib": 0,
                    "ic": 0,
                    "type_code": "01"
                },
                {
                    "data_date": "2014-06-25 07:00:00",
                    "type_code": "02"
                },
                {
                    "data_date": "2014-06-25 07:00:00",
                    "type_code": "03"
                },
                {
                    "qz": 0,
                    "pz": 0,
                    "data_date": "2014-06-25 08:00:00",
                    "ua": 226.7,
                    "ub": 0,
                    "uc": 0,
                    "qa": 0,
                    "pa": 0,
                    "qb": 0,
                    "pb": 0,
                    "qc": 0,
                    "pc": 0,
                    "ia": 0,
                    "ib": 0,
                    "ic": 0,
                    "type_code": "01"
                },
                {
                    "data_date": "2014-06-25 08:00:00",
                    "type_code": "02"
                },
                {
                    "data_date": "2014-06-25 08:00:00",
                    "type_code": "03"
                },
                {
                    "qz": 0,
                    "pz": 0,
                    "data_date": "2014-06-25 09:00:00",
                    "ua": 227.9,
                    "ub": 0,
                    "uc": 0,
                    "qa": 0,
                    "pa": 0,
                    "qb": 0,
                    "pb": 0,
                    "qc": 0,
                    "pc": 0,
                    "ia": 0,
                    "ib": 0,
                    "ic": 0,
                    "type_code": "01"
                },
                {
                    "data_date": "2014-06-25 09:00:00",
                    "type_code": "02"
                },
                {
                    "data_date": "2014-06-25 09:00:00",
                    "type_code": "03"
                },
                {
                    "qz": 0,
                    "pz": 0,
                    "data_date": "2014-06-25 10:00:00",
                    "ua": 225.1,
                    "ub": 0,
                    "uc": 0,
                    "qa": 0,
                    "pa": 0,
                    "qb": 0,
                    "pb": 0,
                    "qc": 0,
                    "pc": 0,
                    "ia": 0,
                    "ib": 0,
                    "ic": 0,
                    "type_code": "01"
                },
                {
                    "data_date": "2014-06-25 10:00:00",
                    "type_code": "02"
                },
                {
                    "data_date": "2014-06-25 10:00:00",
                    "type_code": "03"
                },
                {
                    "qz": 0,
                    "pz": Number((Math.random() * 100).toFixed(2)),
                    "data_date": "2014-06-25 11:00:00",
                    "ua": 228.4,
                    "ub": 0,
                    "uc": 0,
                    "qa": 0,
                    "pa": 0,
                    "qb": 0,
                    "pb": 0,
                    "qc": 0,
                    "pc": 0,
                    "ia": 0,
                    "ib": 0,
                    "ic": 0,
                    "type_code": "01"
                },
                {
                    "data_date": "2014-06-25 11:00:00",
                    "type_code": "02"
                },
                {
                    "data_date": "2014-06-25 11:00:00",
                    "type_code": "03"
                },
                {
                    "data_date": "2014-06-25 12:00:00",
                    "type_code": "01"
                },
                {
                    "data_date": "2014-06-25 12:00:00",
                    "type_code": "02"
                },
                {
                    "data_date": "2014-06-25 12:00:00",
                    "type_code": "03"
                },
                {
                    "data_date": "2014-06-25 13:00:00",
                    "type_code": "01"
                },
                {
                    "data_date": "2014-06-25 13:00:00",
                    "type_code": "02"
                },
                {
                    "data_date": "2014-06-25 13:00:00",
                    "type_code": "03"
                },
                {
                    "data_date": "2014-06-25 14:00:00",
                    "type_code": "01"
                },
                {
                    "data_date": "2014-06-25 14:00:00",
                    "type_code": "02"
                },
                {
                    "data_date": "2014-06-25 14:00:00",
                    "type_code": "03"
                },
                {
                    "data_date": "2014-06-25 15:00:00",
                    "type_code": "01"
                },
                {
                    "data_date": "2014-06-25 15:00:00",
                    "type_code": "02"
                },
                {
                    "data_date": "2014-06-25 15:00:00",
                    "type_code": "03"
                },
                {
                    "data_date": "2014-06-25 16:00:00",
                    "type_code": "01"
                },
                {
                    "data_date": "2014-06-25 16:00:00",
                    "type_code": "02"
                },
                {
                    "data_date": "2014-06-25 16:00:00",
                    "type_code": "03"
                },
                {
                    "data_date": "2014-06-25 17:00:00",
                    "type_code": "01"
                },
                {
                    "data_date": "2014-06-25 17:00:00",
                    "type_code": "02"
                },
                {
                    "data_date": "2014-06-25 17:00:00",
                    "type_code": "03"
                },
                {
                    "data_date": "2014-06-25 18:00:00",
                    "type_code": "01"
                },
                {
                    "data_date": "2014-06-25 18:00:00",
                    "type_code": "02"
                },
                {
                    "data_date": "2014-06-25 18:00:00",
                    "type_code": "03"
                },
                {
                    "data_date": "2014-06-25 19:00:00",
                    "type_code": "01"
                },
                {
                    "data_date": "2014-06-25 19:00:00",
                    "type_code": "02"
                },
                {
                    "data_date": "2014-06-25 19:00:00",
                    "type_code": "03"
                },
                {
                    "data_date": "2014-06-25 20:00:00",
                    "type_code": "01"
                },
                {
                    "data_date": "2014-06-25 20:00:00",
                    "type_code": "02"
                },
                {
                    "data_date": "2014-06-25 20:00:00",
                    "type_code": "03"
                },
                {
                    "data_date": "2014-06-25 21:00:00",
                    "type_code": "01"
                },
                {
                    "data_date": "2014-06-25 21:00:00",
                    "type_code": "02"
                },
                {
                    "data_date": "2014-06-25 21:00:00",
                    "type_code": "03"
                },
                {
                    "data_date": "2014-06-25 22:00:00",
                    "type_code": "01"
                },
                {
                    "data_date": "2014-06-25 22:00:00",
                    "type_code": "02"
                },
                {
                    "data_date": "2014-06-25 22:00:00",
                    "type_code": "03"
                },
                {
                    "data_date": "2014-06-25 23:00:00",
                    "type_code": "01"
                },
                {
                    "data_date": "2014-06-25 23:00:00",
                    "type_code": "02"
                },
                {
                    "data_date": "2014-06-25 23:00:00",
                    "type_code": "03"
                }
            ]
        })
    })
}
/**
 * 获取家用负荷实时功率曲线数据
 * @returns 家用负荷实时功率曲线数据
 */
export function getSsJyfhGvTj() {
    return $axios({
        method: 'get',
        url: '/api/bigScreen/ssJyfhGvTj',
    })
}
