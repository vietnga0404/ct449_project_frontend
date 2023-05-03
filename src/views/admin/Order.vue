<template>
  <div class="container" style="min-height: 100vh">
    <div class="row san-pham mt-4">
      <div class="thong-ke text-center mb-3">
        <h4 class=" fw-bold">QUẢN LÝ ĐƠN HÀNG</h4>
      </div>
      
      <table class="table  text-center">
        <thead class="text-white" style="background-color: #ff884d;">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">KHÁCH HÀNG</th>
            <th scope="col">SỐ ĐIỆN THOẠI</th>
            <th scope="col">ĐỊA CHỈ</th>
            <th scope="col">SẢN PHẨM</th>
            <th scope="col">SỐ LƯỢNG</th>
            <th scope="col">NGÀY ĐẶT HÀNG</th>
          </tr>
        </thead >
        <tbody class="align-middle table-primary">
          <tr v-for="(e, i) in this.orders" :key="i">
            <th >{{ i + 1 }}</th>
            <td class="fw-bold">{{ e.name }}</td>
            <td>{{ e.phone }}</td>
            <td>{{ e.address }}</td>
            <td class="fw-bold">{{ e.product.name }}</td>
            <td class="fw-bold">{{ e.amount }}</td>
            <td>{{ e.time_start }}</td>

          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script>
import OrderService from '@/services/order.service';
export default {
  data() {
    return {
      orders: [],
      allOrder: [],
    }
  },
  methods: {
    async getData() {
      this.allOrder = await OrderService.getAll();
      this.orders = this.allOrder.filter((e) => e.status == null)
    },
  },
  created() {
    this.getData();
  }
}
</script>