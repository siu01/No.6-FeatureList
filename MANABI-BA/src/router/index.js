import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import ChatView from "@/views/ChatView.vue";
import TopView from "@/views/TopView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: LoginView,
    },
    {
      path: "/top",
      name: "top",
      component: TopView,
    },
    {
      path: "/chats/:id",
      name: "chat",
      component: ChatView,
    },
  ],
});

export default router;
