import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [{
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/article",
        name: "Article",
        component: () =>
            import ("../views/Article.vue"),
    },
    {
        path: "/link",
        name: "Link",
        component: () =>
            import ("../views/Link.vue"),
    },
    {
        path: "/msg",
        name: "Msg",
        component: () =>
            import ("../views/Msg.vue"),
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
        path: "/adminC",
        name: "Admin",
        component: () =>
            import ("../views/Admin.vue"),
    },
    {
        path: "/read",
        name: "Read",
        component: () =>
            import ("../views/Read.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;