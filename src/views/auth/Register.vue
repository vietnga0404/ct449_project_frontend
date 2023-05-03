<style>
@import "@/assets/css/login.css";
</style>

<template>
  <main class="py-5 main">
    <div class="container">
      <div class="row justify-content-center">
        <div class="form col-sm-12 col-md-8 col-lg-4">
          <p class="text-center text-danger mb-3 content_signin fw-bold">Đăng ký</p>
          <form @submit.prevent="onSubmit(this.data)" class="form-horizontal">
            <div class="form-group mb-3 ps-0">
              <label for="username" class="form-label">Họ và tên:</label>
              <input type="text" class="form-control py-2" id="name" placeholder="Nhập họ tên"
                v-model="this.data.name"
              />
            </div>
            <div class="form-group mb-3 ps-0">
              <label for="username" class="form-label">Tên đăng nhập:</label>
              <input type="text" class="form-control py-2" id="username" placeholder="Nhập tên đăng nhập"
                v-model="this.data.account.username"
              />
            </div>
            <div class="form-group mb-3 pe-0">
              <label for="phone" class="form-label">Số điện thoại:</label>
              <input type="text" class="form-control py-2" id="phone" placeholder="Nhập số điện thoại"
                v-model="this.data.phone"
              />
            </div>

            <div class="form-group mb-3 pe-0">
              <label for="phone" class="form-label">Địa chỉ</label>
              <input type="text" class="form-control py-2" id="address" placeholder="Nhập địa chỉ"
                v-model="this.data.address"
              />
            </div>

            <div class="form-group mb-3 passw">
              <label for="pwd" class="form-label">Mật khẩu:</label>
              <input type="password" class="form-control py-2" id="pwd" placeholder="Nhập mật khẩu"
                v-model="this.data.account.password"
              />
            </div>

            <button type="submit" class="btn btn-danger col-12 btn_submit py-2 mb-4 text-uppercase">
              ĐĂNG KÝ
            </button>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import User from "@/services/user.service"
export default {
  data() {
    return {
      data: {
        name:"",
        phone: "",
        address:"",
        account: {
          username: "",
          password: "",
        },
      },
    };
  },
  methods: {
    async onSubmit(data) {
      await User.create(data);
    },
  },
};
</script>
