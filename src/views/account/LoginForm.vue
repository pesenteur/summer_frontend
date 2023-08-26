<template>
    <div class="form-box login">
        <form @submit.prevent="loginWithPassword">
            <h2>登录</h2>
            <div class="input-box">
                <span class="icon"><i class='bx bxs-envelope'></i></span>
                <input type="text" v-model="email" id="su_email" required>
                <label>邮箱/用户名</label>
            </div>
            <div class="input-box">
                <span class="icon"><i class='bx bxs-lock-alt'></i></span>
                <input type="password" v-model="password" id="su_password" required>
                <label>密码</label>
            </div>
            <div class="remember-password">
                <label for=""><input type="checkbox" v-model="agree">{{ userAgreement }}</label>
                <a href="#">忘记密码?</a>
            </div>
            <button class="btn" id="siBtn">登录</button>
            <div class="create-account">
                <p>创建新账号? <a href="#" class="login-link" @click="showRegisterForm">注册</a></p>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useAccountStore } from "@/stores/account";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
const email = ref('')
const password = ref('')
const agree = ref(false)
const accountStore = useAccountStore();
const router = useRouter();
const route = useRoute();
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

async function loginWithPassword() {
    if (!email.value) {
        ElMessage({
            message: '请输入邮箱/用户名',
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
.header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 25px 13%;
    background: transparent;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 100;

}

.navbar a {
    position: relative;
    font-size: 16px;
    color: black;
    margin-right: 30px;
    text-decoration: none;
}

.navbar a::after {
    content: "";
    position: absolute;
    left: 0;
    width: 100%;
    height: 2px;
    background: black;
    bottom: -5px;
    border-radius: 5px;
    transform: translateY(10px);
    opacity: 0;
    transition: .5s ease;
}

.navbar a:hover:after {
    transform: translateY(0);
    opacity: 1;
}

.search-bar {
    width: 250px;
    height: 45px;
    background-color: transparent;
    border: 2px solid black;
    border-radius: 6px;
    display: flex;
    align-items: center;
}

.search-bar input {
    width: 100%;
    background-color: transparent;
    border: none;
    outline: none;
    color: black;
    font-size: 16px;
    padding-left: 10px;
}

.search-bar button {
    width: 40px;
    height: 100%;
    background: transparent;
    outline: none;
    border: none;
    color: black;
    cursor: pointer;
}

.search-bar input::placeholder {
    color: black;
}

.search-bar button i {
    font-size: 22px;
}

.container {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 75%;
    height: 600px;
    margin-top: 20px;
    background: url(../../assets/background.jpg) no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 20px;
    overflow: hidden;


}

.item {
    position: absolute;
    top: 0;
    left: 0;
    width: 58%;
    height: 100%;
    color: black;
    background: transparent;
    padding: 80px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;

}

.item .logo {
    color: black;
    font-size: 30px;

}

.text-item h2 {
    font-size: 40px;
    line-height: 1;
}

.text-item p {
    font-size: 16px;
    margin: 20px 0;
}

.social-icon a i {
    color: black;
    font-size: 24px;
    margin-left: 10px;
    cursor: pointer;
    transition: .5s ease;
}

.social-icon a:hover i {
    transform: scale(1.2);
}

.container .login-section {
    position: absolute;
    top: 0;
    right: 0;
    /* width: calc(100% - 58%); */
    width: 40%;
    height: 100%;
    color: black;
    backdrop-filter: blur(10px);
}

.login-section .form-box {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

}

.v-enter-active {
    transition: transform .6s ease;
    transition-delay: 0.7s;
}

.v-enter-from {
    transform: translateX(430px);
}

.v-enter-to {
    transform: translateX(0);
}

.v-leave-active {
    transition: transform .6s ease;
}

.v-leave-from {
    transform: translateX(0);
}

.v-leave-to {
    transform: translateX(430px);
}

.login-section .form-box h2 {
    text-align: center;
    font-size: 25px;
}

.form-box .input-box {
    width: 340px;
    height: 50px;
    border-bottom: 2px solid black;
    margin: 30px 0;
    position: relative;
}

.input-box input {
    width: 100%;
    height: 100%;
    background: transparent;
    border: none;
    outline: none;
    font-size: 16px;
    padding-right: 28px;


}

.input-box label {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    font-size: 16px;
    font-weight: 600px;
    pointer-events: none;
    transition: .5s ease;

}

.input-box .icon {
    position: absolute;
    top: 13px;
    right: 0;
    font-size: 19px;
}

.input-box input:focus~label,
.input-box input:valid~label {
    top: -5px;
}

.remember-password {
    font-size: 14px;
    font-weight: 500;
    margin: -15px 0 15px;
    display: flex;
    justify-content: space-between;
}

.remember-password label input {
    accent-color: black;
    margin-right: 3px;

}

.remember-password a {
    color: black;
    text-decoration: none;
}

.remember-password a:hover {
    text-decoration: underline;
}

.btn {
    background: black;
    width: 100%;
    height: 45px;
    outline: none;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background: black;
    font-size: 16px;
    color: white;
    box-shadow: rgba(0, 0, 0, 0.4);

}

.create-account {
    font-size: 14.5px;
    text-align: center;
    margin: 25px;
}

.create-account p a {
    color: black;
    font-weight: 600px;
    text-decoration: none;
}

.create-account p a:hover {
    text-decoration: underline;
}
.password-mismatch {
    color: red;
    font-size: 12px;
    margin-top: 0px;
}
</style>

