import axios from 'axios';

export function getYesterdayElectricity() {
    return axios.request({
        url: '/api/bigScreen/yesterdayElectricity',
        method: 'get',
    })
}