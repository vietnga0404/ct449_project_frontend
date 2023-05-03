<template>
  <div class="container" style="min-height: 100vh">
    <div class="row san-pham mt-4">
      <div class="thong-ke text-center mb-3">
        <h4 class="fw-bold">DANH SÁCH NGƯỜI DÙNG</h4>
      </div>
      <div class="mb-4 text-end">
        <button type="button" class="btn btn-outline-primary rounded-0" data-bs-toggle="modal" data-bs-target="#addUser">
          <i class="fa-solid fa-plus"></i> Thêm Người Dùng
        </button>
      </div>
      <div class="modal fade" id="addUser" tabindex="-1" aria-labelledby="addUserLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="addUserLabel">Thêm người dùng</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-12">
                  <div class="form-floating mb-3">
                    <input v-model="this.data.name" type="text" class="form-control rounded-0" id="floatingInput"
                      placeholder="">
                    <label for="floatingInput">Họ và tên</label>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-floating mb-3">
                    <input v-model="this.data.phone" type="text" class="form-control rounded-0" id="floatingInput"
                      placeholder="">
                    <label for="floatingInput">Số điện thoại</label>
                  </div>
                </div>
              </div>
              <div class="row"> 
                <div class="col-md-12">
                  <div class="form-floating mb-3">
                    <input v-model="this.data.address" type="text" class="form-control rounded-0" id="floatingInput"
                      placeholder="">
                    <label for="floatingInput">Địa chỉ</label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="form-floating mb-3">
                    <input v-model="this.data.account.username" type="text" class="form-control rounded-0"
                      id="floatingInput" placeholder="">
                    <label for="floatingInput">Tên đăng nhập</label>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-floating mb-3">
                    <input v-model="this.data.account.password" type="password" class="form-control rounded-0"
                      id="floatingInput" placeholder="">
                    <label for="floatingInput">Mật khẩu</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary rounded-0" data-bs-dismiss="modal">Close</button>
              <button v-if="this.data._id != null" type="button" class="btn btn-primary  rounded-0"
                data-bs-dismiss="modal" @click="this.handleUpdate()">Cập nhật</button>
              <button v-else type="button" class="btn btn-primary  rounded-0" data-bs-dismiss="modal"
                @click="this.handleAdd()">Thêm</button>
            </div>
          </div>
        </div>
      </div>
      <table class="table  table-hover text-center">
        <thead class=" text-white" style="background-color: #ff884d;">
          <tr>
            <th scope="col">STT</th>
            <th scope="col">HỌ VÀ TÊN</th>
            <th scope="col">SỐ ĐIỆN THOẠI</th>
            <th scope="col">ĐỊA CHỈ</th>
            <th scope="col">TÊN ĐĂNG NHẬP</th>
            <th scope="col">THAO TÁC</th>
          </tr>
        </thead>
        <tbody class="table-primary">
          <tr v-for="(e, i) in this.users">
            <th scope="row">{{ i + 1 }}</th>
            <td>{{ e.name }}</td>
            <td>{{ e.phone }}</td>
            <td>{{ e.address }}</td>
            <td>{{ e.account.username }}</td>
            <td>
              <button class="btn btn-white px-2 rounded-0" @click="this.delete(e._id)">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script>
import UserService from '@/services/user.service';
export default {
  data() {
    return {
      users: [],
      data: {
        account: {
        }
      },
    }
  },
  methods: {
    async getData() {
      this.users = await UserService.getAll();
      this.users = this.users.reverse();
    },
    async handleAdd() {
      await UserService.create(this.data);
      this.getData();
    },
    async handleUpdate() {
      try {
        if (confirm('Xác nhận cập nhật??')) {
        const rs = await UserService.update(this.data._id, this.data);
        alert(rs.message);
      }
      this.getData();
      } catch (error) {
        alert(error)
      }
    },
    async delete(id) {
      try {
        if(confirm('Chắc chắn xóa??')){
        const rs = await UserService.delete(id);
        alert(rs.message);
      }
      this.getData();
      } catch (error) {
        alert(error)
      }
    }
  },
  mounted() {
    this.getData();
  }
}
</script>