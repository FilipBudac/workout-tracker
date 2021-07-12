import {
    PURGE_AUTH, REFRESH_AUTH,
    SET_AUTH,
    SET_USER
} from "../mutations/auth";

import AuthService from "@/common/auth_service";
import ApiService from "@/common/api_service";


const state = {
    errors: [],
    user: {},
    isAuthenticated: !!AuthService.getAccessToken()
};

const getters = {
    currentUser: state => state.user,
    isAuthenticated: state => state.isAuthenticated,
    errors: state => state.errors,
};

const actions = {

    async loginAction({ commit }, payload) {
        const response = await ApiService.post('login/', payload);
        const { data } = response;

        commit(SET_AUTH, data);

        return data;
    },

    async refreshToken({ commit }, payload) {
        const response = await ApiService.refresh('oauth2/token/', payload);
        const { data } = response;

        commit(REFRESH_AUTH, data);

        return data;
    },

    async logoutAction({ commit }) {
        commit(PURGE_AUTH);
    },

    async registerAction(_, payload) {
        const response = await ApiService.post('register/', payload);
        const { data } = response;

        return data;
    },

    async updateUserAction({ commit }, payload) {
        ApiService.setAuthHeader()

        const { userID, form } = payload;

        const response = await ApiService.patch(`users/${userID}/`, form);
        const { data } = response;

        commit(SET_USER, data);

        return data;
    },

    async fetchUserAction(_, payload) {
        ApiService.setAuthHeader()

        const { username } = payload;

        const response = await ApiService.get('users/', {username: username});
        console.log(response)
        const { data } = response;

        return data.shift()
    },
};

const mutations = {
    setError: (state, error) => (state.errors = error),

    setAuth: (state, data) => {
        state.isAuthenticated = true;
        state.user = data.user;
        state.errors = {};
        AuthService.saveAuthData(data.auth);
    },

    purgeAuth: (state) => {
        state.isAuthenticated = false;
        state.user = {};
        state.errors = {};
        AuthService.destroyAuthData();
    },

    setUser: (state, data) => {
        state.isAuthenticated = true;
        state.user = data;
        state.errors = {};
    },

    refreshAuth: (state, data) => {
        AuthService.saveAuthData(data);
    },
};

export default {
    state,
    actions,
    mutations,
    getters
};
