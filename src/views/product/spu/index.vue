<!-- eslint-disable vue/valid-attribute-name -->
<template>
    <div>
        <!-- 三级分类 -->
        <Category :scene="scene"></Category>
        <el-card style="margin: 10px 0px">
            <!-- v-if|v-show:都可以实现显示与隐藏 -->
            <div v-show="scene == 0">
                <el-button
                    @click="addSpu"
                    type="primary"
                    size="default"
                    icon="Plus"
                    :disabled="categoryStore.c3Id ? false : true"
                >
                    添加SPU
                </el-button>
                <!-- 展示已有SPU数据 -->
                <el-table style="margin: 10px 0px" border :data="records">
                    <el-table-column
                        label="序号"
                        type="index"
                        align="center"
                        width="80px"
                    />
                    <el-table-column label="SPU名称" prop="spuName" />
                    <el-table-column label="SPU描述" prop="description" />
                    <el-table-column label="SPU操作">
                        <!-- row即为已有的SPU对象 -->
                        <template #="{ row, $index }">
                            <el-button
                                type="primary"
                                size="small"
                                icon="Plus"
                                title="添加SKU"
                                @click="addSku"
                            ></el-button>
                            <el-button
                                @click="updateSpu(row)"
                                type="primary"
                                size="small"
                                icon="Edit"
                                title="修改SPU"
                            ></el-button>
                            <el-button
                                type="primary"
                                size="small"
                                icon="View"
                                title="查看SKU列表"
                            ></el-button>
                            <el-button
                                type="primary"
                                size="small"
                                icon="Delete"
                                title="删除SPU"
                            ></el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页器 -->
                <el-pagination
                    @size-change="changeSize"
                    @current-change="getHasSpu"
                    v-model:currentPage="pageNo"
                    :page-sizes="[3, 5, 7, 9]"
                    :page-size="pageSize"
                    layout="prev, pager, next, jumper, ->, sizes, total"
                    :total="total"
                    background
                ></el-pagination>
            </div>
            <!-- 添加SPU|修改SPU子组件 -->
            <SpuForm
                ref="spu"
                v-show="scene == 1"
                @changeScene="changeScene"
            ></SpuForm>
            <!-- 添加SKU的子组件 -->
            <SkuForm v-show="scene == 2" @changeScene="changeScene"></SkuForm>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import SpuForm from './spuForm.vue';
import SkuForm from './skuForm.vue';
import { ref, watch } from 'vue';
// 引入分类的仓库
import useCategoryStore from '@/store/modules/category';
import { reqHasSpu } from '@/api/product/spu';
import { HasSpuResponseData, Records, SpuDate } from '@/api/product/spu/type';
let categoryStore = useCategoryStore();
// 场景的数据
// 0:显示已有SPU 1:添加或者修改已有SPU 2:添加SKU的结构
let scene = ref<number>(0);
// 分页器默认页码
let pageNo = ref<number>(1);
// 每一页展示几条数据
let pageSize = ref<number>(3);
// 存储已有的SPU的数据
let records = ref<Records>([]);
// 存储已有SPU总个数
let total = ref<number>(0);
// 获取子组件实例SpuForm
let spu = ref<any>();

// 监听三级分类ID变化
watch(
    () => categoryStore.c3Id,
    () => {
        getHasSpu();
    },
);
// 此方法执行：可以获取某一个三级分类下全部的已有的SPU
const getHasSpu = async (pager = 1) => {
    // 修改当前页码
    pageNo.value = pager;
    const result: HasSpuResponseData = await reqHasSpu(
        pageNo.value,
        pageSize.value,
        categoryStore.c3Id,
    );
    if (result.code == 200) {
        records.value = result.data.records;
        total.value = result.data.total;
    }
};
// 分页器下拉菜单发生变化的时候触发
const changeSize = (size) => {
    pageSize.value = size;
    getHasSpu();
};
// 添加新的SPU按钮的回调
const addSpu = () => {
    // 切换为场景1：添加与修改已有SPU结构->SpuForm
    scene.value = 1;
    // 点击添加SPU按钮，调用子组件的方法初始化数据
    spu.value.initAddSpu(categoryStore.c3Id);
};
// 子组件SpuForm绑定自定义事件：目前是让子组件通知父组件切换场景为0
const changeScene = (obj: any) => {
    // 子组件Spuform点击取消变为场景0：展示已有的SPU
    scene.value = obj.flag;
    if (obj.params == 'update') {
        // 更新留在当前页
        getHasSpu(pageNo.value);
    } else {
        // 添加留在第一页
        getHasSpu();
    }
};
// 修改已有的SPU的按钮的回调
const updateSpu = (row: SpuDate) => {
    // 切换为场景1：添加与修改已有SPU结构->SpuForm
    scene.value = 1;
    // 调用子组件实例方法获取完整已有的SPU的数据
    spu.value.initHasSpuData(row);
};
// 添加SKU按钮的回调
const addSku = () => {
    // 点击添加SKU按钮切换场景为2
    scene.value = 2;
};
</script>

<style scoped></style>
