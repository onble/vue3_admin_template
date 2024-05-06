<template>
    <el-card>
        <el-form :inline="true" class="form">
            <el-form-item label="职位搜索">
                <el-input placeholder="请你输入搜索职位关键字"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="default">搜索</el-button>
                <el-button type="primary" size="default">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card style="margin: 10px 0px">
        <el-button type="primary" size="default" icon="Plus">
            添加职位
        </el-button>
        <el-table border style="margin: 10px 0px">
            <el-table-column type="index" align="center" label="#" />
            <el-table-column label="ID" align="center" />
            <el-table-column
                label="职位名称"
                align="center"
                show-overflow-tooltip
            />
            <el-table-column
                label="创建时间"
                align="center"
                show-overflow-tooltip
            />
            <el-table-column
                label="更新时间"
                align="center"
                show-overflow-tooltip
            />
            <el-table-column label="操作" align="center" width="260px" />
        </el-table>
        <el-pagination
            v-model:current-page="pageNo"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 30, 40]"
            :background="true"
            layout="prev, pager, next, jumper, ->, sizes, total"
            :total="400"
        />
    </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// 当前页码
let pageNo = ref<number>(1);
// 一页展示几条数据
let pageSize = ref<number>(10);
</script>

<style scoped>
.form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
}
</style>
