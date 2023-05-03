<template>
  <nav class="navbar navbar-light justify-content-end pe-5" style="background-color: #e6e6e6;">
    <h5 class="text-white">Đăng xuất &nbsp;</h5><i  @click="onSignOut" class="fa-solid fa-arrow-right-from-bracket icon text-white" ></i>
  </nav>
</template>




<script>
import { useUserStore } from "@/stores/UserStore";
export default {
  data() {
    const userStore = useUserStore();
    return {
      userStore,
    };
  },
  methods: {
    async onSignOut() {
      this.userStore.user = {};
      this.$router.push("/login");
    },
  },
};
</script>
