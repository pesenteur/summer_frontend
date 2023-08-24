<template>
    <div class="form-box login">
        <form @submit.prevent="login">
            <div class="input-box">
                <span class="icon"><i class='bx bxs-envelope'></i></span>
                <input type="text" v-model="email" id="su_email" required>
                <label>Email</label>
            </div>
            <div class="input-box">
                <span class="icon"><i class='bx bxs-lock-alt'></i></span>
                <input type="password" v-model="password" id="su_password" required>
                <label>Password</label>
            </div>
            <div class="remember-password">
                <label for=""><input type="checkbox" v-model="agree">{{ userAgreement }}</label>
                <a href="#">Forget Password</a>
            </div>
            <button class="btn" id="siBtn" @click="loginWithPassword">登录</button>
            <div class="create-account">
                <p>Create A New Account? <a href="#" class="login-link">Sign Up</a></p>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { useAccountStore } from "@/stores/account";
const email = ref('')
const password = ref('')
const agree = ref(false)
const accountStore = useAccountStore();

const userAgreement = `
    我已阅读并同意《用户协议》
`;
async function loginWithPassword() {
    if (!email.value) {
        ElMessage({
            message: '请输入邮箱',
            type: 'error'
        });
        return;
    }
    if (!password.value) {
        ElMessage({
            message: '请输入密码',
            type: 'error'
        });
        return;
    }
    if (!agree.value) {
        ElMessage({
            message: '请勾选同意用户协议',
            type: 'error'
        });
        return;
    }
    try {
        await accountStore.loginWithPassword(email.value, password.value);
        ElMessage({
            message: '登录成功，即将跳转',
            type: 'success'
        });
        setTimeout(() => {
            if (route.query.redirect) {
                router.push(route.query.redirect);
            } else {
                router.push('/');
            }
        }, 2000);
    } catch (error) {
        ElMessage({
            message: error,
            type: 'error'
        });
    }
}

</script>

<style scoped>
</style>
