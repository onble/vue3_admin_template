<template>
    <div>
        <div class="login_container">
            <el-row>
                <el-col :span="12" :xs="0"></el-col>
                <el-col :span="12" :xs="24">
                    <el-form
                        class="login_form"
                        :model="loginForm"
                        :rules="rules"
                        ref="loginForms"
                    >
                        <h1>Hello</h1>
                        <h2>欢迎来到硅谷甄选</h2>
                        <el-form-item prop="username">
                            <el-input
                                :prefix-icon="User"
                                v-model="loginForm.username"
                            ></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input
                                :prefix-icon="Lock"
                                type="password"
                                v-model="loginForm.password"
                                show-password
                            ></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button
                                class="login_btn"
                                type="primary"
                                size="default"
                                @click="login"
                                :loading="loading"
                            >
                                登录
                            </el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
// 引入用户相关的小仓库
import useUserStore from '@/store/modules/user'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
// 引入获取当前时间的函数
import { getTime } from '@/utils/time'

// 获取路由器
let $router = useRouter()
let useStore = useUserStore()
// 收集账号与密码的数据
let loginForm = reactive({ username: 'admin', password: '111111' })
let loginForms = ref()
// 定义变量控制按钮加载效果
let loading = ref(false)

// 登录按钮回调
const login = async () => {
    // 保证全部表单校验通过再发请求
    // console.log(loginForms.value)
    await loginForms.value.validate()
    // 加载效果：开始加载
    loading.value = true
    // 点击登录按钮以后干什么？
    // 通知仓库发登录请求
    // 请求成功->首页展示数据的地方
    // 请求失败->弹出登录失败信息
    try {
        // 可以书写.then语法
        // 保证登录成功
        await useStore.userLogin(loginForm)
        // 编程时导航跳转到展示数据首页
        $router.push('/')
        // 登录成功提示信息
        ElNotification({
            type: 'success',
            message: '欢迎回来',
            title: `HI,${getTime()}好`,
        })
    } catch (error) {
        // 登录失败的提示信息
        ElNotification({
            type: 'error',
            message: (error as Error).message,
        })
    } finally {
        loading.value = false
    }
}

// 定义表单校验需要配置对象
const rules = {
    username: [
        {
            required: true,
            min: 6,
            max: 10,
            message: '账号长度至少六位',
            trigger: 'change',
        },
    ],
    password: [
        {
            required: true,
            min: 6,
            max: 15,
            message: '密码长度至少6位',
            trigger: 'change',
        },
    ],
}
</script>

<style scoped lang="scss">
.login_container {
    width: 100%;
    height: 100vh;
    background: url('@/assets/images/background.jpg') no-repeat;
    background-size: cover;

    .login_form {
        position: relative;
        width: 80%;
        top: 30vh;
        background: url('@/assets/images/login_form.png') no-repeat;
        background-size: cover;
        padding: 40px;
        h1 {
            color: white;
            font-size: 40px;
        }
        h2 {
            font-size: 20px;
            color: white;
            margin: 20px 0px;
        }
        .login_btn {
            width: 100%;
        }
    }
}
</style>
