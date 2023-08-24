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
                <a href="#">Forget Password?</a>
            </div>
            <button class="btn" id="siBtn" @click="loginWithPassword">登录</button>
            <div class="create-account">
                <p>Create A New Account? <a href="#" class="login-link" @click="showRegisterForm">Sign Up</a></p>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
const email = ref('')
const password = ref('')
const agree = ref(false)

const props = defineProps(['showValue']);
const emit = defineEmits(['update:showValue'])

const showLogin = computed({
    get() {
        return props.showValue;
    },
    set(value) {
        emit('update:showValue', value);
    }
});

const userAgreement = `
    我已阅读并同意《用户协议》
`;

const showRegisterForm = () => {
    showLogin.value = false;
};

</script>

<style scoped></style>
