import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/views/Home";
import Register from "@/views/Register";
import Login from "@/views/Login";
import store from "../store";

Vue.use(VueRouter)

// const ifLoggedIn = (to, from, next) => {
//     if (store.getters.isAuthenticated) {
//         next("/")
//         return
//     }
//     next()
// }

const ifAuthenticated = (to, from, next) => {
    if (store.getters.isAuthenticated) {
        next();
        return;
    }
    next("/login");
};

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        beforeEnter: ifAuthenticated

    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        // beforeEnter: ifLoggedIn
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        // beforeEnter: ifLoggedIn
    },
]

const router = new VueRouter({
    routes,
    mode: 'history',
    base: process.env.BASE_URL,
})

export default router