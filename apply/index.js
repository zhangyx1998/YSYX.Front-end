import { env } from "/util/env.js";
env.call("update");
import { createApp } from 'vue';
import App from './UI/App.vue';
createApp(App).mount('#app');