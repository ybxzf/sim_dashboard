import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'

export const realTimeDataStore = defineStore(
  'store-real-time-data',
  () => {
    const realTimeData = reactive<any>({
      //光伏发电
      photovoltaicUa: 0,  //电压
      photovoltaicIa: 0,  //电流
      photovoltaicTotal: 0,  //累计电量
      photovoltaicPz: 0,  //功率
      photovoltaiDaily: 0, //今日发电量
      //储能
      energyPower: 80, //电量
      energyPz: 0, //功率
      energyTotalIn: 0, //总充电量
      energyTotalOut: 0, //总放电量
      energyInPower: 0, //日充电量
      energyOutPower: 0, //日放电量
      //充电桩
      chargePileUa: 0,  //电压
      chargePileIa: 0,  //电流
      chargePileTotal: 0,  //累计电量
      chargePilePz: 0,  //功率
      //光伏|市电状态
      chargeUsePilePhotovolt: 0,//充电桩光伏
      chargeUsePower: 0,//充电桩市电
      energyUsePhotovolt: 0,//储能光伏
      energyUsePower: 0,//储能市电

    })
    // const birth = computed(() => new Date().getFullYear() - user.age)
    function updateData(info: any) {
      for (const key in realTimeData) {
        if (Object.prototype.hasOwnProperty.call(info, key)) {
          realTimeData[key] = info[key];
        }
      }
    }

    return { realTimeData, updateData }
  })