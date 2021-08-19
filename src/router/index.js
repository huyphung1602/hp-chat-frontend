import { createWebHistory, createRouter } from 'vue-router';
import Home from "@/components/Home.vue";
import SignIn from '@/components/SignIn.vue';
import SignUp from '@/components/SignUp.vue';
import RoomList from '@/components/RoomList.vue';

const routes = [
  {
    path: '/',
    component: SignIn,
  },
  {
    path: '/sign_in',
    component: SignIn,
  },
  {
    path: '/sign_up',
    component: SignUp,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
