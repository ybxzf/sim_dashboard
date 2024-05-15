import "./assets/base.less";
import { createApp } from "vue";

// 安装pinia
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

//引入router
import router from "./router";

//安装element-plus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

// 挂载pxToRem到全局
import "@/utils/rem";

import App from "./App.vue";
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(ElementPlus);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.mount("#app");
