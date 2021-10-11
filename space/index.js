import { createApp } from 'vue';
import App from './UI/App.vue';
// Initialize Vue Root Component
// window.app = createApp(App, { data: Session.data }).mount('#app');
createApp(App).mount('#app');
// Session Maintainer
import { Session } from './Session.js';
import { Popup, AppView } from './View.js';
// Debug ONLY
window.Session = Session;
window.Popup = Popup;
window.AppView = AppView;
// Toggle main logic
Session.call('init');