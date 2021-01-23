<template>
  <div class="order" style="position: relative;">
    <b-loading :is-full-page="false" :active.sync="changingOrder" style="z-index: 3;" />
    <h2>Order ID: {{id}}</h2>
    <button v-if="verifyAvailable" @click="claimOrder">Claim</button>
    <button v-if="verifyClaimed" @click="finishOrder">Finish</button>
    <input v-if="verifyFinished" type="text" placeholder="Tracking Number"
    v-model="trackNum" style="margin-left: 15px;" :class="{outline : warnUser}"/>
    <button v-if="verifyFinished" @click="archiveOrder">Shipped</button>
    <button @click="clickMethod">Details</button>
    <div :class="{hide : hideDetails}">
      <p><b>For: </b>{{order.user.firstname + " " + order.user.lastname}}</p>
      <p><b>Address: </b>{{order.address}}</p>
      <p><b>Price: </b>${{(order.total_cost / 100.0).toFixed(2)}}</p>
      <p><b>Weight: </b>{{order.total_weight}}g</p>
      <p><b>Status: </b>{{stringStatus}}</p>
      <p v-if="order.tracking_num != ''"><b>Tracking Number:</b> {{order.tracking_num}}</p>
      <p v-if="order.staff_id > -1 && this.$store.state.loginState.user.permission <= 2"><b>Claimed by: </b>{{staffObj.email}}</p>
      <p><b>Items:</b></p>
      <table style="border: 1px solid black;">
        <tr v-for="item in order.order_items" :key="item.id">
          <td><b>{{item.item.title}}</b></td>
          <td>{{item.weight}}g</td>
          <td>${{(item.cost / 100.0).toFixed(2)}}</td>
          <td><img :src='item.item.image' style="height: 60px;"></td>
        </tr>
      </table>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "Order",
  props: {
    id: Number
  },
  data() {
    return {
      hideDetails: true,
      trackNum: "",
      warnUser: false,
      staffObj: {},
      changingOrder: false
    };
  },
  computed: {
    order() {
      return this.$store.state.orders.find(order => {
        return (order.id == this.$props.id);
      })
    },
    stringStatus() {
      let status = this.order.order_status;
      if(status == 2) {
        return "Processing..."
      } else if(status == 1) {
        return "Packaged!"
      } else if(status == 0) {
        return this.order.address == "in store" ? "Ready for pickup!" : "Shipped!";
      }
    },
    verifyAvailable() {
      return this.$store.state.loginState.user.permission <= 2 &&
      this.order.staff_id < 0;
    },
    verifyClaimed() {
      return (this.$store.state.loginState.user.permission <= 2 &&
      this.order.staff_id == this.$store.state.loginState.user.id &&
      this.order.order_status == 2);
    },
    verifyFinished() {
      return (this.$store.state.loginState.user.permission <= 2 &&
      this.order.staff_id == this.$store.state.loginState.user.id &&
      this.order.order_status == 1)
    }
  },
  methods: {
    clickMethod() {
      this.hideDetails = !this.hideDetails;
    },
    claimOrder() {
      this.hideDetails = false;
      this.changingOrder = true;
      this.$store.dispatch("updateOrder",
      Object.assign({}, this.order, {staff_id : this.$store.state.loginState.user.id})).then(() => {
        this.changingOrder = false;
      });
    },
    finishOrder() {
      this.hideDetails = true;
      this.changingOrder = true;
      if(this.order.address == "in store") {
        this.$store.dispatch("updateOrder",
        Object.assign({}, this.order, {order_status : 0})).then(() => {
          this.changingOrder = false;
        });
      } else {
        this.$store.dispatch("updateOrder",
        Object.assign({}, this.order, {order_status : 1})).then(() => {
          this.changingOrder = false;
        });
      }
    },
    archiveOrder() {
      if(this.order.address != 'in store' && this.trackNum == '') {
        this.warnUser = true;
      } else {
        this.changingOrder = true;
        this.warnUser = false;
        this.$store.dispatch("updateOrder",
        Object.assign({}, this.order, {order_status : 0, tracking_num : this.trackNum})).then(() => {
          this.changingOrder = false;
        });
      }
    }
  },
  created(){
    this.$store.dispatch("getUser", this.order.staff_id).then((response) => {
      this.staffObj = response;
    })
  }
};
</script>

<style scoped>
div {
  width: 50%;
  margin: auto;
}
.outline {
  border: 1px solid red;
}
.order {
  border: solid 1px #7aa256;
  /* border: solid 1px black; */
  overflow: hidden;
  padding: 5px;
  background-color: white;
  margin-bottom: -1px;
}
h2 {
  display: inline;
}
button {
  float: right;
  margin-left: -1px;
  padding: 5px;
  background-color: rgba(0, 0, 0, 0);
  border: solid 1px #7aa256;
  border-radius: 0;
  color: #7aa256;
  cursor: pointer;
}
.hide {
  display: none;
}

table {
  border: solid 1px black;
  vertical-align: middle;
}

table tr {
  border: solid 1px black;
}

table td {
  border: solid 1px black;
  padding: 10px;
}
</style>
