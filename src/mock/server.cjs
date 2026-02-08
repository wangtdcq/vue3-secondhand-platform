// mock-server.js
const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const app = express()

app.use(cors()) // 允许前端 Vue 项目跨域访问

// 读取本地 JSON 数据（模拟数据库）
const rawData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'new.json'), 'utf-8'))
const sourceData = rawData.result

// 定义接口：获取商品列表
app.get('/api/goods', (req, res) => {
  // 1. 获取前端传来的参数（比如每页多少条）
  const pageSize = parseInt(req.query.pageSize) || 20

  // 2. 模拟后端逻辑：随机抽取商品
  const data = Array.from({ length: pageSize }).map(() => {
    const randomIndex = Math.floor(Math.random() * sourceData.length)
    const item = sourceData[randomIndex]
    return {
      ...item,
      // 在后端生成唯一 ID，更符合真实场景
      uniqueId: `${item.id}-${Math.random().toString(36).slice(2, 9)}`,
    }
  })

  // 3. 模拟网络延迟 600ms，让前端的 Loading 动画有机会展示
  setTimeout(() => {
    res.json({
      code: 200,
      msg: 'success',
      result: data,
    })
  }, 600)
})

app.listen(3000, () => {
  console.log('Mock Server 运行在: http://localhost:3000')
})
