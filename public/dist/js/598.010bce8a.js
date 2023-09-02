"use strict";(self["webpackChunkvisual_drag_demo"]=self["webpackChunkvisual_drag_demo"]||[]).push([[598],{9339:function(e,t,a){a.d(t,{Z:function(){return S}});a(6699);var l=function(){var e=this,t=e._self._c;return t("div",{staticClass:"v-common-attr"},[t("el-collapse",{attrs:{accordion:""},on:{change:e.onChange},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[t("el-collapse-item",{attrs:{title:"通用样式",name:"style"}},[t("el-form",e._l(e.styleKeys,(function({key:a,label:l},n){return t("el-form-item",{key:n,attrs:{label:l}},[e.isIncludesColor(a)?t("el-color-picker",{attrs:{"show-alpha":""},model:{value:e.curComponent.style[a],callback:function(t){e.$set(e.curComponent.style,a,t)},expression:"curComponent.style[key]"}}):e.selectKey.includes(a)?t("el-select",{model:{value:e.curComponent.style[a],callback:function(t){e.$set(e.curComponent.style,a,t)},expression:"curComponent.style[key]"}},e._l(e.optionMap[a],(function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1):t("el-input",{attrs:{type:"number"},model:{value:e.curComponent.style[a],callback:function(t){e.$set(e.curComponent.style,a,e._n(t))},expression:"curComponent.style[key]"}})],1)})),1)],1),e.curComponent.request?t("Request"):e._e(),e.curComponent.linkage?t("Linkage"):e._e()],1)],1)},n=[];const o=[{key:"left",label:"x 坐标"},{key:"top",label:"y 坐标"},{key:"rotate",label:"旋转角度"},{key:"width",label:"宽"},{key:"height",label:"高"},{key:"color",label:"颜色"},{key:"backgroundColor",label:"背景色"},{key:"borderWidth",label:"边框宽度"},{key:"borderStyle",label:"边框风格"},{key:"borderColor",label:"边框颜色"},{key:"borderRadius",label:"边框半径"},{key:"fontSize",label:"字体大小"},{key:"fontWeight",label:"字体粗细"},{key:"lineHeight",label:"行高"},{key:"letterSpacing",label:"字间距"},{key:"textAlign",label:"左右对齐"},{key:"verticalAlign",label:"上下对齐"},{key:"opacity",label:"不透明度"}],r={left:"x 坐标",top:"y 坐标",rotate:"旋转角度",width:"宽",height:"高",color:"颜色",backgroundColor:"背景色",borderWidth:"边框宽度",borderStyle:"边框风格",borderColor:"边框颜色",borderRadius:"边框半径",fontSize:"字体大小",fontWeight:"字体粗细",lineHeight:"行高",letterSpacing:"字间距",textAlign:"左右对齐",verticalAlign:"上下对齐",opacity:"不透明度"},s=[{label:"左对齐",value:"left"},{label:"居中",value:"center"},{label:"右对齐",value:"right"}],i=[{label:"实线",value:"solid"},{label:"虚线",value:"dashed"}],u=[{label:"上对齐",value:"top"},{label:"居中对齐",value:"middle"},{label:"下对齐",value:"bottom"}],c=["textAlign","borderStyle","verticalAlign"],p={textAlign:s,borderStyle:i,verticalAlign:u};var d=function(){var e=this,t=e._self._c;return t("el-collapse-item",{staticClass:"request-container",attrs:{title:"数据来源（预览生效）",name:"request"}},[t("el-form",[t("el-form-item",{attrs:{label:"请求地址"}},[t("el-input",{on:{blur:e.validateURL},model:{value:e.request.url,callback:function(t){e.$set(e.request,"url","string"===typeof t?t.trim():t)},expression:"request.url"}},[t("template",{slot:"prepend"},[e._v("HTTPS://")])],2)],1),t("el-form-item",{attrs:{label:"请求方法"}},[t("el-select",{model:{value:e.request.method,callback:function(t){e.$set(e.request,"method",t)},expression:"request.method"}},e._l(e.methodOptions,(function(e){return t("el-option",{key:e,attrs:{label:e,value:e}})})),1)],1),t("el-form-item",{attrs:{label:"请求参数"}},[t("el-select",{attrs:{placeholder:"参数类型"},on:{change:e.onChnage},model:{value:e.request.paramType,callback:function(t){e.$set(e.request,"paramType",t)},expression:"request.paramType"}},e._l(e.dataOptions,(function(e){return t("el-option",{key:e,attrs:{label:e,value:e}})})),1),"array"===e.request.paramType?t("div",{staticClass:"param-container"},[t("p",[e._v("数据项")]),e._l(e.request.data,(function(a,l){return t("div",{key:l,staticClass:"div-delete"},[t("el-input",{attrs:{placeholder:"请输入参数值"},model:{value:e.request.data[l],callback:function(t){e.$set(e.request.data,l,t)},expression:"request.data[index]"}}),t("span",{staticClass:"iconfont icon-shanchu",on:{click:function(t){return e.deleteData(l)}}})],1)})),t("el-button",{on:{click:e.addArrayData}},[e._v("添加")])],2):"string"===e.request.paramType||"object"===e.request.paramType?t("div",{staticClass:"param-container"},[t("p",[e._v("数据项")]),e._l(e.request.data,(function(a,l){return t("div",{key:l,staticClass:"param-object-container"},[t("el-input",{attrs:{placeholder:"参数名"},model:{value:a[0],callback:function(t){e.$set(a,0,t)},expression:"item[0]"}}),t("el-input",{attrs:{placeholder:"参数值"},model:{value:a[1],callback:function(t){e.$set(a,1,t)},expression:"item[1]"}}),t("span",{staticClass:"iconfont icon-shanchu",on:{click:function(t){return e.deleteData(l)}}})],1)})),t("el-button",{on:{click:e.addData}},[e._v("添加")])],2):e._e()],1),t("el-form-item",{attrs:{label:"定时触发"}},[t("el-switch",{model:{value:e.request.series,callback:function(t){e.$set(e.request,"series",t)},expression:"request.series"}}),e.request.series?[t("p",[e._v("触发间隔（毫秒）")]),t("el-input",{attrs:{type:"number"},model:{value:e.request.time,callback:function(t){e.$set(e.request,"time",t)},expression:"request.time"}}),t("p",[e._v("触发次数（0 为无限）")]),t("el-input",{attrs:{type:"number"},model:{value:e.request.requestCount,callback:function(t){e.$set(e.request,"requestCount",t)},expression:"request.requestCount"}})]:e._e()],2)],1)],1)},m=[],v=a(4471),y={data(){return{methodOptions:["GET","POST","PUT","DELETE"],dataOptions:["object","array","string"]}},computed:{request(){return this.$store.state.curComponent.request}},methods:{addArrayData(){this.request.data.push("")},addData(){this.request.data.push(["",""])},deleteData(e){this.request.data.splice(e,1)},onChnage(){"array"===this.request.paramType?this.request.data=[""]:this.request.data=[["",""]]},validateURL(){const e=this.request.url;(e&&/^\d+$/.test(e)||!v._q.test((0,v.Ax)(e)))&&this.$message.error("请输入正确的 URL")}}},b=y,h=a(3736),k=(0,h.Z)(b,d,m,!1,null,"1afacafa",null),f=k.exports,C=function(){var e=this,t=e._self._c;return t("el-collapse-item",{staticClass:"linkage-container",attrs:{title:"组件联动（预览生效）",name:"linkage"}},[t("el-form",[e._l(e.linkage.data,(function(a,l){return t("div",{key:l,staticClass:"linkage-component"},[t("div",{staticClass:"div-guanbi",on:{click:function(t){return e.deleteLinkageData(l)}}},[t("span",{staticClass:"iconfont icon-guanbi"})]),t("el-select",{staticClass:"testtest",attrs:{placeholder:"请选择联动组件"},model:{value:a.id,callback:function(t){e.$set(a,"id",t)},expression:"item.id"}},e._l(e.componentData,(function(a,l){return t("el-option",{key:a.id,attrs:{value:a.id,label:a.label}},[t("div",{on:{mouseenter:function(t){return e.onEnter(l)},mouseout:function(t){return e.onOut(l)}}},[e._v(e._s(a.label))])])})),1),t("el-select",{attrs:{placeholder:"请选择监听事件"},model:{value:a.event,callback:function(t){e.$set(a,"event",t)},expression:"item.event"}},e._l(e.eventOptions,(function(e){return t("el-option",{key:e.value,attrs:{value:e.value,label:e.label}})})),1),t("p",[e._v("事件触发时，当前组件要修改的属性")]),e._l(a.style,(function(l,n){return t("div",{key:n,staticClass:"attr-container"},[t("el-select",{on:{change:function(e){l.value=""}},model:{value:l.key,callback:function(t){e.$set(l,"key",t)},expression:"e.key"}},e._l(Object.keys(e.curComponent.style),(function(a){return t("el-option",{key:a,attrs:{value:a,label:e.styleMap[a]}})})),1),e.isIncludesColor(l.key)?t("el-color-picker",{attrs:{"show-alpha":""},model:{value:l.value,callback:function(t){e.$set(l,"value",t)},expression:"e.value"}}):e.selectKey.includes(l.key)?t("el-select",{model:{value:l.value,callback:function(t){e.$set(l,"value",t)},expression:"e.value"}},e._l(e.optionMap[l.key],(function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1):t("el-input",{attrs:{type:"number",placeholder:"请输入"},model:{value:l.value,callback:function(t){e.$set(l,"value",e._n(t))},expression:"e.value"}}),t("span",{staticClass:"iconfont icon-shanchu",on:{click:function(t){return e.deleteData(a.style,n)}}})],1)})),t("el-button",{on:{click:function(t){return e.addAttr(a.style)}}},[e._v("添加属性")])],2)})),t("el-button",{staticStyle:{"margin-bottom":"10px"},on:{click:e.addComponent}},[e._v("添加组件")]),t("p",[e._v("过渡时间（秒）")]),t("el-input",{staticClass:"input-duration",attrs:{placeholder:"请输入"},model:{value:e.linkage.duration,callback:function(t){e.$set(e.linkage,"duration",t)},expression:"linkage.duration"}})],2)],1)},g=[],q={data(){return{optionMap:p,selectKey:c,styleMap:r,eventOptions:[{label:"点击",value:"v-click"},{label:"悬浮",value:"v-hover"}],oldOpacity:"",oldBackgroundColor:""}},computed:{linkage(){return this.$store.state.curComponent.linkage},componentData(){return this.$store.state.componentData},curComponent(){return this.$store.state.curComponent}},methods:{onEnter(e){this.oldOpacity=this.componentData[e].style.opacity,this.oldBackgroundColor=this.componentData[e].style.backgroundColor,this.componentData[e].style.opacity=".3",this.componentData[e].style.backgroundColor="#409EFF"},onOut(e){this.componentData[e].style.opacity=this.oldOpacity,this.componentData[e].style.backgroundColor=this.oldBackgroundColor},isIncludesColor(e){return e.toLowerCase().includes("color")},addAttr(e){e.push({key:"",value:""})},addComponent(){this.linkage.data.push({id:"",event:"",style:[{key:"",value:""}]})},deleteData(e,t){e.splice(t,1)},deleteLinkageData(e){this.linkage.data.splice(e,1)}}},_=q,x=(0,h.Z)(_,C,g,!1,null,"017b510c",null),$=x.exports,D={components:{Request:f,Linkage:$},data(){return{optionMap:p,styleData:o,textAlignOptions:s,borderStyleOptions:i,verticalAlignOptions:u,selectKey:c,activeName:""}},computed:{styleKeys(){if(this.curComponent){const e=Object.keys(this.curComponent.style);return this.styleData.filter((t=>e.includes(t.key)))}return[]},curComponent(){return this.$store.state.curComponent}},created(){this.activeName=this.curComponent.collapseName},methods:{onChange(){this.curComponent.collapseName=this.activeName},isIncludesColor(e){return e.toLowerCase().includes("color")}}},A=D,O=(0,h.Z)(A,l,n,!1,null,null,null),S=O.exports},4061:function(e,t,a){a.r(t),a.d(t,{default:function(){return c}});var l=function(){var e=this,t=e._self._c;return t("div",{staticClass:"attr-list"},[t("CommonAttr"),t("el-form",[t("el-form-item",{attrs:{label:"内容"}},[t("el-input",{attrs:{type:"textarea",rows:3},model:{value:e.curComponent.propValue,callback:function(t){e.$set(e.curComponent,"propValue",t)},expression:"curComponent.propValue"}})],1)],1)],1)},n=[],o=a(9339),r={components:{CommonAttr:o.Z},computed:{curComponent(){return this.$store.state.curComponent}}},s=r,i=a(3736),u=(0,i.Z)(s,l,n,!1,null,null,null),c=u.exports},2306:function(e,t,a){a.r(t),a.d(t,{default:function(){return c}});var l=function(){var e=this,t=e._self._c;return t("div",{staticClass:"attr-list"},[t("CommonAttr"),t("el-form",[t("el-form-item",{attrs:{label:"内容"}},[t("el-input",{attrs:{type:"textarea",rows:3},model:{value:e.curComponent.propValue,callback:function(t){e.$set(e.curComponent,"propValue",t)},expression:"curComponent.propValue"}})],1)],1)],1)},n=[],o=a(9339),r={components:{CommonAttr:o.Z},computed:{curComponent(){return this.$store.state.curComponent}}},s=r,i=a(3736),u=(0,i.Z)(s,l,n,!1,null,null,null),c=u.exports},4471:function(e,t,a){a.d(t,{Ax:function(){return i},ZP:function(){return u},_q:function(){return n}});var l=a(4720);const n=/(https?):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/;function o(e){return new Promise(((t,a)=>{const l=new XMLHttpRequest;l.timeout=6e3;let n=i(e.url);"GET"===e.method&&(n+=`${r(e.data)}`),l.open(e.method,n),l.ontimeout=a,l.onerror=a,l.onload=e=>{t(e.target.response)},l.send(JSON.stringify(s(e.data,e.paramType)))}))}function r(e){let t="";return e.forEach((e=>{e[0]&&(t+=`&${e[0]}=${e[1]}`)})),t?"?"+t:""}function s(e,t){if(!e)return"";if("array"===t)return e;const a={};return e.forEach((e=>{e[0]&&(a[e[0]]=e[1])})),a}function i(e){return e.startsWith("http")?e:"https://"+e}function u(e,t,a,r="object"){let s,u=0;const c=e?.url;return(c&&!/^\d+$/.test(c)||n.test(i(c)))&&(e.series?s=setInterval((()=>{0!=e.requestCount&&e.requestCount<=u?clearInterval(s):(u++,o(e,r).then((e=>{t[a]="object"===r||"array"===r?JSON.parse(e):e})).catch((e=>l.Message.error(e?.message||e))))}),e.time):o(e,r).then((e=>{t[a]="object"===r||"array"===r?JSON.parse(e):e})).catch((e=>l.Message.error(e?.message||e)))),function(){clearInterval(s)}}}}]);
//# sourceMappingURL=598.010bce8a.js.map