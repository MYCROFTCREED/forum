import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';

Vue.config.productionTip = false;
const axiosInstance = axios.create();
Vue.prototype.$axios = axiosInstance ;

// Set up Axios base URL
axios.defaults.baseURL = 'https://localhost:8081'; // Replace with your API base URL

// Add a request interceptor to include the access token in requests
axios.interceptors.request.use(
    config => {
        const accessToken = store.getters['token/accessToken']; // Use the getter from the token module
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

new Vue({
    render: h => h(App),
    router,
    store,
}).$mount('#app');