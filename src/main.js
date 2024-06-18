import './assets/sass/_style.scss'

import { createApp } from 'vue'
import ViewUIPlus from 'view-ui-plus'
import { createPinia } from 'pinia'

import { useAdminStore } from '@/store/adminState.js';

import App from './App.vue'
import router from './router'
//iview
import 'view-ui-plus/dist/styles/viewuiplus.css'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(ViewUIPlus)
app.use(pinia)

const store = useAdminStore();
store.loadCurrentUser();

app.mount('#app')




