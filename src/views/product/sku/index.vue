<!-- eslint-disable vue/valid-attribute-name -->
<template>
    <el-card>
        <el-table :data="skuArr" border style="margin: 10px 0px">
            <el-table-column
                label="序号"
                type="index"
                align="center"
                width="80px"
            ></el-table-column>
            <el-table-column
                label="名称"
                show-overflow-tooltip
                width="150px"
                prop="skuName"
            ></el-table-column>
            <el-table-column
                label="描述"
                show-overflow-tooltip
                width="150px"
                prop="skuDesc"
            ></el-table-column>
            <el-table-column label="图片" width="150px">
                <template #="{ row, $index }">
                    <img :src="row.skuDefaultImg" class="img-size" />
                </template>
            </el-table-column>
            <el-table-column
                label="重量"
                width="150px"
                prop="weight"
            ></el-table-column>
            <el-table-column
                label="价格"
                width="150px"
                prop="price"
            ></el-table-column>
            <el-table-column label="操作" width="250px" fixed="right">
                <template #="{ row, $index }">
                    <el-button
                        type="primary"
                        size="small"
                        icon="Top"
                    ></el-button>
                    <el-button
                        type="primary"
                        size="small"
                        icon="Edit"
                    ></el-button>
                    <el-button
                        type="primary"
                        size="small"
                        icon="InfoFilled"
                    ></el-button>
                    <el-button
                        type="primary"
                        size="small"
                        icon="Delete"
                    ></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handler"
            @current-change="getHasSku"
            v-model:currentPage="pageNo"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize"
            layout="prev, pager, next, jumper,->,sizes,total"
            :total="total"
            background
            :pager-count="7"
        ></el-pagination>
    </el-card>
</template>

<script setup lang="ts">
import { reqSkuList } from '@/api/product/sku';
import { SkuResponseData } from '@/api/product/sku/type';
import { SkuData } from '@/api/product/spu/type';
import { ref, onMounted } from 'vue';
// 分页器当前页码
let pageNo = ref<number>(1);
// 每一页展示几条数据
let pageSize = ref<number>(10);
let total = ref<number>(0);
let skuArr = ref<SkuData[]>([]);
// 组件挂载完毕
onMounted(() => {
    getHasSku();
});
const getHasSku = async (pager = 1) => {
    // 当前分页器的页码
    pageNo.value = pager;
    const result: SkuResponseData = await reqSkuList(
        pageNo.value,
        pageSize.value,
    );
    if (result.code == 200) {
        total.value = result.data.total;
        skuArr.value = result.data.records;
    }
};
// 分页器下拉菜单发生变化触发
const handler = (Size: number) => {
    pageSize.value = Size;
    getHasSku();
};
</script>

<style scoped>
.img-size {
    width: 100px;
    height: 100px;
}
</style>
