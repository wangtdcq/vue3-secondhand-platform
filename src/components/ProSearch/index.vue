<script setup>
import debounce from "@/utils/debounce"
import { computed } from 'vue'
// import { Search } from '@element-plus/icons-vue'

const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    placeholder: {
        type: String,
        default: '搜索你想要的宝贝...'
    },
    buttonText: {
        type: String,
        default: '搜索'
    },
    loading: {
        type: Boolean,
        default: false
    },
    debounceTime: {
        type: Number,
        default: 0
    }
})

const emits = defineEmits(['update:modelValue', 'search'])

const innerValue = computed({
    get: () => props.modelValue,
    set: () => {
        emits('update:modelValue', val)
        if (props.debounceTime > 0) {
            debounceEmit();
        }
    }
})
const handleSearch = () => {
    emits = ('search', innerValue.value)
}
const debounceEmit = debounce(() => {
    handleSearch()
}, props.debounceTime);

</script>

<template>
    <div class="pro-search">
        <el-input v-model="innerValue" v-bind="$attrs" :placeholder="placeholder" class="search-input"
            @keydown.enter="handleSearch">
            <!-- <template #prefix>
                <el-icon>
                    <Search></Search>
                </el-icon>
            </template> -->
            <template #append>
                <el-button type="primary" :loading="loading" @click="handleSearch">
                    {{ buttonText }}
                </el-button>
            </template>
        </el-input>
    </div>
</template>

<style scoped>
.pro-search :deep(.el-input-group__append) {
    background-color: var(--el-color-primary);
    color: white;
    border-color: var(--el-color-primary);
}

.pro-search :deep(.el-input-group__append:hover) {
    opacity: 0.9;
}
</style>