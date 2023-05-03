<template>
    <main>
        <div class="container my-5">
            <div class="row table-product">
                <table class="table text-center">
                    <thead class="bg-danger text-white">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">HÌNH ẢNH</th>
                            <th scope="col">TÊN SẢN PHẨM</th>
                            <th scope="col">GIÁ</th>
                            <th scope="col">SỐ LƯỢNG</th>
                            <th scope="col">NGÀY ĐẶT HÀNG</th> 
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(e, i) in this.orders" class="align-middle">
                            <th scope="row">{{ i + 1 }}</th>
                            <td class="col-img">
                                <router-link to="/detail?masp="><img
                                        :src="'../src/assets/Images/' + e.product.image" width="300">
                                </router-link>
                            </td>
                            <td>{{ e.product.name }}</td>
                            <td class="fw-bold">{{ new Intl.NumberFormat('it-IT', {
                                    style: 'currency', currency: 'VND'
                                }).format(e.product.price).replace("VND", "")
                            }} <i class="fa-solid fa-dong-sign"></i>
                            </td>
                            <td class="fw-bold">{{ e.amount }}</td>
                            <td>{{ e.time_start }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </main>
</template>

<style scoped>
@import "@/assets/css/cart.css";
</style>


<script>
import OrderService from '@/services/order.service';
import { useUserStore } from "@/stores/UserStore";
export default {
    data() {
        const userStore = useUserStore();
        return {
            orders: [],
            userStore,
        }
    },
    methods: {
        async getData() {
            if (this.userStore.user.phone != null) {
                this.orders = await OrderService.get(this.userStore.user.phone);
            }
        }
    },
    created() {
        this.getData();
    }
}
</script>