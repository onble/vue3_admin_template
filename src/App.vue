<template>
    <div>
        <h1>测试代码</h1>
    </div>
</template>

<script setup lang="ts">
import request from '@/utils/request'
import { onMounted } from 'vue'
import { reqLogin } from './api/user'
// 当组件挂在完毕测试发一个请求
onMounted(() => {
    /* request({
        url: '/user/login',
        method: 'post',
        data: {
            username: 'admin',
            password: '111111',
        },
    }).then((res) => {
        console.log(res)
    }) */

    reqLogin({ username: 'admin', password: '111111' })
})
</script>

<style scoped lang="scss">
div {
    h1 {
        color: $color;
    }
}
</style>
