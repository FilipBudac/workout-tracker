import Vue from "vue";
import Vuex from "vuex";

import auth from "./modules/auth";
import training from "./modules/training";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

const store = new Vuex.Store({
    modules: {
        auth,
        training
    },
    strict: debug
});

export default store