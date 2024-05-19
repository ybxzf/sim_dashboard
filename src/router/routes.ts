import Home from "@/views/microPowerGrid/index.vue";
import monitorDashboard from "@/views/monitorDashboard/index.vue";

export const routes: any = [
  {
    path: "/",
    redirect: "home",
  },
  {
    path: "/home",
    name: "home",
    component: Home,
  },
  {
    path: "/monitorDashboard",
    name: "monitorDashboard",
    component: monitorDashboard,
    // component: () => import('@/views/monitorDashboard/index.vue'),
  },
];
