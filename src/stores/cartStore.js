import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const cartList = ref([])
  const addCart = (goods) => {
    const item = cartList.value.find((item) => goods.id === item.id)
    if (item) {
      item.count++
    } else {
      cartList.value.push(goods)
    }
  }
  const deletCart = (id) => {
    const idx = cartList.value.findIndex((item) => id === item.id)
    cartList.value.splice(idx, 1)
  }
  //总数量
  const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
  //总价
  const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))
  const singleCheck = (id, selected) => {
    const item = cartList.value.find((item) => item.id === id)
    item.selected = selected
  }
  const isAll = computed(() => cartList.value.every((item) => item.selected))
  //已选择数量
  const selectedCount = computed(() =>
    cartList.value.filter((item) => item.selected).reduce((a, c) => a + c.count, 0),
  )
  //以选择价格
  const selectedPrice = computed(() =>
    cartList.value.filter((item) => item.selected).reduce((a, c) => a + c.count * c.price, 0),
  )
  return {
    cartList,
    addCart,
    deletCart,
    allCount,
    allPrice,
    singleCheck,
    isAll,
    selectedCount,
    selectedPrice,
  }
})
