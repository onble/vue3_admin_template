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
                    @click="addPermisstion"
                >
                    {{ row.level == 3 ? '添加功能' : '添加菜单' }}
                </el-button>
                <el-button
                    type="primary"
                    size="small"
                    :disabled="row.level == 1 ? true : false"
                    @click="updatePermisstion(row)"
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
    <!-- 对话框组件：添加或者更新已有的菜单的数据结构 -->
    <el-dialog
        v-model="dialogVisible"
        title="添加菜单"
        width="500"
        :before-close="handleClose"
    >
        <!-- 表单组件：收集新增与已有的菜单的数据 -->
        <el-form>
            <el-form-item label="名称">
                <el-input placeholder="请你输入菜单名称"></el-input>
            </el-form-item>
            <el-form-item label="权限">
                <el-input placeholder="请你输入权限数值"></el-input>
            </el-form-item>
        </el-form>

        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="dialogVisible = false">
                    确定
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
// 引入获取菜单请求API
import { reqAllPermisstion } from '@/api/acl/menu';
// 引入ts类型
import type {
    PermisstionResponseData,
    PermisstionList,
    Permisstion,
} from '@/api/acl/menu/type';
// 存储菜单的数据
let PermisstionArr = ref<PermisstionList>([]);
// 控制对话框的显示与隐藏
let dialogVisible = ref<boolean>(false);
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
// 添加菜单按钮的回调
const addPermisstion = () => {
    // 对话框显示出来
    dialogVisible.value = true;
};
// 变价已有的菜单
const updatePermisstion = (row: Permisstion) => {
    dialogVisible.value = true;
};
</script>

<style scoped></style>
