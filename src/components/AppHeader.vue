<template>
  <div class=" position-sticky" style="top: 0; z-index: 1000">
    <nav class="navbar navbar-expand-lg " style="background-color:#ff854d">
      <div class="container-fluid">
        <div class="collapse navbar-collapse " id="navbarSupportedContent">
          <ul class="navbar-nav" style="font-size: 18px;">
            <li class="nav-item me-4">
              <h6 style="color: white;margin-top: 10px;"><b>THE COFFEE HOUSE</b></h6>
            </li>
            <li class="nav-item me-4">
              <router-link class="nav-link text-white" to="/">TRANG CHỦ</router-link>
            </li>
            <li class="nav-item me-4">
              <router-link class="nav-link text-white" to="/product">MENU</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-white" to="/order">ĐƠN ĐẶT HÀNG
              </router-link>
            </li>
          </ul>
        </div>
        <div v-if="this.userStore.user.name" class="col-sm-12 col-md-5 col-lg-3 user-login text-end">
          <div class="user">
            <span class="text-white"> <i class="far fa-user text-white"></i> [ <b>{{ this.userStore.user.name }}</b> ] </span> 
            <a  @click="onSignOut" class="line  text-white fw-bold sign-out">
             [Đăng xuất]
            </a>
          </div>
        </div>
        <div v-else class="col-sm-12 col-md-5 col-lg-3 user-login text-end">
          <div class="user">
            <router-link to="/login" class="line ms-2 text-white fw-bold">Đăng nhập </router-link>
            <i class="far fa-user text-white"></i>
          </div>
        </div>
      </div>
    </nav>
  </div>
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
    },
  },
};
</script>

<style scoped>
.sign-out {
  cursor: pointer;
}
.line{
  text-decoration: none;
  color: white;
}
.logo{
  width: 60px;
  height:60px;
}
</style>
