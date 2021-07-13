import AuthRequest from "@/models/auth-request";
import User from "@/models/user";
import AuthService from "@/services/auth.service";
import { Module } from "vuex";
import State from "../models/state";

const auth: Module<State, any> = {
    namespaced: true,
    state: {
        user: null
    },
    mutations:{
        logout(state: State) {
            state.user = null;
        },

        loginSuccess(state: State, user: User) {
            state.user = user;
        },

        loginFailure(state: State) {
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
        async login({ commit }, request: AuthRequest) {
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