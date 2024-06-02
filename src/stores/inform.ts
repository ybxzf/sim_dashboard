import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'

export const informStore = defineStore(
  'store-inform',
  () => {
    const runningSummary = reactive<any>({
      indoorTemp: 0,
      outdoorTemp: 0,
      usePowerDaily: 0,
      usePowerMonth: 0,

    })
    // const birth = computed(() => new Date().getFullYear() - user.age)
    function updateInfo(info: any) {
      for (const key in runningSummary) {
        if (Object.prototype.hasOwnProperty.call(info, key)) {
          runningSummary[key] = info[key];
        }
      }
    }

    return { runningSummary, updateInfo }
  })