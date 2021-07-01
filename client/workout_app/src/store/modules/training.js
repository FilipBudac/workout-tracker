import {SET_ERROR} from "../mutations/auth";
import {DELETE_EXERCISE, FETCH_CATEGORIES, FETCH_EXERCISES} from "../actions/training";
import ApiService from "../../common/api_service";

const state = {
    errors: [],
};

const getters = {
    errors(state) {
        return state.errors;
    }
};

const actions = {
    [FETCH_EXERCISES](context) {
        ApiService.setAuthHeader()
        return ApiService.get('exercises/')
            .then(({data}) => {
                return data
            })
            .catch(({response}) => {
                context.commit(SET_ERROR, response.data.non_field_errors)
            });
    },

    [DELETE_EXERCISE](context, payload) {
        const { exerciseID } = payload;
        ApiService.setAuthHeader()

        return ApiService.delete(`exercises/${exerciseID}`)
                .then(({data}) => {
                    return data;
                })
                .catch(({response}) => {
                    context.commit(SET_ERROR, response.error)
                    throw response
                });
    },

    [FETCH_CATEGORIES](context) {
        ApiService.setAuthHeader()
        return ApiService.get('categories/')
            .then(({data}) => {
                return data
            })
            .catch(({response}) => {
                context.commit(SET_ERROR, response.data.non_field_errors)
            });
    },


}

const mutations = {
    [SET_ERROR](state, error) {
        state.errors = error;
    },
};

export default {
    state,
    actions,
    mutations,
    getters
};
