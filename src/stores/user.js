import { defineStore } from 'pinia'
import { LoginAPI } from '@/api/user'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref([])
    //获取user数据
    const getUserInfo = async ({ account, password }) => {
      const res = await LoginAPI({ account, password })
      userInfo.value = res.result
    }
    return {
      userInfo,
      getUserInfo,
    }
  },
  {
    persist: true,
  },
)
