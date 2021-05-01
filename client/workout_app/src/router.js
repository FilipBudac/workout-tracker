import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/components/Home";
import Register from "@/components/Register";
import Login from "@/components/Login";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
]

const router = new VueRouter({
    routes,
    mode: 'history',
    base: process.env.BASE_URL,
})

export default router