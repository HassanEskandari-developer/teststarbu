import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Toast notification
import Toast , {POSITION} from "vue-toastification";
import "vue-toastification/dist/index.css";
import './assets/main.css'

const app = createApp(App)

app.use(router)
app.use(Toast, {
    position: POSITION.TOP_LEFT
});

app.mount('#app')
