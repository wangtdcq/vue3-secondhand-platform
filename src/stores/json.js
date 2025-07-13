import { defineStore } from 'pinia'
import { ref } from 'vue'
import total from '@/assets/new.json'

export const useDataStore = defineStore('data', () => {
  const jsonData = ref([])

  const updateData = (newData) => {
    jsonData.value.push(newData)
  }

  return { jsonData, updateData }
})
