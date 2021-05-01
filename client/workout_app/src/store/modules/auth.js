import {
    LOGIN,
    LOGOUT
} from "../actions/auth";
import {
    PURGE_AUTH,
    SET_AUTH,
    SET_ERROR
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
    }
};

const actions = {
    [LOGIN](context, payload) {
        return new Promise(resolve => {
            ApiService.post("login/", payload)
                .then(({ data }) => {
                    console.log(data)
                    context.commit(SET_AUTH, data);
                    resolve(data);
                })
                .catch(({ response }) => {
                    console.log(response)
                    context.commit(SET_ERROR, response.data.errors);
                });
        });
    },
    [LOGOUT](context) {
        context.commit(PURGE_AUTH);
    },
    // TODO: register
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
    }
};
export default {
    state,
    actions,
    mutations,
    getters
};
