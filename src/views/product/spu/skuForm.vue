<!-- eslint-disable vue/valid-attribute-name -->
<template>
    <el-form label-width="100px">
        <el-form-item label="SKU名称">
            <el-input placeholder="SKU名称"></el-input>
        </el-form-item>
        <el-form-item label="价格(元)">
            <el-input placeholder="价格(元)" type="number"></el-input>
        </el-form-item>
        <el-form-item label="重量(g)">
            <el-input placeholder="重量(g)" type="number"></el-input>
        </el-form-item>
        <el-form-item label="SKU描述">
            <el-input placeholder="SKU描述" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="平台属性">
            <el-form :inline="true">
                <el-form-item
                    v-for="item in attrArr"
                    :key="item.id"
                    :label="item.attrName"
                >
                    <el-select style="width: 240px">
                        <el-option
                            v-for="attrValue in item.attrValueList"
                            :key="attrValue.id"
                            :label="attrValue.valueName"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-form-item>
        <el-form-item label="销售属性">
            <el-form :inline="true">
                <el-form-item
                    :label="item.saleAttrName"
                    v-for="item in saleArr"
                    :key="item.id"
                >
                    <el-select style="width: 240px">
                        <el-option
                            v-for="saleAttrValue in item.spuSaleAttrValueList"
                            :key="saleAttrValue.id"
                            :label="saleAttrValue.saleAttrValueName"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-form-item>
        <el-form-item label="图片名称">
            <el-table border :data="imgArr">
                <el-table-column type="selection" width="80px" align="center" />
                <el-table-column label="图片">
                    <template #="{ row, $index }">
                        <img class="imgs" :src="row.imgUrl" />
                    </template>
                </el-table-column>
                <el-table-column label="名称" prop="imgName"></el-table-column>
                <el-table-column label="操作">
                    <template #="{ row, $index }">
                        <el-button type="primary" size="small">
                            设置默认
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" size="default">保存</el-button>
            <el-button type="primary" size="default" @click="cancel">
                取消
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
// 自定义事件的方法
let $emit = defineEmits(['changeScene']);
// 引入请求API
import { reqAttr } from '@/api/product/attr';
import { reqSpuImageList, reqSpuHasSaleAttr } from '@/api/product/spu';
import { ref } from 'vue';
// 取消按钮的回调
const cancel = () => {
    $emit('changeScene', { flag: 0, params: '' });
};
// 平台属性
let attrArr = ref<any>([]);
// 销售属性
let saleArr = ref<any>([]);
// 照片的数据
let imgArr = ref<any>([]);
// 当前子组件的方法对外暴露
const initSkuData = async (
    c1Id: number | string,
    c2Id: number | string,
    spu: any,
) => {
    // 获取平台属性
    const result: any = await reqAttr(c1Id, c2Id, spu.category3Id);
    // 获取对应的销售属性
    const result1: any = await reqSpuHasSaleAttr(spu.id);
    // 获取照片墙的数据
    const result2: any = await reqSpuImageList(spu.id);
    // 平台属性
    attrArr.value = result.data;
    // 销售属性
    saleArr.value = result1.data;
    // 图片
    imgArr.value = result2.data;
};
// 对外暴露方法
defineExpose({
    initSkuData,
});
</script>

<style scoped>
.imgs {
    width: 100px;
    height: 100px;
}
</style>
