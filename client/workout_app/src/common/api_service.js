import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import AuthService from "@/common/auth_service";
import { API_URL } from "@/common/config";

const ApiService = {
    init() {
        Vue.use(VueAxios, axios);
        Vue.axios.defaults.baseURL = API_URL;
        Vue.axios.defaults.headers = {
            'Content-Type': 'application/json',
        }
    },

    setAuthHeader() {
        Vue.axios.defaults.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${AuthService.getAccessToken()}`
        }
    },

    query(resource, params) {
        return Vue.axios.get(resource, params).catch(error => {
            throw new Error(`ApiService ${error}`);
        });
    },

    get(resource, params = {}) {
        return Vue.axios.get(`${resource}`, { params: params, headers: {Authorization: `Bearer ${AuthService.getAccessToken()}`} }).catch(error => {
            throw new Error(`ApiService ${error}`);
        });
    },


    post(resource, params) {
        return Vue.axios.post(`${resource}`, params);
    },

    update(resource, slug, params) {
        return Vue.axios.put(`${resource}/${slug}`, params);
    },

    put(resource, params) {
        return Vue.axios.put(`${resource}`, params);
    },

    patch(resource, params) {
        this.setAuthHeader()

        return Vue.axios.patch(`${resource}`, params);
    },

    delete(resource) {
        return Vue.axios.delete(resource).catch(error => {
            throw new Error(`ApiService ${error}`);
        });
    }
};

export default ApiService;