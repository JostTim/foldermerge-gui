import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')

// document.addEventListener('mousemove', (event) => {
//     console.log(`Mouse Position: X=${event.clientX}, Y=${event.clientY}`);
// });