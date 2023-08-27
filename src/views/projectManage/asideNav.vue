<template>
    <div class="shell">
        <a href="#" class="box"><i class="iconfont icon-liebiao"></i><span>工作项 </span></a>
        <a href="#" class="box"><i class="iconfont icon-cangku"></i><span> 项目</span></a>
        <a href="#" class="box"><i class="iconfont icon-zhuti_tiaosepan"></i><span>theme</span></a>
        <a href="#" class="box"><i class="iconfont icon-qianbao"></i><span>全部项目</span></a>
        <a href="#" class="box"><i class="iconfont icon-tupian"></i><span>项目视图</span></a>
        <a href="#" class="box"><i class="iconfont icon-erweima"></i><span>回收站</span></a>
        <a href="#" class="box"><i class="iconfont icon-dunpaibaoxianrenzheng"></i><span>authentication</span></a>
        <a href="#" class="box"><i class="iconfont icon-dengchu"></i><span>cancellation</span></a>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const isSidebarClosed = ref(false);
const menuItems = [
    {
        name: 'Dashboard',
        icon: 'bx bx-grid-alt',
        subMenu: ['Category'],
        showSubMenu: false
    },
    {
        name: 'Category',
        icon: 'bx bx-collection',
        subMenu: ['Category', 'HTML & CSS', 'JavaScript', 'PHP & MySQL'],
        showSubMenu: false
    },
    // Add more menu items here
];

const toggleSubMenu = (index) => {
    menuItems[index].showSubMenu = !menuItems[index].showSubMenu;
};

const toggleSidebar = () => {
    isSidebarClosed.value = !isSidebarClosed.value;
};
</script>
<style scoped>
* {
    padding: 0;
    margin: 0;
    text-decoration: none;
}

body {
    background-color: rgb(209, 213, 219);
    display: flex;
    justify-content: space-evenly;
    height: 100vh;
    align-items: center;
}

.shell {
    width: 100px;
    height: 700px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: white;
    ;
    border-radius: 10px;
    transition: .3s;
    overflow: hidden;
}

.box {
    display: block;
    height: 15%;
    width: 85%;
    margin: 9px;
    border-radius: 5px;
    position: relative;
    transition: .3s;
    color: black;
}

.box i {
    font-size: 60px;
    position: absolute;
    margin: 7px 0 0 13px;
}

.box:nth-child(1)::before,
.box:nth-child(5)::before {
    content: '';
    display: block;
    width: 100%;
    height: 2px;
    background-color: rgb(55, 65, 81);
    position: absolute;
    bottom: -10px;
}

.box span {
    position: relative;
    top: 22px;
    left: 80px;
    font: 500 20px '';
    opacity: 0;
    transition: .1s;
}

.shell:hover {
    width: 270px;
}

.box:hover {
    background-color: rgb(55, 65, 81);
}

.shell:hover span {
    opacity: 1;
}

.box:hover {
    color: #fff;
}
</style>