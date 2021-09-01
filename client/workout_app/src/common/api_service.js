import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import AuthService from "@/common/auth_service";
import { API_URL } from "@/common/config";
import {mapActions} from "vuex";

const ApiService = {
    init() {
        Vue.use(VueAxios, axios);
        Vue.axios.defaults.baseURL = API_URL;
        Vue.axios.defaults.headers = {
            'Content-Type': 'application/json',
        }
    },

    ...mapActions([
        "refreshToken",
    ]),


    setAuthHeader() {
        Vue.axios.defaults.headers = {
            ...Vue.axios.defaults.headers,
            'Authorization': `Bearer ${AuthService.getAccessToken()}`
        }
    },

    setMultipartHeader() {
        Vue.axios.defaults.headers = {
            ...Vue.axios.defaults.headers,
            'Content-Type': 'multipart/form-data',
        }
    },

    async refreshToken() {
        const expired = AuthService.hasTokenExpired();

        if (! expired) {
            return;
        }
        //
        // const payload = {
        //     "grant_type": "refresh_token",
        //     "refresh_token": AuthService.getRefreshToken(),
        //     "client_id": process.env.VUE_APP_CLIENT_ID,
        // }

       // await this.refreshToken(payload)
    },

    query(resource, params) {
        return Vue.axios.get(resource, params).catch(error => {
            throw new Error(`ApiService ${error}`);
        });
    },

    async get(resource, params = {}) {
        await this.refreshToken()

        return Vue.axios.get(`${resource}`, { params: params }).catch(error => {
            throw new Error(`ApiService ${error}`);
        });
    },


    async post(resource, params) {
        await this.refreshToken()

        return Vue.axios.post(`${resource}`, params);
    },

    async refresh(resource, params) {
        return Vue.axios.post(`${resource}`, params);
    },

    async update(resource, slug, params) {
        await this.refreshToken()

        return Vue.axios.put(`${resource}/${slug}`, params);
    },

    async put(resource, params) {
        await this.refreshToken()

        return Vue.axios.put(`${resource}`, params);
    },

    async patch(resource, params) {
        await this.refreshToken()

        return Vue.axios.patch(`${resource}`, params);
    },

    async delete(resource) {
        await this.refreshToken()

        return Vue.axios.delete(resource);
    }
};

export default ApiService;