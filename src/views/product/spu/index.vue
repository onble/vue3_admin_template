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
                                @click="addSku(row)"
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
                                @click="findSku(row)"
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
            <SkuForm
                ref="sku"
                v-show="scene == 2"
                @changeScene="changeScene"
            ></SkuForm>
            <!-- dialog对话框：展示已有的SKU数据 -->
            <el-dialog title="SKU列表" v-model="show">
                <el-table border :data="skuArr">
                    <el-table-column
                        label="SKU名字"
                        prop="skuName"
                    ></el-table-column>
                    <el-table-column
                        label="SKU价格"
                        prop="price"
                    ></el-table-column>
                    <el-table-column
                        label="SKU重量"
                        prop="weight"
                    ></el-table-column>
                    <el-table-column label="SKU图片">
                        <template #="{ row, $index }">
                            <img
                                :src="row.skuDefaultImg"
                                style="width: 100px; height: 100px"
                            />
                        </template>
                    </el-table-column>
                </el-table>
            </el-dialog>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import SpuForm from './spuForm.vue';
import SkuForm from './skuForm.vue';
import { ref, watch } from 'vue';
// 引入分类的仓库
import useCategoryStore from '@/store/modules/category';
import { reqHasSpu, reqSkuList } from '@/api/product/spu';
import {
    HasSpuResponseData,
    Records,
    SpuDate,
    SkuInfoData,
    SkuData,
} from '@/api/product/spu/type';
import { onMounted } from 'vue';
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
// 获取子组件实例SkuForm
let sku = ref<any>();
// 存储全部的SKU数据
let skuArr = ref<SkuData[]>([]);
let show = ref<boolean>(false);
// 监听三级分类ID变化
watch(
    () => categoryStore.c3Id,
    () => {
        getHasSpu();
    },
);
onMounted(() => {
    if (categoryStore.c3Id != '') {
        getHasSpu();
    }
});
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
        records.value = [...result.data.records];
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
const addSku = (row: SpuDate) => {
    // 点击添加SKU按钮切换场景为2
    scene.value = 2;
    // 调用子组件的方法初始化添加SKU的数据
    sku.value.initSkuData(categoryStore.c1Id, categoryStore.c2Id, row);
};
// 查看SKU列表的数据
const findSku = async (row: SpuDate) => {
    const result: SkuInfoData = await reqSkuList(row.id as number);
    if (result.code == 200) {
        skuArr.value = result.data;
        // 对话框显示出来
        show.value = true;
    }
};
</script>

<style scoped></style>
