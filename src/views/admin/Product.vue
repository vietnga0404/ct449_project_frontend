<template>
  <div class="container ps-0" style="min-height: 100vh">
    <div class="row san-pham ms-0">
      <div class="thong-ke text-center mb-3 mt-3">
        <h4 class=" fw-bold ">QUẢN LÝ SẢN PHẨM</h4>
      </div>
      <div class="row">
        <div class=" col-md-12 mb-4 ">
          <div>
            <button type="button" class="btn btn-outline-primary rounded-0" data-bs-toggle="modal"
              data-bs-target="#addProduct">
              <i class="fa-solid fa-plus"></i> Thêm Sản Phẩm     
            </button>
          </div>
        </div>
      </div>
      <table class="table  table-white text-center">
        <thead class=" text-white" style="background-color: #ff884d;">
          <tr>
            <th scope="col">STT</th>
            <th scope="col">HÌNH ẢNH</th>
            <th scope="col" style="width: 50px">TÊN SẢN PHẨM</th>
            <th scope="col">GIÁ</th>
            <th scope="col">THAO TÁC</th>
          </tr>
        </thead>
        <tbody class="align-middle table-primary">
          <tr v-for="(e, i) in this.products" :key="e._id">
            <th scope="row">{{ i + 1 }}</th>
            <td class="px-0 w-25">
              <img class="m-0" :src="'../src/assets/Images/' + e.image" width="190" />
            </td>
            <td class="px-0 w-25">{{ e.name }}</td>
            <td class="px-0 w-25  fw-bold">{{ new Intl.NumberFormat('it-IT', {
                style: 'currency', currency: 'VND'
              }).format(e.price).replace("VND", "")
            }} <i class="fa-solid fa-dong-sign"></i></td>
            <td>
              <button type="button" @click="this.data = e" data-bs-toggle="modal" data-bs-target="#addProduct"
                class="btn btn-white me-1 px-2 rounded-0 ">
                <i class="fas fa-edit" ></i></button>
              <button class="btn btn-white px-2 rounded-0" @click="this.delete(e._id)">
                <i class="fas fa-trash "></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="modal fade" id="addProduct" tabindex="-1" aria-labelledby="addProductLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
        <div class="modal-content rounded-0">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="addProductLabel">Thêm Sản phẩm</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-12">
                <div class="form-floating mb-3">
                  <input v-model="this.data.name" type="text" class="form-control rounded-0" id="floatingInput"
                    placeholder="">
                  <label for="floatingInput">Tên sản phẩm</label>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-floating mb-3">
                  <input v-model="this.data.price" type="number" class="form-control rounded-0" id="floatingInput"
                    placeholder="">
                  <label for="floatingInput">Giá sản phẩm</label>
                </div>
              </div>
            </div> 
            <div class="row">
              <div class="col-md-12">
                <div class="form-floating mb-3">
                  <input type="file" class="form-control rounded-0" @change="this.changeFile"
                    style="padding-top: 1.9rem" id="floatingInput" placeholder="">
                  <label for="floatingInput">Hình ảnh</label>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary rounded-0" data-bs-dismiss="modal">Đóng</button>
            <button v-if="this.data._id != null" type="button" class="btn btn-primary  rounded-0"
              data-bs-dismiss="modal" @click="this.handleUpdate()">Cập nhật</button>
            <button v-else type="button" class="btn btn-primary  rounded-0" data-bs-dismiss="modal"
              @click="this.handleAdd()">Thêm sản phẩm</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn-outline-secondary:focus,
.btn:focus,
.btn-outline-secondary.active:focus {
  box-shadow: none;
}
</style>


<script>
import ProductService from '@/services/product.service';
export default {
  data() {
    return {
      products: [],
      productsTemp: [],
      filter: '',
      data: {
        details: {
          color: {}
        }
      },
      selectedFile: ''
    }
  },
  methods: {
    async getData() {
      this.productsTemp = await ProductService.getAll();
      this.products = this.productsTemp.reverse();
    },
    show(name) {
      this.filter = name;
      this.products = this.productsTemp.filter(e => e.type_id.includes(name) || e.details.fuel.includes(name))
    },
    changeFile(e) {
      const file = e.target.files[0];
      this.selectedFile = file;
    },
    buildFormData(formData, data, parentKey) {
      if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
        Object.keys(data).forEach(key => {
          this.buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
        });
      } else {
        const value = data == null ? '' : data;
        formData.append(parentKey, value);
      }
    },
    async handleAdd() {
      var formData = new FormData();
      formData.append('file', this.selectedFile);
      this.buildFormData(formData, this.data)
      await ProductService.create(formData);
      this.getData();
    },
    
    async handleUpdate() {
      var formData = new FormData();
      formData.append('file', this.selectedFile);
      this.buildFormData(formData, this.data)
      const rs = await ProductService.update(this.data._id, formData);
      this.getData();
      alert(rs.message);
    },
    async delete(id) {
      await ProductService.delete(id);
      this.getData();
    },
    search(title) {
      this.products = this.productsTemp.filter(e => e.name.toLowerCase().includes(title.target.value.toLowerCase()))
    }
  },
  mounted() {
    this.getData();
  }
}
</script>
