<!-- eslint-disable vue/valid-attribute-name -->
<template>
    <el-card class="box-card">
        <!-- 卡片顶部添加品牌按钮 -->
        <el-button type="primary" size="default" icon="Plus">
            添加品牌
        </el-button>
        <!-- 表格组件：用于展示已有的品牌数据 -->
        <!-- 
            table
            ---border:可以设置表格纵向是否有边框
            table-column
            ---label:某一个列表
            ---width:设置这列宽度
            ---align:设置这一列对齐方式
        -->
        <el-table style="margin: 10px 0px" border :data="trademarkArr">
            <el-table-column
                label="序号"
                width="80px"
                align="center"
            ></el-table-column>
            <!-- table-column:默认展示数据用div -->
            <el-table-column label="品牌名称" prop="tmName"></el-table-column>
            <el-table-column label="品牌LOGO">
                <template #="{ row, $index }">
                    <img
                        :src="row.logoUrl"
                        style="width: 100px; height: 100px"
                    />
                </template>
            </el-table-column>
            <el-table-column label="品牌操作">
                <template #="{ row, $index }">
                    <el-button
                        type="primary"
                        size="small"
                        icon="Edit"
                    ></el-button>
                    <el-button
                        type="primary"
                        size="small"
                        icon="Delete"
                    ></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 
            分页器组件
            pageination
                v-model:current-page:设置分页器当前页码
                v-model:page-size:设置每一个展示数据条数
                page-sizes:用于设置下拉菜单数据
                backgroud:设置分页器按钮的背景颜色
                layout:可以设置分页器六个子组件布局调整
        -->
        <el-pagination
            @size-change="sizeChange"
            @current-change="currentChange"
            v-model:currentPage="pageNo"
            :page-sizes="[3, 5, 7, 9]"
            :page-size="limit"
            :background="true"
            layout="prev, pager, next, jumper, ->, sizes, total"
            :total="total"
        ></el-pagination>
    </el-card>
</template>

<script setup lang="ts">
// 引入组合式API函数ref
import { ref, onMounted } from 'vue';
import { reqHasTardemark } from '@/api/product/trademark';
// 当前页码
let pageNo = ref<number>(1);
// 每一页展示多少条数据
let limit = ref(3);
// 存储已有品牌数据总数
let total = ref<number>(0);
// 存储已有品牌的数据
let trademarkArr = ref<any>([]);
// 获取已有品牌的接口封装为一个函数：在任何情况下想获取数据，调用此函数即可
const getHasTrademark = async () => {
    const result = await reqHasTardemark(pageNo.value, limit.value);
    if (result.code == 200) {
        total.value = result.data.total;
        trademarkArr.value = result.data.records;
    }
};
// 组件挂载完毕钩子---发一次请求，获取第一页，一页三个已有品牌数据
onMounted(() => {
    getHasTrademark();
});
</script>

<style scoped></style>
