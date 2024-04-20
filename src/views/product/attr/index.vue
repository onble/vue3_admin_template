<!-- eslint-disable vue/valid-attribute-name -->
<template>
    <div>
        <!-- 三级分类全局组件 -->
        <Category :scene="scene"></Category>
        <el-card style="margin: 10px 0px">
            <div v-show="scene == 0">
                <el-button
                    @click="addAttr"
                    type="primary"
                    size="default"
                    icon="Plus"
                    :disabled="categoryStore.c3Id ? false : true"
                >
                    添加属性
                </el-button>
                <el-table border style="margin: 10px 0px" :data="attrArr">
                    <el-table-column
                        label="序号"
                        type="index"
                        align="center"
                        width="80px"
                    />
                    <el-table-column
                        label="属性名称"
                        width="120px"
                        prop="attrName"
                    ></el-table-column>
                    <el-table-column label="属性值名称">
                        <template #="{ row }">
                            <el-tag
                                v-for="item in row.attrValueList"
                                :key="item.id"
                                style="margin: 5px"
                            >
                                {{ item.valueName }}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="120px">
                        <!-- row:已有的属性对象 -->
                        <template #="row">
                            <el-button
                                type="primary"
                                size="small"
                                icon="Edit"
                                @click="updateAttr"
                            ></el-button>
                            <el-button
                                type="primary"
                                size="small"
                                icon="Delete"
                            ></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div v-show="scene == 1">
                <!-- 展示添加属性与修改数据的结构 -->
                <el-form :inline="true">
                    <el-form-item label="属性名称">
                        <el-input placeholder="请你输入属性名称"></el-input>
                    </el-form-item>
                </el-form>
                <el-button type="primary" size="default" icon="Plus">
                    添加属性值
                </el-button>
                <el-button type="primary" size="default" @click="cancel">
                    取消
                </el-button>
                <el-table border style="margin: 10px 0px">
                    <el-table-column
                        lable="序号"
                        width="80px"
                        type="index"
                        align="center"
                    ></el-table-column>
                    <el-table-column label="属性值名称"></el-table-column>
                    <el-table-column label="属性值操作"></el-table-column>
                </el-table>
                <el-button type="primary" size="default">保存</el-button>
                <el-button type="primary" size="default" @click="cancel">
                    取消
                </el-button>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
// 组合式API函数watch
import { watch, ref, reactive } from 'vue';
// 引入获取已有属性与属性值接口
import { reqAttr } from '@/api/product/attr';
// 获取分类的仓库
import useCategoryStore from '@/store/modules/category';
import type { AttrResponseData } from '@/api/product/attr/type';
const categoryStore = useCategoryStore();
// 存储已有的属性与属性值
let attrArr = ref<Attr[]>([]);
// 定义card组件内容切换变量
let scene = ref<number>(0); // scene=0,显示table.scene=1,展示添加与修改属性结构
// 收集新增的属性的数据
let attrParams = reactive({
    attrName: '', // 新增的属性的名字
    attrValueList: [
        // 新增的属性值数组
        // {
        //     valueName: 'string',
        // },
    ],
    categoryId: '', // 三级分类的ID
    categoryLevel: 3, // 代表的是三级分类
});
// 监听仓库三级分类ID变化
watch(
    () => categoryStore.c3Id,
    () => {
        // 清空上一次查询的属性与属性值
        attrArr.value = [];
        // 保证三级分类有才能发请求
        if (!categoryStore.c3Id) return;
        // 获取分类的ID
        getAttr();
    },
);
// 获取已有的属性与属性值方法
const getAttr = async () => {
    const { c1Id, c2Id, c3Id } = categoryStore;
    // 获取分类下的已有的属性与属性值
    const result: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id);
    if (result.code == 200) {
        attrArr.value = result.data;
    }
};
// 添加属性按钮的回调
const addAttr = () => {
    // 切换为添加与修改属性的结构
    scene.value = 1;
};
// table表格修改已有属性按钮的回调
const updateAttr = () => {
    // 切换为添加与修改属性的结构
    scene.value = 1;
};
// 取消按钮的回调
const cancel = () => {
    scene.value = 0;
};
</script>

<style scoped></style>
