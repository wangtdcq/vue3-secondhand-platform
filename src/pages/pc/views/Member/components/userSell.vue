<template>
    <div class="product-upload">
        <h3>发布新商品</h3>
        <el-form :model="productForm" label-width="80px" style="max-width: 500px">
            <!-- 商品名称 -->
            <el-form-item label="名称">
                <el-input v-model="productForm.name" placeholder="请输入商品名称" />
            </el-form-item>

            <!-- 商品价格 -->
            <el-form-item label="价格">
                <el-input-number v-model="productForm.price" :precision="2" :step="0.1" :min="0" />
                <span style="margin-left: 10px">元</span>
            </el-form-item>

            <!-- 商品描述 -->
            <el-form-item label="描述">
                <el-input v-model="productForm.description" type="textarea" rows="3" placeholder="请输入商品详细介绍" />
            </el-form-item>

            <!-- 图片上传 -->
            <el-form-item label="图片">
                <el-upload class="avatar-uploader" action="#" :auto-upload="false" :show-file-list="false"
                    :on-change="handleImageChange">
                    <img v-if="imageUrl" :src="imageUrl" class="preview-img" />
                    <el-icon v-else class="uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
                <div class="tip">仅限 jpg/png，小于 2MB</div>
            </el-form-item>

            <!-- 提交按钮 -->
            <el-form-item>
                <el-button type="primary" @click="submitForm" :loading="loading">立即上架</el-button>
                <el-button @click="resetForm">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'

// 1. 定义表单数据
const productForm = reactive({
    name: '',
    price: 0,
    description: '',
    imageFile: null // 用于存放图片文件对象
})

const imageUrl = ref('') // 预览图链接
const loading = ref(false)

// 2. 选择图片后的回调
const handleImageChange = (uploadFile) => {
    // 校验格式与大小
    const isJPGorPNG = ['image/jpeg', 'image/png'].includes(uploadFile.raw.type)
    const isLt2M = uploadFile.raw.size / 1024 / 1024 < 2

    if (!isJPGorPNG) {
        ElMessage.error('上传头像图片只能是 JPG/PNG 格式!')
        return false
    }
    if (!isLt2M) {
        ElMessage.error('上传头像图片大小不能超过 2MB!')
        return false
    }

    // 保存文件对象
    productForm.imageFile = uploadFile.raw
    // 创建本地预览链接
    imageUrl.value = URL.createObjectURL(uploadFile.raw)
}

// 3. 提交表单
const submitForm = async () => {
    if (!productForm.name || !productForm.imageFile) {
        return ElMessage.warning('请完善商品信息并上传图片')
    }

    loading.value = true

    // 使用 FormData 包装数据
    const formData = new FormData()
    formData.append('name', productForm.name)
    formData.append('price', productForm.price)
    formData.append('description', productForm.description)
    formData.append('file', productForm.imageFile) // 'file' 为后端接收的字段名

    try {
        const res = await axios.post('/api/products/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        ElMessage.success('商品上传成功！')
        resetForm()
    } catch (error) {
        ElMessage.error('上传失败：' + error.message)
    } finally {
        loading.value = false
    }
}

// 4. 重置表cast
const resetForm = () => {
    productForm.name = ''
    productForm.price = 0
    productForm.description = ''
    productForm.imageFile = null
    imageUrl.value = ''
}
</script>

<style scoped>
.preview-img {
    width: 148px;
    height: 148px;
    display: block;
    object-fit: cover;
}

.uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 148px;
    height: 148px;
    text-align: center;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.tip {
    font-size: 12px;
    color: #999;
    margin-top: 5px;
}
</style>