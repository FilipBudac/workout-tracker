import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/views/Home";
import Register from "@/views/Register";
import Login from "@/views/Login";
import store from "../store";
import Profile from "@/views/Profile";

Vue.use(VueRouter)

const ifAuthenticated = (to, from, next) => {
    if (store.getters.isAuthenticated) {
        next("/")
        return
    }
    next()
}

const ifNotAuthenticated = (to, from, next) => {
    if (!store.getters.isAuthenticated) {
        next("/login");
        return;
    }
    next();
};

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        beforeEnter: ifNotAuthenticated
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        beforeEnter: ifAuthenticated
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        beforeEnter: ifAuthenticated
    },
    {
        path: '/:username/profile',
        name: 'profile',
        component: Profile,
        beforeEnter: ifNotAuthenticated
    },
]

const router = new VueRouter({
    routes,
    mode: 'history',
    base: process.env.BASE_URL,
})

export default router