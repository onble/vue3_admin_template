<template>
    <div>
        <el-button type="primary" size="default" :icon="Plus">
            主要按钮
        </el-button>
        <el-button type="success" size="small" :icon="Edit">编辑按钮</el-button>
        <el-button type="danger" size="default" :icon="Delete">
            删除按钮
        </el-button>
        <el-pagination
            :page-sizes="[100, 200, 300, 400]"
            :total="400"
            layout="total,size,prev,pager,next,jumper"
        ></el-pagination>
        <Test></Test>
        <SvgTest></SvgTest>
    </div>
</template>

<script setup lang="ts">
// 引入图标组件
import { Plus, Edit, Delete } from '@element-plus/icons-vue'
import Test from '@/components/Test.vue'
import SvgTest from '@/components/SvgTest.vue'
</script>

<style scoped></style>
