<script>
import AppHeader from "@/components/AdminHeader.vue";
import SideBar from "@/components/AdminSidebar.vue";

export default {
  components: {
    AppHeader,
    SideBar,
  },
};
</script>

<template>
  <div>
    <div class="container-fluid p-0">
      <div class="row p-0 m-0">
        <div class="col-1 text-light sidebars" style="background-color: #ff884d;">
          <SideBar />
        </div>
        <div class="col-11 main-admin p-0">
          <AppHeader />
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import "@/assets/css/admin.css";
</style>
