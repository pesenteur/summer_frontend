"use strict";(self["webpackChunkvisual_drag_demo"]=self["webpackChunkvisual_drag_demo"]||[]).push([[910],{1910:function(e,t,n){n.r(t),n.d(t,{default:function(){return h}});var l=function(){var e=this,t=e._self._c;return t("div",{staticClass:"line-shape"})},i=[],a=n(2689),s={extends:a.Z},o=s,r=n(1001),c=(0,r.Z)(o,l,i,!1,null,"30dba720",null),h=c.exports},2689:function(e,t,n){n.d(t,{Z:function(){return h}});var l,i,a=n(4003),s={props:{linkage:{type:Object,default:()=>{}},element:{type:Object,default:()=>{}}},created(){this.linkage?.data?.length&&(a.Z.$on("v-click",this.onClick),a.Z.$on("v-hover",this.onHover))},mounted(){const{data:e,duration:t}=this.linkage||{};e?.length&&(this.$el.style.transition=`all ${t}s`)},beforeDestroy(){this.linkage?.data?.length&&(a.Z.$off("v-click",this.onClick),a.Z.$off("v-hover",this.onHover))},methods:{changeStyle(e=[]){e.forEach((e=>{e.style.forEach((e=>{e.key&&(this.element.style[e.key]=e.value)}))}))},onClick(e){const t=this.linkage.data.filter((t=>t.id===e&&"v-click"===t.event));this.changeStyle(t)},onHover(e){const t=this.linkage.data.filter((t=>t.id===e&&"v-hover"===t.event));this.changeStyle(t)}}},o=s,r=n(1001),c=(0,r.Z)(o,l,i,!1,null,null,null),h=c.exports}}]);
//# sourceMappingURL=910.91cb6178.js.map