import { createWebHistory, createRouter } from 'vue-router';
import Home from "@/components/Home.vue";
import SignIn from '@/components/SignIn.vue';
import SignUp from '@/components/SignUp.vue';
import RoomList from '@/components/RoomList.vue';
import { checkLoginStatus } from '@/api/sessionApi.ts';

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/rooms',
    component: RoomList,
    meta: { requiresAuth: true }
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

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    const loggedIn = await checkLoginStatus();
    if (!loggedIn.logged_in) {
      next({
        path: '/sign_in',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router;
