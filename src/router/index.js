import { createWebHistory, createRouter } from "vue-router";
const routes = [
  {
    path: "/",
    component: () => import("@/views/layouts/DefaultLayout.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/views/Home.vue"),
      },
      {
        path: "product",
        name: "Product",
        component: () => import("@/views/products/Product.vue"),
      },
      {
        path: "product/:id",
        component: () => import("@/views/products/ProductDetail.vue"),
      },
      {
        path: "order",
        name: "Order",
        component: () => import("@/views/order/Order.vue"),
      },
      
      {
        path: "login",
        name: "Login",
        component: () => import("@/views/auth/Login.vue"),
      },
      {
        path: "register",
        name: "Register",
        component: () => import("@/views/auth/Register.vue"),
      },
    ],
  },
  {
    path: "/admin_ramdom/",
    component: () => import("@/views/layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("@/views/admin/Product.vue"),
      },
      {
        path: "customer",
        component: () => import("@/views/admin/Customer.vue"),
      },
      {
        path: "order",
        component: () => import("@/views/admin/Order.vue"),
      },
    ],
  },

  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/views/NotFound.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
