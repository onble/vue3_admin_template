<!-- eslint-disable vue/valid-attribute-name -->
<template>
    <el-card>
        <el-form :inline="true" class="form">
            <el-form-item label="职位搜索">
                <el-input
                    placeholder="请你输入搜索职位关键字"
                    v-model="keyword"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button
                    type="primary"
                    size="default"
                    :disabled="keyword ? false : true"
                    @click="search"
                >
                    搜索
                </el-button>
                <el-button type="primary" size="default" @click="reset">
                    重置
                </el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card style="margin: 10px 0px">
        <el-button type="primary" size="default" icon="Plus" @click="addRole">
            添加职位
        </el-button>
        <el-table border style="margin: 10px 0px" :data="allRole">
            <el-table-column type="index" align="center" label="#" />
            <el-table-column label="ID" align="center" prop="id" />
            <el-table-column
                label="职位名称"
                align="center"
                show-overflow-tooltip
                prop="roleName"
            />
            <el-table-column
                label="创建时间"
                align="center"
                show-overflow-tooltip
                prop="createTime"
            />
            <el-table-column
                label="更新时间"
                align="center"
                show-overflow-tooltip
                prop="updateTime"
            />
            <el-table-column label="操作" align="center" width="280px">
                <!-- row:已有的职位对象 -->
                <template #="{ row, $index }">
                    <el-button type="primary" size="small" icon="User">
                        分配权限
                    </el-button>
                    <el-button
                        type="primary"
                        size="small"
                        icon="Edit"
                        @click="updateRole(row)"
                    >
                        编辑
                    </el-button>
                    <el-button type="primary" size="small" icon="Delete">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            v-model:current-page="pageNo"
            v-model:page-size="pageSize"
            :page-sizes="[5, 10, 15, 20]"
            :background="true"
            layout="prev, pager, next, jumper, ->, sizes, total"
            :total="total"
            @current-change="getHasRole"
            @size-change="sizeChange"
        />
    </el-card>
    <!-- 添加职位与更新已有职位的结构：对话框 -->
    <el-dialog
        :title="RoleParams.id ? '添加职位' : '添加职位'"
        v-model="dialogVisite"
    >
        <el-form :model="RoleParams" :rules="rules" ref="form">
            <el-form-item label="职位名称" prop="roleName">
                <el-input
                    placeholder="请你输入职位名称"
                    v-model="RoleParams.roleName"
                ></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <span>
                <el-button
                    type="primary"
                    size="default"
                    @click="dialogVisite = false"
                >
                    取消
                </el-button>
                <el-button type="primary" size="default" @click="save">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
// 请求方法
import { reqAddOrUpdateRole, reqAllRoleList } from '@/api/acl/role';
import type { RoleResponseData, Records, RoleData } from '@/api/acl/role/type';
// 引入骨架的仓库
import userLayOutSettingStore from '@/store/modules/setting';
import { reactive } from 'vue';
import { ElMessage } from 'element-plus';
import { nextTick } from 'vue';
const settingStore = userLayOutSettingStore();
// 当前页码
let pageNo = ref<number>(1);
// 一页展示几条数据
let pageSize = ref<number>(5);
// 搜索职位关键字
let keyword = ref<string>('');
// 存储全部已有的职位
let allRole = ref<Records>([]);
// 职位总个数
let total = ref<number>(0);
// 控制对话框的显示与隐藏
let dialogVisite = ref<boolean>(false);
// 收集新增岗位数据
let RoleParams = reactive<RoleData>({
    roleName: '',
});
// 获取form组件实例
let form = ref<any>();
// 组件挂载完毕
onMounted(() => {
    getHasRole();
});
// 获取全部用户信息的方法|分页器当前页码发生变化的回调
const getHasRole = async (pager = 1) => {
    // 修改当前页码
    pageNo.value = pager;
    const result: RoleResponseData = await reqAllRoleList(
        pageNo.value,
        pageSize.value,
        keyword.value,
    );
    if (result.code == 200) {
        total.value = result.data.total;
        allRole.value = result.data.records;
    }
};
// 下拉菜单的回调
const sizeChange = (size: number) => {
    pageSize.value = size;
    getHasRole();
};
// 搜索按钮的回调
const search = () => {
    // 再次发请求根据关键字
    getHasRole();
    keyword.value = '';
};
// 重置按钮的回调
const reset = () => {
    settingStore.refsh = !settingStore.refsh;
};
// 添加职位按钮的回调
const addRole = () => {
    // 对话框显示出来
    dialogVisite.value = true;
    // 清空数据
    Object.assign(RoleParams, {
        roleName: '',
        id: 0,
    });
    // 清空上一次表单校验错误结果
    nextTick(() => {
        form.value.clearValidate('roleName');
    });
};
// 更新已有的职位按钮的回调
const updateRole = (row: RoleData) => {
    // 显示出对话框
    dialogVisite.value = true;
    // 存储已有的职位---带有ID的
    Object.assign(RoleParams, row);
    // 清空上一次表单校验错误结果
    nextTick(() => {
        form.value.clearValidate('roleName');
    });
};
// 自定义校验规则的回调
const validatorRoleName = (rule: any, value: any, callBack: any) => {
    if (value.trim().length >= 2) {
        callBack();
    } else {
        callBack(new Error('职位名称至少两位'));
    }
};
// 职位校验规则
const rules = {
    roleName: [
        { required: true, trigger: 'blur', validator: validatorRoleName },
    ],
};
// 确定按钮的回调
const save = async () => {
    // 表单校验结果，结果通过再发请求，结果没有通过不应该再发请求
    await form.value.validate();
    // 添加职位|更新职位的请求
    const result: any = await reqAddOrUpdateRole(RoleParams);
    if (result.code == 200) {
        // 提示文字
        ElMessage({
            type: 'success',
            message: RoleParams.id ? '更新成功' : '添加成功',
        });
        // 对话框显示
        dialogVisite.value = false;
        // 再次获取全部的已有的职位
        getHasRole(RoleParams.id ? pageNo.value : 1);
    }
};
</script>

<style scoped>
.form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
}
</style>
