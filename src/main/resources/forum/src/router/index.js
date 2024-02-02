import Login from '../components/LoginForum.vue';
import HomePage from "@/components/HomePage";
import NewTopic from "@/components/NewTopic";
import Vue from "vue";
import VueRouter from 'vue-router'
import store from '@/store'
import Vuex from 'vuex';
import TopicContent from "@/components/TopicContent";

Vue.use(VueRouter);
Vue.use(Vuex);

const routes = [
    { path: '/login', component: Login },
    { path: '/homepage', component: HomePage },
    { path: '/newtopic', component: NewTopic },
    { path: '/topiccontent', component: TopicContent }

];

const router = new VueRouter({
    mode: 'history', // Use history mode instead of hash mode
    routes,
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters.isAuthenticated) {
            // Redirect to login if not authenticated
            next('/login')
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router;