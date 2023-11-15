import '@/styles/commons.less'
import '@/assets/fonts/icon/iconfont.css';
import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// import axios from 'axios'
// import VueAxios from 'vue-axios'

import TopBar from '@/components/TopBar.vue'
import Btn from '@/components/Button.vue'
import FootBar from '@/components/FootBar.vue'
import NoteCard from '@/components/NoteCard.vue'
import Ysmodal from '@/components/YsModal.vue'
import NewCard from '@/components/NewCard.vue'
import CardDetail from './components/CardDetail.vue'
import PhotoCard from './components/PhotoCard.vue'
import YsViewer from './components/YsViewer.vue'

import YISI from '@/components/yisi/index'
const app = createApp(App)

app.use(router)
app.use(store)

app.use(ElementPlus)

app.use(YISI)

// app.use(VueAxios, axios)
app.component('TopBar', TopBar)
app.component('Btn', Btn)
app.component('FootBar', FootBar)
app.component('NoteCard', NoteCard)
app.component('Ysmodal', Ysmodal)
app.component('NewCard', NewCard)
app.component('CardDetail', CardDetail)
app.component('PhotoCard', PhotoCard)
app.component('YsViewer', YsViewer)


app.mount('#app')
