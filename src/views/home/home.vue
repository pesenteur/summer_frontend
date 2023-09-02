<template>
    <div class="header">
        <a href="" class="logo" id="logo">SUMMER</a>
        <ul>
          <li> <router-link to="/login" class="btn btn-floating"><strong>登录/注册</strong></router-link></li>
        </ul>
    </div>
    <div class="container">
        <section id="img-one" class="img">
            <div class="text-box">
                <div class="cnt">
                    <div class="text-container">
                        <div class="text-content">
                            <h2>欢迎来到SUMMER，在这里您可以</h2>
                            <p>肆意地发挥自己的才能，让生产力最大化</p>
                        </div>
                        <router-link to="/login" class="btn btn-floating"><strong>Let's try!</strong></router-link>
                    </div>

                </div>
            </div>
        </section>
        <section class="content-one">
            <div class="text-box-detail">
                <div class="cnt">
                    <h2>让团队梦想成真，从这里开始</h2>
                    <p>
                        在这里，您可以方便地管理自己的团队
                    </p>
                    <p>
                      <router-link to="/login" class="btn btn-floating"> <strong>TRY</strong></router-link>
                    </p>
                </div>
                <div class="image-box">
                    <img src="@/assets/团队管理.jpg" alt="Image" />
                </div>
            </div>
        </section>
        <section class="content-two">
          <div class="text-box-detail">
            <div class="image-box-2">
              <img src="@/assets/imgs/聊天室.jpg" alt="Image" />
            </div>
            <div class="cnt">
              <h2>实时聊天，让团队沟通更加高效</h2>
              <p>
                在这里，您可以与您的队友实时畅聊，让思想的交汇不再有阻隔
              </p>
              <p>
                <router-link to="/login" class="btn btn-floating"> <strong>TRY</strong></router-link>
              </p>
            </div>

          </div>
        </section>

        <section class="content-one">
          <div class="text-box-detail">
<!--            <div class="image-box-2">-->
<!--              <img src="@/assets/imgs/background2.png" alt="Image" />-->
<!--            </div>-->
            <div class="cnt">
              <h2>项目管理，井井有条，办公更加专注</h2>
              <p>
                在这里，您可以专注于项目，实现高效办公
              </p>
              <p>
                <router-link to="/login" class="btn btn-floating"> <strong>TRY</strong></router-link>
              </p>
            </div>
            <div class="image-box-2">
              <img src="@/assets/imgs/项目管理.png" alt="Image" />
            </div>

          </div>
        </section>

        <section class="content-two">
            <div class="text-box-detail">
                <div class="image-box-2">
                    <img src="@/assets/imgs/原型设计.png" alt="Image" />
                </div>
                <div class="cnt">
                    <h2>创意无限，设计从这里开始</h2>
                    <p>
                      在这里，您可以发挥您的创造力，打造出独一无二的优质内容
                    </p>
                    <p>
                      <router-link to="/login" class="btn btn-floating"> <strong>TRY</strong></router-link>
                    </p>
                </div>

            </div>
        </section>
        <section class="content-three">
            <div class="text-box-detail">
                <div class="cnt">
                    <h2>文档共享，办公合作更高效</h2>
                    <p>
                      在这里，您可以实时共享文档编辑，多人协作更加快捷
                    </p>
                    <p>
                      <router-link to="/login" class="btn btn-floating"> <strong>TRY</strong></router-link>
                    </p>
                </div>
                <div class="image-box">
                    <img src="@/assets/imgs/共享文档.png" alt="Image" />
                </div>
            </div>
        </section>
        <section id="img-two" class="img">
          <h2>2023小学期软工开发小组</h2>
        </section>
<!--        <section >-->
<!--          <h1>关于我们</h1>-->
<!--          <br/>-->
<!--          <h2>2023小学期软工开发小组</h2>-->
<!--          <br/>-->
<!--          <h3>-->
<!--            小组成员-->
<!--          </h3>-->
<!--        </section>-->
    </div>
</template>
<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
</script>
<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    overflow-x: hidden;
}

.header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 30px 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 100;
}

.header .logo {
    color: white;
    text-decoration: none;
    font-size: 2em;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
}

.header ul {
    display: flex;
    justify-content: center;
    align-items: center;
}

ul {
    list-style: none !important;
}

.header ul li {
    list-style: none;
    margin-left: 20px;
}

.header ul li a {
    text-decoration: none;
    color: white;
    padding: 6px 25px;
    border-radius: 20px;
}

.header ul li a:hover {
    background-color: #fff;
    color: #000;
}

.container {
    height: auto;

}

section,
#footer {
    height: 100vh;
    position: relative;
    color: rgba(255, 255, 255, .8);
    font-size: 10vh;
    /* 设置字体 */
    font-family: 'modern_no._20regular',
        serif;
    /* 文字阴影 */
    text-shadow: 4px 4px rgb(46, 43, 43);
    /* 弹性布局 */
    display: flex;
    /* 水平居中 */
    justify-content: center;
    /* 垂直居中 */
    align-items: center;
}

#footer {
    background-color: #c0b5aa;
    height: 50vh;
    color: #fff;
    font-size: 20vh;
}

.img {
    overflow: hidden;
    /* 背景图片不重复 */
    background-repeat: no-repeat;
    /* 背景图片位置：居中 */
    background-position: center;
    /* 背景图片固定 */
    background-attachment: fixed;
    background-size: cover;
    /* 禁止用户误选中 */
    user-select: none;

}


#img-one {
    background-image: url(./img/img2.jpg);
    background-size: cover;
}

#img-two {
    background-image: url(./img/img4.jpg);
    font-size: 20px;
}

.content-one {
    background: url(./img/img1.jpg) no-repeat fixed center;
    background-size: cover;
}

.content-two {
    background: url(./img/img2.jpg) no-repeat fixed center;
    background-size: cover;
}

.content-three {
    background: url(./img/img3.jpg) no-repeat fixed center;
    background-size: cover;
}

.text-box {
    width: 100%;
    height: 40%;
    /* 绝对定位 */
    position: absolute;
    bottom: 25%;
    /* 文字居中 */
    text-align: center;
    /* background-color: rgba(0, 0, 0, .3); */
    /* 旋转中心 */
    /* transform-origin: center bottom; */
    /* 扭曲斜切 */
}

.text-box-detail {
    width: 80%;
    height: 60%;
    /* 绝对定位 */
    position: absolute;
    bottom: 25%;
    /* 文字居中 */
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* background-color: rgba(0, 0, 0, .3); */
    /* 旋转中心 */
    /* transform-origin: center bottom; */
    /* 扭曲斜切 */
    /* transform: skew(0, -8deg); */
}

.text-box .cnt {
    display: inline-block;
    text-align: left;
    margin: 40px 0 10px;
    width: 100%;
    max-width: 1200px;
    transform-origin: right bottom;
}

.text-box-detail .cnt {
    display: inline-block;
    text-align: left;
    margin: 40px 0 10px;
    width: 100%;
    max-width: 1200px;
    transform-origin: right bottom;
}

.cnt h2 {
    font-size: 50px;
    font-family: 'modern_no._20regular', serif;
    text-shadow: 1px 0px 0px #323232;
    /* 大写字母 */
    text-transform: uppercase;
    color: #fff;
    margin-bottom: 5px;
}

.text-box p {
    font-size: 40px;
    margin-left: 50px;
    line-height: 1.7;
    margin-bottom: 10px;
    color: #fff;
}

.text-box-detail p {
    font-size: 40px;
    line-height: 1.7;
    margin-bottom: 10px;
    color: #fff;
}

.text-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    /* 将内容和按钮在底部对齐 */
    height: 100%;
    /* 占据整个高度 */
    /* 垂直居中对齐文本和按钮 */
}

.text-content {
    flex: 1;
    /* 自动填充剩余空间，使按钮在右侧 */
}

.cnt .btn {
    font-size: 40px;
    text-shadow: 1px 0px 0px black;
    display: inline-block;
    background-color: #000 !important;
    color: #fff;
    border: 3px solid #000;
    white-space: nowrap;
    text-decoration: none;
    border-radius: 10px;
    padding: 0 20px;
    margin-left: 50px;
    margin-top: 50px;

}

.btn-floating {
    position: relative;
    transition: transform 0.3s;
}

.btn-floating:hover {
    transform: translateY(-5px);
}

.image-box img {
    width: 105%;
    /* 图片宽度不超过容器宽度 */
    /* 根据宽度自适应高度 */
    margin-left: 80px;
    border-radius: 10px;
    /* 其他样式设置 */
    /* ... */
}

.image-box-2 img {
    width: 100%;
    margin-right: 100px;
    padding: 0px;
    /* 图片宽度不超过容器宽度 */
    /* 根据宽度自适应高度 */
    border-radius: 10px;
    /* 其他样式设置 */
    /* ... */
}
</style>