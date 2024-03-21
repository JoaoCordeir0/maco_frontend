import { createApp } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { /* Project icons */    
    faChartLine, 
    faScroll,  
    faFloppyDisk,
    faPenToSquare,
    faTrash,
    faNewspaper,
    faFileWord,
    faEye,
} from '@fortawesome/free-solid-svg-icons'

import App from './App.vue';
import router from './router';
import DashboardLayout from './components/DashboardLayout.vue';
import EmptyLayout from './components/EmptyLayout.vue';
import './assets/main.css';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App);

app.component('default-layout', DashboardLayout);
app.component('empty-layout', EmptyLayout);
app.component('font-awesome-icon', FontAwesomeIcon)

/* Sweetalert2 */
app.use(VueSweetalert2);

/* app routes */
app.use(router);

/* add icons to the library */
library.add(faChartLine, faScroll, faFloppyDisk, faPenToSquare, faTrash, faNewspaper, faFileWord, faEye) 

app.mount('#app');
