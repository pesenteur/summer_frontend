<template>
  <div>
    <div class="background"></div>
    <div class="container">
      <div class="header-title">
        <h1>模板库</h1>
        <hr class="divider">
      </div>
      <div class="gallery">
        <div class="image" v-for="(image, index) in images" :key="index">
            <img class="inside_image" :src="image.src" :alt="image.alt" @click="intoTemplate(image.designId)">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import { onMounted } from "vue";
import originAPI from '@/api/originDesign'
import {useRouter} from "vue-router";
import {getProjId, setDesignId} from "@/utils/token";

const router = useRouter()

const images = ref()

async function intoTemplate(designId){
  // const result = await originAPI.getSingle(null,designId)
  setDesignId(designId)
  const result = await originAPI.addOrigin(designName.value, getProjId())
  await router.push('/drag')
}


onMounted(async () => {
  // const result = await originAPI.attainTemplate()
  images.value = [
      { src: '/android.png', group: 'temps', title: '模板图片1', alt: 'Android', designId: 'ea59a17b5245458fb95dbfa13e1e6d00' },
      { src: '/pc.png', group: 'temps', title: '模板图片2', alt: 'PC', designId: '6c250ff844204723b6528cba2147490b' },
      {src: '/screenshot.png', group: 'temps', title: '模板图片3', alt: 'Android', designId: '503de4e9a12a4b42a6303c939714dc7b'},
      {src: '/screenshot%20(2).png', group: 'temps', title: '模板图片4', alt: 'Android', designId: '1147f7c294df46c086e028a3dcbeda49'},
      {src: '/screenshot%20(3).png', group: 'temps', title: '模板图片5', alt: 'Android', designId: '5059e01bcbd746019d315d6bbcbd7716'},
      {src: '/screenshot%20(4).png', group: 'temps', title: '模板图片6', alt: 'Android', designId: 'ce96ff583f94415abeceb2f0d9c31179'},
      {src: '/screenshot%20(5).png', group: 'temps', title: '模板图片7', alt: 'Android', designId: 'b0b60743c6944a0983ef08a9eb460e0b'},
      {src: '/screenshot%20(6).png', group: 'temps', title: '模板图片8', alt: 'Android', designId: '59041f1c3acd4368bd2141ae8c71238e'},
      {src: '/screenshot%20(7).png', group: 'temps', title: '模板图片9', alt: 'Android', designId: '285c4826623246a7b38ccfebe8d9e163'},
      {src: '/screenshot%20(8).png', group: 'temps', title: '模板图片10', alt: 'Android', designId: '3a561bf45dc04033a2139f838f722015'},] //还要改
  // console.log('template result.data', result.data)
})
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
}

/* .container {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 40px, 6%;
} */
.container {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 10%);
    width: 75%;
    background-position: center;
    background-size: cover;
    border-radius: 20px;
    overflow: hidden;
    text-align: center;
    top: 20px;

}

.header-title h1 {

    color: black;
    font-size: 30px;
    cursor: pointer;
}

/* .header-title:hover h1 {
    color: whitesmoke;
    font-size: 35px;
    cursor: pointer;
} */

.header-title .divider {
    background-color: brown;
    width: 50%;
    height: 4px;
    border: none;
    margin: 5px auto 0;
    transition: all 0.5s;
}

.header-title:hover .divider {
    width: 80%;
}

.gallery {
    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
}

.gallery .image {
    flex-basis: 50%;
    padding: 20px;
}
.gallery .inside_image{
    border-style: ridge;
    border-color: #e8e8e8;
}
.gallery .image img {
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
}
.gallery .image:hover img {
    transform: scale(1.1);
    opacity: 0.1;
    box-shadow: 15px 15px 15px rgba(0, 0, 0, 0.4);
}

.gallery img {
    width: 100%;
    transition: all 0.5s;
}

@media(max-width:1000px) {
    .gallery .image {
        flex-basis: 50%;
    }

    .header-title h1 {
        font-size: 28px;
    }
}

@media(max-width:500px) {
    .gallery .image {
        flex-basis: 100%;
    }

    .header-title h1 {
        font-size: 24px;
    }
}
body.lb-disable-scrolling {
  overflow: hidden;
}

.lightboxOverlay {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
  background-color: black;
  filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=80);
  opacity: 0.8;
  display: none;
}

.lightbox {
  position: absolute;
  left: 0;
  width: 100%;
  z-index: 10000;
  text-align: center;
  line-height: 0;
  font-weight: normal;
  outline: none;
}

.lightbox .lb-image {
  display: block;
  height: auto;
  max-width: inherit;
  max-height: none;
  border-radius: 3px;

  /* Image border */
  border: 4px solid white;
}

.lightbox a img {
  border: none;
}

.lb-outerContainer {
  position: relative;
  *zoom: 1;
  width: 250px;
  height: 250px;
  margin: 0 auto;
  border-radius: 4px;

  /* Background color behind image.
     This is visible during transitions. */
  background-color: white;
}

.lb-outerContainer:after {
  content: "";
  display: table;
  clear: both;
}

.lb-loader {
  position: absolute;
  top: 43%;
  left: 0;
  height: 25%;
  width: 100%;
  text-align: center;
  line-height: 0;
}

.lb-cancel {
  display: block;
  width: 32px;
  height: 32px;
  margin: 0 auto;
  //background: url(@/assets/imgs/) no-repeat;
}

.lb-nav {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 10;
}

.lb-container > .nav {
  left: 0;
}

.lb-nav a {
  outline: none;
  background-image: url('data:image/gif;base64,R0lGODlhAQABAPAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==');
}

.lb-prev, .lb-next {
  height: 100%;
  cursor: pointer;
  display: block;
}

.lb-nav a.lb-prev {
  width: 34%;
  left: 0;
  float: left;
  //background: url(../images/prev.png) left 48% no-repeat;
  filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=0);
  opacity: 0;
  -webkit-transition: opacity 0.6s;
  -moz-transition: opacity 0.6s;
  -o-transition: opacity 0.6s;
  transition: opacity 0.6s;
}

.lb-nav a.lb-prev:hover {
  filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=100);
  opacity: 1;
}

.lb-nav a.lb-next {
  width: 64%;
  right: 0;
  float: right;
  //background: url(../images/next.png) right 48% no-repeat;
  filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=0);
  opacity: 0;
  -webkit-transition: opacity 0.6s;
  -moz-transition: opacity 0.6s;
  -o-transition: opacity 0.6s;
  transition: opacity 0.6s;
}

.lb-nav a.lb-next:hover {
  filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=100);
  opacity: 1;
}

.lb-dataContainer {
  margin: 0 auto;
  padding-top: 5px;
  *zoom: 1;
  width: 100%;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}

.lb-dataContainer:after {
  content: "";
  display: table;
  clear: both;
}

.lb-data {
  padding: 0 4px;
  color: #ccc;
}

.lb-data .lb-details {
  width: 85%;
  float: left;
  text-align: left;
  line-height: 1.1em;
}

.lb-data .lb-caption {
  font-size: 13px;
  font-weight: bold;
  line-height: 1em;
}

.lb-data .lb-caption a {
  color: #4ae;
}

.lb-data .lb-number {
  display: block;
  clear: left;
  padding-bottom: 1em;
  font-size: 12px;
  color: #999999;
}

.lb-data .lb-close {
  display: block;
  float: right;
  width: 30px;
  height: 30px;
  //background: url(../images/close.png) top right no-repeat;
  text-align: right;
  outline: none;
  filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=70);
  opacity: 0.7;
  -webkit-transition: opacity 0.2s;
  -moz-transition: opacity 0.2s;
  -o-transition: opacity 0.2s;
  transition: opacity 0.2s;
}

.lb-data .lb-close:hover {
  cursor: pointer;
  filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=100);
  opacity: 1;
}

/* 在这里添加您的CSS样式 */
</style>