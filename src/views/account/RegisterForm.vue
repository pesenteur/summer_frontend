<template>
    <div class="form-box register">
        <form @submit.prevent="register">
            <div class="input-box">
                <span class="icon"><i class='bx bxs-envelope'></i></span>
                <input type="text" v-model="email" required>
                <label>Email</label>
            </div>
            <div class="input-box">
                <span class="icon"><i class='bx bxs-lock-alt'></i></span>
                <input type="password" v-model="password" required>
                <label>Password</label>
            </div>
            <div class="remember-password">
                <label for=""><input type="checkbox" v-model="agree">我已阅读并同意《用户协议》</label>
            </div>
            <button class="btn" id="suBtn">注册</button>
            <div class="create-account">
                <p>Already Have An Account? <a href="#" class="login-link">Sign In</a></p>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const email = ref('');
const password = ref('');
const agree = ref('');

const register = () => {
    console.log(username.value)
    // 在这里可以访问 username.value, email.value, password.value 和 agree.value
    // 处理注册逻辑
};
</script>

<style scoped></style>
