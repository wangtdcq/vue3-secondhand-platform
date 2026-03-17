import httpInstance from '@/utils/http'
import type { ResData } from '@/types/api'

export interface BannerItem {
  id: string
  imgUrl: string
  hrefUrl: string
  type: 1
}
export interface NewItem {
  id: string
  name: string
  desc: string
  price: string
  picture: string
  OrderNum: number
}
export interface HotItem {
  id: string
  picture: string
  title: string
  alt: string
}
export function getBannerAPI() {
  return httpInstance<ResData<BannerItem[]>>({
    url: '/home/banner',
  })
}

export const findnewAPI = () => {
  return httpInstance<ResData<NewItem[]>>({
    url: '/home/new',
  })
}

export const getHotAPI = () => {
  return httpInstance<ResData<HotItem[]>>({
    url: 'home/hot',
  })
}
