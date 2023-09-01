import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import api from "@/api";
import router from "@/router";
import { createPinia } from "pinia";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

const app = createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
library.add(faUserSecret)
/* add font awesome icon component */
app.use(ElementPlus)
app.use(router)
app.use(createPinia());
app.use(api);
app.mount('#app')