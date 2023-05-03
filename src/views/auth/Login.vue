<style>
@import "@/assets/css/login.css";
</style>

<template>
  <main class="py-5 main">
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="form col-sm-12 col-md-8 col-lg-4">
          <p class="text-center text-danger  mb-4 content_signin fw-bold">Đăng nhập</p>
          <form
            id="signinForm" method="post" class="form-horizontal"
            @submit.prevent="onSubmit(this.account)"
          >
            <div class="form-group mb-3">
              <label for="username" class="form-label">Tên đăng nhập:</label>
              <input type="text" class="form-control py-2" id="username" placeholder="Nhập tên đăng nhập"  
              v-model="this.account.username" required />
            </div>
            <div class="form-group mb-3 passw">
              <label for="pwd" class="form-label">Mật khẩu:</label>
              <input type="password" class="form-control py-2" id="password" placeholder="Nhập mật khẩu" name="password" 
              v-model="this.account.password" required/>
            </div>
            {{ this.error }}
            <button type="submit" class="btn btn-danger col-12 btn_submit py-2 mb-3">
              ĐĂNG NHẬP
            </button>
          </form>
          <button type="button" class="btn btn-success col-12 btn_create py-2 mb-3">
            <router-link to="/register">ĐĂNG KÝ</router-link>
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { useUserStore } from "@/stores/UserStore";
import User from "@/services/user.service";
export default {
  data() {
    const userStore = useUserStore();
    return {
      account: {
        username: "",
        password: "",
      },
      error: null,
      userStore,
    };
  },
  methods: {
    async onSubmit(data) {
      try {
        this.userStore.user = await User.login(data);
        this.userStore.isLogin = true;
        if (this.userStore.user.account.permission === 0) {
          this.$router.push("/admin_ramdom");
        } else {
          this.$router.push("/");
        }
      } catch (err) {
        this.error = err.response.data.message;
      }
    },
  },
};
</script>
