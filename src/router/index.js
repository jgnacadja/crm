import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Calendar from "../views/schedule.vue";
import PlanningKanban from "../views/PlanningKanban";

import store from "../store";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/About.vue"),
    },
    {
        path: "/schedule",
        name: "Agenda",
        component: Calendar,
    },
    {
        path: "/gantt",
        name: "Gantt",
        component: () =>
            import ("../views/Gantt.vue"),
    },
    {
        path: "/planning",
        name: "Planning",
        component: () =>
            import ("../views/Planning.vue"),
    },
    {
        path: "/kanban",
        name: "Planning Kanban",
        component: PlanningKanban,
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});


router.beforeEach((to, from, next) => {
    const granted = store.getters.isConnected;
    if (to.name !== "Home" && !granted) {
        next({ name: "Home" });
    } else {
        next();
    }
});
export default router