<!-- eslint-disable vue/valid-attribute-name -->
<template>
    <el-form label-width="120px">
        <el-form-item label="SPU名称">
            <el-input
                placeholder="请你输入SPU名称"
                v-model="SpuParams.spuName"
            ></el-input>
        </el-form-item>
        <el-form-item label="SPU品牌">
            <el-select style="width: 240px" v-model="SpuParams.tmId">
                <el-option
                    v-for="item in AllTradeMarks"
                    :key="item.id"
                    :label="item.tmName"
                    :value="item.id"
                ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item lable="SPU描述">
            <el-input
                type="textarea"
                palceholder="请你输入SPU描述"
                v-model="SpuParams.description"
            ></el-input>
        </el-form-item>
        <el-form-item label="SPU图标">
            <!-- v-model:fileList->展示默认图片 -->
            <el-upload
                v-model:file-list="imgList"
                action="/api/admin/product/fileUpload"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :before-upload="handlerUpload"
            >
                <el-icon><Plus /></el-icon>
            </el-upload>

            <el-dialog v-model="dialogVisible">
                <img
                    w-full
                    :src="dialogImageUrl"
                    alt="Preview Image"
                    style="width: 100%; height: 100%"
                />
            </el-dialog>
        </el-form-item>
        <el-form-item label="SPU销售属性">
            <!-- 展示 销售属性的下拉菜单 -->
            <el-select style="width: 240px">
                <el-option lable="华为"></el-option>
                <el-option lable="oppo"></el-option>
                <el-option lable="vivo"></el-option>
            </el-select>
            <el-button
                style="margin-left: 10px"
                type="primary"
                size="default"
                icon="Plus"
            >
                添加属性值
            </el-button>
            <!-- table展示销售属性与属性值的地方 -->
            <el-table border style="margin: 10px 0px" :data="saleAttr">
                <el-table-column
                    label="序号"
                    type="index"
                    align="center"
                    width="80px"
                />
                <el-table-column
                    prop="saleAttrName"
                    label="销售属性名字"
                    width="120px"
                ></el-table-column>
                <el-table-column label="销售属性值">
                    <!-- row:即为当前SPU已有的销售属性对象 -->
                    <template #="{ row, $index }">
                        <el-tag
                            v-for="item in row.spuSaleAttrValueList"
                            :key="item.id"
                            class="mx-1"
                            closable
                            style="margin: 0px 5px"
                        >
                            {{ item.saleAttrValueName }}
                        </el-tag>
                        <el-button
                            type="primary"
                            size="small"
                            icon="Plus"
                        ></el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="120px">
                    <template #="{ row, $index }">
                        <el-button
                            type="primary"
                            size="small"
                            icon="Delete"
                            @click="saleAttr.splice($index, 1)"
                        ></el-button>
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
import {
    reqAllSaleAttr,
    reqAllTradeMark,
    reqSpuHasSaleAttr,
    reqSpuImageList,
} from '@/api/product/spu';
import {
    AllTrademark,
    HasSaleAttr,
    HasSaleAttrResponseData,
    SaleAttr,
    SaleAttrReaponseData,
    SpuDate,
    SpuHasImg,
    SpuImg,
    Trademark,
} from '@/api/product/spu/type';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';

let $emit = defineEmits(['changeScene']);
// 点击取消按钮：通知父组件切换场景为1，展示有的SPU的数据
// 存储已有的SPU这些数据
let AllTradeMarks = ref<Trademark[]>([]);
// 商品图片
let imgList = ref<SpuImg[]>([]);
// 已有的SPU销售属性
let saleAttr = ref<SaleAttr[]>([]);
// 全部销售属性
let allSaleAttr = ref<HasSaleAttr>([]);
// 存储已有的SPU对象
let SpuParams = ref<SpuDate>({
    category3Id: '', // 收集三级分类的ID
    spuName: '', // SPU的名字
    description: '', // SPU的描述
    tmId: '', // 品牌的ID
    spuImageList: [],
    spuSaleAttrList: [],
});
// 控制对话框的显示与隐藏
let dialogVisible = ref<boolean>(false);
// 存储预览图片地址
let dialogImageUrl = ref<string>('');
const cancel = () => {
    $emit('changeScene', 0);
};
// 子组件书写一个方法
const initHasSpuData = async (spu: SpuDate) => {
    // 存储已有的SPU对象，将来在模板中展示
    SpuParams.value = spu;
    // spu：即为父组件传递过来的已有的SPU对象[不完整]
    // 获取全部品牌的数据
    const result: AllTrademark = await reqAllTradeMark();
    // 获取某一个品牌下全部售卖商品的图片
    const result1: SpuHasImg = await reqSpuImageList(spu.id as number);
    // 获取已有的SPu销售属性的数据
    const result2: SaleAttrReaponseData = await reqSpuHasSaleAttr(
        spu.id as number,
    );
    // 获取整个项目全部SPU的销售属性
    const result3: HasSaleAttrResponseData = await reqAllSaleAttr();

    // 存储全部品牌的数据
    AllTradeMarks.value = result.data;
    // SPU对应商品图片
    imgList.value = result1.data.map((item) => {
        return {
            name: item.imgName,
            url: item.imgUrl,
        };
    });
    // 存储已有的SPU的销售属性
    saleAttr.value = result2.data;
    // 存储全部的销售属性
    allSaleAttr.value = result3.data;
};
// 照片墙点击预览按钮的时候触发的钩子
const handlePictureCardPreview = (file: any) => {
    dialogImageUrl.value = file.url;
    // 对话框弹出来
    dialogVisible.value = true;
};
// 照片墙上传成功之前的钩子约束文件的大小与类型
const handlerUpload = (file: any) => {
    if (
        file.type == 'image/png' ||
        file.type == 'image/jpeg' ||
        file.type == 'image/gif'
    ) {
        if (file.size / 1024 / 1024 < 3) {
            return true;
        } else {
            ElMessage({
                type: 'error',
                message: '上传文件务必小于3M',
            });
            return false;
        }
    } else {
        ElMessage({
            type: 'error',
            message: '上传文件类型务必为PNG|JPG|GIF',
        });
        return false;
    }
};
// 对外暴露
defineExpose({ initHasSpuData });
</script>

<style scoped></style>
