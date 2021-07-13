import AuthService from "@/services/auth.service";
import { Module } from "vuex";

const auth: Module<any, any> = {
    namespaced: true,
    state: {
        user: null
    },
    mutations:{
        logout(state) {
            state = null;
        },

        loginSuccess(state, user) {
            state.user = user;
        },

        loginFailure(state) {
            state.user = null;
        },
    },
    getters: {
        user: state => state.user
    },
    actions: {
        logout( { commit }) {
            commit('logout');
        },
        async login({ commit }, request) {
            const authService: AuthService = new AuthService();
            const user = await authService.login(request);

            if (user) {
                commit('loginSuccess', user);
            } else {
                commit('loginFailure');
            }
        }
    }
}

export default auth;