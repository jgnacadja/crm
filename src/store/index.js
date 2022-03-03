import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: {
            isAuth: false,
            token: "undefined",
            idUser : "undefined",
        },
    },
    getters: {
        isConnected: (state) => {
            return state.user.isAuth;
        },
        getToken: (state) => {
            return state.user.token;
        },
        getIdUser: (state) => {
            return state.user.idUser;
        },
    },
    mutations: {
        updateAuth(state, payload) {
            state.user.isAuth = payload;
        },
        updateToken(state, payload) {
            state.user.token = payload;
        },
        updateIdUser(state, payload) {
            state.user.idUser = payload;
        },
    },
    actions: {},
});