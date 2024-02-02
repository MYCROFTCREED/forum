import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        accessToken: null,
    },
    mutations: {
        setAccessToken(state, token) {
            state.accessToken = token;
        },
    },
    getters: {
        getAccessToken: (state) => state.accessToken,
    },
    modules: {
        authentication: {
            state: {
                isAuthenticated: false,
            },
            mutations: {
                setAuthentication(state, isAuthenticated) {
                    state.isAuthenticated = isAuthenticated;
                },
            },
            getters: {
                isAuthenticated: (state) => state.isAuthenticated,
            },
        },
    },
});