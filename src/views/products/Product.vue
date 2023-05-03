
<template>
  <main>
    <div class="container text-left my-5">
      <center><h3><b>Tất cả sản phẩm</b></h3></center> <hr>
        <div class="col-lg-12">
          <div class=" row ms-4 ">
            <div v-for="(e, i) in this.products" :key="i"
              class=" product  p-2 col-sm-6 col-md-6 col-lg-4 mb-3 text-center ">
              <router-link :to="'/product/' + e._id"><img :src="'../src/assets/Images/' + e.image"
                  class="w-50 h-70 " />
              </router-link>
              <p class="fw-bold m-0 mb-3 h5" >{{ e.name }}</p>
              <div class=" mt-3 py-2 bg-light">
                <b class="text-secondary m-0">Giá: </b>
                <b>{{ new Intl.NumberFormat('it-IT', {
                    style: 'currency', currency: 'VND'
                  }).format(e.price).replace("VND", "")
                }} <i class="fa-solid fa-dong-sign"></i></b>
              </div>
            </div>
          </div>
        </div>
    </div>
  </main>
</template>

<style scoped>

.product{
  border-radius: 2%;
  border: 2px solid #993000;
}

</style>


<script>
import ProductService from '@/services/product.service';

export default {
  data() {
    return {
      products: [],
      productsTemp: [],
      filter: ''
    }
  },
  methods: {
    async getData() {
      this.productsTemp = await ProductService.getAll();
      this.products = this.productsTemp;
    },
  },
  mounted() {
    this.getData();
  }
}
</script>
