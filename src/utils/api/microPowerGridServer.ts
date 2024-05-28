import axios from 'axios';
import $axios from '@/utils/axios';

export function getYesterdayElectricity() {
    return axios.request({
        url: '/api/bigScreen/yesterdayElectricity',
        method: 'get',
    })
}

export function getDevEnvList(reqParam:Object) {
    return $axios({
        method: 'post',
        url: '/api/bigScreen/yesterdayElectricity',
        data: reqParam
    })
}
