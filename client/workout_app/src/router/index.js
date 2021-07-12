import Vue from "vue";
import VueRouter from "vue-router";

import store from "../store";

import Home from "@/views/home/Home";
import Register from "@/views/Register";
import Profile from "@/views/Profile";
import Login from "@/views/Login";
import Exercises from "@/views/home/exercises/Exercises";
import Trainings from "@/views/home/trainings/Trainings";
import PageNotFound from "@/views/PageNotFound";


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
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
        beforeEnter: ifNotAuthenticated,
        children: [
            {
                path: 'exercises',
                name: 'exercises',
                component: Exercises,
                beforeEnter: ifNotAuthenticated,
            },
            {
                path: 'trainings',
                name: 'trainings',
                component: Trainings,
                beforeEnter: ifNotAuthenticated,
            },
        ]
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
    {
        path: '*',
        name: 'page-not-found',
        component: PageNotFound
    }
]

const router = new VueRouter({
    routes,
    mode: 'history',
    base: process.env.BASE_URL,
})

export default router