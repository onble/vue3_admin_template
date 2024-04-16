<!-- eslint-disable vue/valid-attribute-name -->
<template>
    <div>
        <el-card class="box-card">
            <!-- 卡片顶部添加品牌按钮 -->
            <el-button
                type="primary"
                size="default"
                icon="Plus"
                @click="addTrademark"
            >
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
                <el-table-column
                    label="品牌名称"
                    prop="tmName"
                ></el-table-column>
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
                            @click="updateTrademark"
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
                @current-change="getHasTrademark"
                v-model:currentPage="pageNo"
                :page-sizes="[3, 5, 7, 9]"
                :page-size="limit"
                :background="true"
                layout="prev, pager, next, jumper, ->, sizes, total"
                :total="total"
                :pager-count="9"
            ></el-pagination>
        </el-card>
        <!-- 对话框嘴贱：在添加品牌与修改已有品牌的业务时候使用结构 -->
        <!-- 
            v-model:属性用户控制对话框的显示与隐藏的 true显示 false隐藏
            title:设置对话框左上角标题
        -->
        <el-dialog title="添加品牌" v-model="dialogFormVisible">
            <el-form style="width: 80%">
                <el-form-item label="品牌名称" label-width="80px">
                    <el-input placeholder="请您输入品牌名称"></el-input>
                </el-form-item>
                <el-form-item label="品牌LOGO" label-width="80px">
                    <el-upload
                        class="avatar-uploader"
                        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                    >
                        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
            </el-form>
            <!-- 具名插槽:footer -->
            <template #footer>
                <el-button type="primary" size="default" @click="cancel">
                    取消
                </el-button>
                <el-button type="primary" size="default" @click="confirm">
                    确定
                </el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
// 引入组合式API函数ref
import { ref, onMounted } from 'vue';
import { reqHasTardemark } from '@/api/product/trademark';
import type {
    Records,
    TradeMarkResponseData,
} from '@/api/product/trademark/type';
// 当前页码
let pageNo = ref<number>(1);
// 每一页展示多少条数据
let limit = ref<number>(3);
// 存储已有品牌数据总数
let total = ref<number>(0);
// 存储已有品牌的数据
let trademarkArr = ref<Records>([]);
// 控制对话框显示与隐藏
let dialogFormVisible = ref<boolean>(false);
// 获取已有品牌的接口封装为一个函数：在任何情况下想获取数据，调用此函数即可
const getHasTrademark = async (pager = 1) => {
    pageNo.value = pager;
    const result: TradeMarkResponseData = await reqHasTardemark(
        pageNo.value,
        limit.value,
    );
    if (result.code == 200) {
        total.value = result.data.total;
        trademarkArr.value = result.data.records;
    }
};
// 分页器当前页码发生变化的时候会触发
// 对于当前页码发生变化自定义事件，组件pagination父组件回传了数据(当前的页码)
// const changePageNo = () => {
//     // 当前页码发生变化的时候再次发请求获取对应已有品牌数据展示
//     getHasTrademark();
// };
// 组件挂载完毕钩子---发一次请求，获取第一页，一页三个已有品牌数据
const sizeChange = (size) => {
    // 当前每一页的数据量发生变化的时候，当前页码归1
    limit.value = size;
    getHasTrademark();
};
// 添加品牌按钮的回调
const addTrademark = () => {
    // 对话框显示
    dialogFormVisible.value = true;
};
// 修改已有品牌的是按钮的回调
const updateTrademark = () => {
    // 对话框显示
    dialogFormVisible.value = true;
};
// 对话框底部取消按钮
const cancel = () => {
    // 对话框隐藏
    dialogFormVisible.value = false;
};
const confirm = () => {
    // 对话框隐藏
    dialogFormVisible.value = false;
};
onMounted(() => {
    getHasTrademark();
});
</script>

<style scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>
