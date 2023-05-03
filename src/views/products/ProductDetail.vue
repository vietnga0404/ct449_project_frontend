
<template>
    <main v-if="this.product._id != null">
        <div class="container-fluid mb-5 position-relative " style="height:500px; width: 1000px;;">
            <center><h1 class="order">Xác nhận thông tin đặt hàng</h1></center> <hr>
            <form class="row g-3">
                <div class="col-md-6">
                  <label  class="form-label">Tên khách hàng</label>
                  <input v-model="this.data.name" type="text" class="form-control" >
                </div>
                <div class="col-md-6">
                    <label  class="form-label">Số điện thoại</label>
                    <input v-model="this.data.phone" type="text" class="form-control" >
                  </div>
                
                <div class="col-6">
                  <label  class="form-label">Địa chỉ nhận hàng</label>
                  <input v-model="this.data.address" type="text" class="form-control"  >
                </div>
                <div class="col-6">
                  <label  class="form-label">Số lượng</label>
                  <input v-model="this.data.amount" type="number" class="form-control rounded-0"  >
                </div>
                
                <center>
                    <div class="col-12">
                        <button @click="this.handleSubmit()"  type="button" class="btn btn-primary">Đặt hàng</button>
                      </div>
                </center>
              </form>
        </div> 
    </main>
</template>
<style scoped>

@import "@/assets/css/detail.css";

main {
    font-family: "MBCorpo Title", "DaimlerCAC-Regular", "DaimlerCACArab-Regular", serif;
}
.order{
    margin-top: 30px;
    margin-bottom: 50px;
}
</style>


<script>
import ProductService from '@/services/product.service';
import OrderService from '@/services/order.service';
import { useUserStore } from "@/stores/UserStore";
export default {
    data() {
        const userStore = useUserStore();
        return {
            product: {},
            userStore,
            data: {}
        }
    },
    methods: {
        async getData() {
            this.product = await ProductService.get(this.$route.params.id);
            this.data = this.userStore.user
        },
        async handleSubmit() {
            try {
                await OrderService.create({ ...this.data, nameProduct: this.product.name});
                alert("Đặt hàng thành công!")
            } catch (error) {
                alert('Đặt hàng không thành công')
            }
        this.getData();
        }
    },
    created() {
        this.getData();
    }

}
</script>