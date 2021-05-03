import {
    FETCH_USER,
    LOGIN,
    LOGOUT,
    REGISTER,
    UPDATE_USER
} from "../actions/auth";
import {
    PURGE_AUTH,
    SET_AUTH,
    SET_ERROR,
    SET_USER
} from "../mutations/auth";

import AuthService from "@/common/auth_service";
import ApiService from "@/common/api_service";


const state = {
    errors: null,
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
                    context.commit(SET_ERROR, response.data.errors)
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
                    context.commit(SET_ERROR, response.data.errors)
                });
        });
    },
    [UPDATE_USER](context, payload) {
        const { userID, form } = payload;
        console.log(userID)
        console.log(form)
        return new Promise(resolve => {
            ApiService.patch(`users/${userID}/`, form)
                .then(({ data }) => {
                    resolve(data)
                })
                .catch(({ response }) => {
                    context.commit(SET_ERROR, response.data.errors)
                });
        });
    },
    [FETCH_USER](context, payload) {
        const { username } = payload;
        return ApiService.get('users/', {username: username})
            .then(({ data }) => {
                // const user = data.shift()
                // context.commit(SET_USER, user)
                return data.length > 0 ? data.shift() : []
            })
            .catch(({ response }) => {
                context.commit(SET_ERROR, response.data.errors)
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
    }
};
export default {
    state,
    actions,
    mutations,
    getters
};
