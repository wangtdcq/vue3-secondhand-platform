import { defineStore } from 'pinia'
import { LoginAPI } from '@/api/user'
import { ref } from 'vue'
import type { LoginParams } from '@/api/user'

interface userInfo {
  account: string
  avatar: string
  birthday: string
  cityCode: string
  gender: string
  id: string
  mobile: string
  nickname: string
  profession: string
  provinceCode: string
  token: string
}

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref<userInfo | null>(null)
    //获取user数据
    const getUserInfo = async ({ account, password }: LoginParams) => {
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
