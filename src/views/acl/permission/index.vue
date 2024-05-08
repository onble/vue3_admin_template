<!-- eslint-disable vue/valid-attribute-name -->
<template>
    <el-table
        :data="PermisstionArr"
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        border
    >
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="权限值" prop="code"></el-table-column>
        <el-table-column label="修改时间" prop="updateTime"></el-table-column>
        <el-table-column label="操作">
            <!-- row:即为已有的菜单对象|按钮的对象的数据 -->
            <template #="{ row, $index }">
                <el-button
                    type="primary"
                    size="small"
                    :disabled="row.level == 4 ? true : false"
                >
                    {{ row.level == 3 ? '添加功能' : '添加菜单' }}
                </el-button>
                <el-button
                    type="primary"
                    size="small"
                    :disabled="row.level == 1 ? true : false"
                >
                    编辑
                </el-button>
                <el-button
                    type="primary"
                    size="small"
                    :dsiabled="row.level == 1 ? true : false"
                >
                    删除
                </el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
// 引入获取菜单请求API
import { reqAllPermisstion } from '@/api/acl/menu';
// 引入ts类型
import type {
    PermisstionResponseData,
    PermisstionList,
} from '@/api/acl/menu/type';
// 存储菜单的数据
let PermisstionArr = ref<PermisstionList>([]);
// 组件挂载完毕
onMounted(() => {
    getHasPermisstion();
});
// 获取菜单数据的方法
const getHasPermisstion = async () => {
    const result: PermisstionResponseData = await reqAllPermisstion();
    if (result.code == 200) {
        PermisstionArr.value = result.data;
    }
};
</script>

<style scoped></style>
