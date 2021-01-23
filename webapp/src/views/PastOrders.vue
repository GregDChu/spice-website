<template>
  <div class="CustomerAccount" v-if="this.$store.dispatch('authorized', 2)">
    <b-loading :is-full-page="false" :active.sync="ordersLoading" style="z-index: 1;" />
    <h1><b>Past Orders</b></h1>
    <b-field style="width: 50%; margin: auto;">
      <b-input v-model="search" placeholder="Search Order ID"/>
    </b-field>
    <br />
    <Order v-if="order.order_status < 1 && (search == '' || order.id == search)" v-for="order in orders" :key="order.id" :id="order.id"/>
    <router-link to="/dashboard">
      <div class="manageLink">
        Back
      </div>
    </router-link>
  </div>
</template>

<script>
import Order from "@/components/Order.vue"
export default {
  name: "PastOrders",
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
    // this.$store.dispatch()
    this.$store.dispatch("getAllOrders").then((response) => {
      // console.log(response);
      this.ordersLoading = false;
      this.$forceUpdate();
    });
  },
  data() {
    return {
      ordersLoading: false,
      search: ""
    }
  }
};
</script>

<style scoped>

button {
  margin-left: -1px;
  padding: 5px;
  background-color: rgba(0, 0, 0, 0);
  border: solid 1px #7aa256;
  border-radius: 0;
  color: #7aa256;
  cursor: pointer;
}
</style>
