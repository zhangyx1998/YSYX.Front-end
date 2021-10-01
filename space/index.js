import { createApp } from 'vue';
import App from './UI/App.vue';
// Initialize Vue Root Component
createApp(App, { data : Session.data}).mount('#app');
// Session Maintainer
import { Session } from './src/Session.js';
// Debug ONLY
window.Session = Session;
// Toggle main logic
Session.call('init');