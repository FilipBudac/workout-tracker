import {
    FETCH_USER,
    LOGIN,
    LOGOUT, REFRESH_TOKEN,
    REGISTER,
    UPDATE_USER
} from "../actions/auth";
import {
    PURGE_AUTH, REFRESH_AUTH,
    SET_AUTH,
    SET_ERROR,
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
    currentUser(state) {
        return state.user;
    },
    isAuthenticated(state) {
        return state.isAuthenticated;
    },
    errors(state) {
        return state.errors;
    }
};

const actions = {
    [LOGIN](context, payload) {
        return new Promise(resolve => {
            ApiService.post('login/', payload)
                .then(({ data }) => {
                    context.commit(SET_AUTH, data)
                    resolve(data)
                })
                .catch(({ response }) => {
                    context.commit(SET_ERROR, response.data.non_field_errors)
                    resolve(response)
                });
        });
    },
    [REFRESH_TOKEN](context, payload) {
        return new Promise(resolve => {
            ApiService.post('oauth2/token/', payload)
                .then(({ data }) => {
                    context.commit(REFRESH_AUTH, data)
                    resolve(data)
                })
                .catch(({ response }) => {
                    context.commit(SET_ERROR, response.data.non_field_errors)
                    resolve(response)
                });
        });
    },
    [LOGOUT](context) {
        context.commit(PURGE_AUTH);
    },
    [REGISTER](context, payload) {
        return new Promise(resolve => {
            ApiService.post('register/', payload)
                .then(({ data }) => {
                    resolve(data)
                })
                .catch(({ response }) => {
                    context.commit(SET_ERROR, response.data.non_field_errors)
                    resolve(response)
                });
        });
    },
    [UPDATE_USER](context, payload) {
        const { userID, form } = payload;

        ApiService.setAuthHeader()
        return new Promise(resolve => {
            ApiService.patch(`users/${userID}/`, form)
                .then(({ data }) => {
                    context.commit(SET_USER, data)
                    resolve(data)
                })
                .catch(({ response }) => {
                    context.commit(SET_ERROR, response.data.non_field_errors)
                    resolve(response)
                });
        });
    },
    [FETCH_USER](context, payload) {
        const { username } = payload;

        ApiService.setAuthHeader()
        return ApiService.get('users/', {username: username})
            .then(({ data }) => {
                return data.shift()
            })
            .catch(({ response }) => {
                context.commit(SET_ERROR, response.data.non_field_errors)
            });
    },
};

const mutations = {
    [SET_ERROR](state, error) {
        state.errors = error;
    },

    [SET_AUTH](state, data) {
        state.isAuthenticated = true;
        state.user = data.user;
        state.errors = {};
        AuthService.saveAuthData(data.auth);
    },

    [PURGE_AUTH](state) {
        state.isAuthenticated = false;
        state.user = {};
        state.errors = {};
        AuthService.destroyAuthData();
    },

    [SET_USER](state, data) {
        state.isAuthenticated = true;
        state.user = data;
        state.errors = {};
    },

    [REFRESH_AUTH](state, data) {
        AuthService.saveAuthData(data);
    },
};

export default {
    state,
    actions,
    mutations,
    getters
};
