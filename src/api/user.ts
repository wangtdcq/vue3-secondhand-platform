import httpInstance from '@/utils/http'
import type { Goods } from '@/types/goods'
import type { ResData } from '@/types/api'

export interface LoginParams {
  account: string
  password: string
}

export const LoginAPI = ({ account, password }: LoginParams) => {
  return httpInstance({
    url: '/login',
    method: 'POST',
    data: {
      account,
      password,
    },
  })
}

export const getLikeListAPI = ({ limit = 4 }) => {
  return httpInstance<ResData<Goods[]>>({
    url: '/goods/relevant',
    params: {
      limit,
    },
  })
}
