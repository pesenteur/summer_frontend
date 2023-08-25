<template>
    <div class="form-box register">
        <form @submit.prevent="register">
            <h2>注册</h2>
            <div class="input-box">
                <span class="icon"><i class='bx bxs-envelope'></i></span>
                <input type="text" v-model="email" required>
                <label>邮箱</label>
            </div>
            <div class="input-box">
                <span class="icon"><i class='bx bxs-user'></i></span>
                <input type="text" v-model="username" required>
                <label>用户名</label>
            </div>
            <div class="input-box">
                <span class="icon"><i class='bx bxs-id-card'></i></span>
                <input type="text" v-model="userId" required>
                <label>身份证</label>
            </div>
            <div class="input-box">
                <span class="icon"><i class='bx bxs-lock-alt'></i></span>
                <input type="password" v-model="password" required>
                <label>密码</label>
            </div>
            <div class="input-box">
                <span class="icon"><i class='bx bxs-lock-alt'></i></span>
                <input type="password" v-model="confirmedPassword" required>
                <label>确认密码</label>
                <p v-if="!isPasswordMatching" class="password-mismatch">两次密码不匹配</p>
            </div>

            <div class="remember-password">
                <label for=""><input type="checkbox" v-model="agree">我已阅读并同意《用户协议》</label>
            </div>
            <button class="btn" id="suBtn">注册</button>
            <div class="create-account">
                <p>已经有账号? <a href="#" class="login-link" @click="showLoginForm">登录</a></p>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { ElMessage } from "element-plus";
import { useAccountStore } from "@/stores/account";
import { useRoute, useRouter } from "vue-router";
const accountStore = useAccountStore();
const email = ref('');
const password = ref('');
const confirmedPassword = ref('');
const router = useRouter();
const route = useRoute();
const agree = ref(false); // 初始化为 false
const isPasswordMatching = computed(() => {
    return password.value === confirmedPassword.value;
});

async function register() {
    if (!email.value) {
        ElMessage({
            message: '请填写邮箱',
            type: 'error'
        })
        return
    }
    if (!password.value) {
        ElMessage({
            message: '请输入密码',
            type: 'error'
        })
        return
    }
    if (!confirmedPassword.value) {
        ElMessage({
            message: '请确认密码',
            type: 'error'
        });
        // 处理未同意用户协议的情况
        return
    }
    if (!agree.value) {
        ElMessage({
            message: '请勾选同意用户协议',
            type: 'error'
        });
        return
        // 处理未同意用户协议的情况
    }
    if (password.value !== confirmedPassword.value) {
        ElMessage({
            message: '两次密码不匹配',
            type: 'error'
        });

        // 处理密码不匹配的情况
        return;
    }
    try {
        // await accountStore.register(email.value, userid.value, username.value, password.value,);
        //发送注册请求到后端
        ElMessage({
            message: '注册成功，即将跳转',
            type: 'success'
        });
        setTimeout(() => {
            showLogin.value = true;
        }, 2000);
    }
    catch (error) {
        // 处理注册失败的情况
        ElMessage({
            message: '注册失败',
            type: 'error'
        });
        return
    }
};

const props = defineProps(['showValue']);
const emit = defineEmits(['update:showValue'])

const showLogin = computed({
    get() {
        return props.showValue;
    },
    set(value) {
        emit('update:showValue', value);
    }
})

const showLoginForm = () => {
    showLogin.value = true;
};
</script>

<style scoped>
.input-box input:focus~label,
.input-box input:valid~label {
    top: -5px;
}
</style>
