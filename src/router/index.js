import {createRouter, createWebHistory} from 'vue-router'

import StatusView from "@/views/StatusView.vue";
import HomeView from "@/views/HomeView.vue";
import ScanView from "@/views/ScanView.vue";
import NotFoundView from "@/views/NotFoundView.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        meta: {
            title: 'Home'
        },
        component: HomeView
    },
    {
        path: '/status/:addr',
        name: 'status',
        component: StatusView,
        meta: {
            title: 'Status'
        },
        params: true
    },
    {
        path: '/scan',
        name: 'scan',
        meta: {
            title: 'Scan'
        },
        component: ScanView
    },
    {
        path: "/:pathMatch(.*)*",
        name: "not-found",
        meta: {
            title: 'Not Found'
        },
        component: NotFoundView
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.title)
        document.title = `${to.meta.title} :: ServerList`;
    next();
})

export default router
