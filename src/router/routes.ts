import Home from "@/views/Home.vue";

export const routes: any = [
    {
        path: '/',
        redirect: "/home",
    }, {
        path: '/home',
        name: 'home',
        component: Home,
    }
]