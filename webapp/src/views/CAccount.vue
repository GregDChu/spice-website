<template>
  <div class="CustomerAccount" v-if="this.$store.dispatch('authorized', 4)">
    <h1>My Account</h1>
    <h3>Name: {{ this.$store.state.loginState.user.firstname }} {{ this.$store.state.loginState.user.lastname }}</h3>
    <h3>Email: {{ this.$store.state.loginState.user.email }}</h3>
    <br />
    <h2 style="font-size:24pt; text-align:center; color:#da782f;">My Orders</h2>
    <b-loading :is-full-page="true" :active.sync="ordersLoading" style="z-index: 1;" />
    <Order v-for="order in orders" :key="order.id" v-bind:id="order.id"/>
  </div>
</template>

<script>
import Order from "@/components/Order.vue"
export default {
  name: "custaccount",
  components: {
    Order
  },
  computed: {
    orders() {
      return this.$store.state.orders;
    }
  },
  created() {
    this.ordersLoading = true;
    this.$store.dispatch("getOrders").then((response) => {
      this.ordersLoading = false;
    });
  },
  data() {
    return {
      ordersLoading: false
    }
  }
};
</script>

<style scoped>
div {
  /* background-color: #8d9b77; */
}
h1{
  text-align: center;
  color: #da782f;
  font-size: 62pt;
}
h3{
  font-size: 18pt;
  margin-left: 40px;
}
</style>
