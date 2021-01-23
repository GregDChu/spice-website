<template>
    <div id="bill-info">
        <form>
        <h1> Billing Info</h1>
        <input type="text" name="fname" placeholder="Name on Card" v-model="billing.name">
        <input type="text" name="creditcard" placeholder="Card Number" v-model="billing.num">
        <input type="text" name="date" placeholder="Expires" v-model="billing.exp">
        <input type="text" name="cvv" placeholder="CVV" v-model="billing.cvv">
        <h1>Billing Address</h1>
        <input type="checkbox" value="checkbox" style="display: inline;" v-model="sameAsShip">
        <label>Billing Address is same as Shipping Address</label>
        <div v-if="!sameAsShip">
          <input type="text" name="street" placeholder="Street Address" v-model="address.street">
          <input type="text" name="city" placeholder="City" v-model="address.city">
          <input type="text" name="state" placeholder="State" v-model="address.state">
          <input type="text" name="zip" placeholder="Zip" v-model="address.zip">
        </div>
        </form>
    </div>
</template>

<script>
export default {
  name: "CustomerInfo",
  computed: {
    verifyInfo() {
      let cardVerified = true;
      for(var field in this.billing) {
        cardVerified = cardVerified && (this.billing[field] != "");
      }
      let adrsVerified = true;
      for(var field in this.address) {
        adrsVerified = adrsVerified && (this.address[field] != "");
      }
      return cardVerified && (this.sameAsShip || adrsVerified);
    }
  },
  data() {
    return {
      hideDetails: true,
      user_data:
        {
          uid: 0,
          f_name: "Beanut",
          l_name: "Putter",
          ccid: 123,
          address_id: 4,
          email: "mchammer@email.com",
          Pass: "youcanttouchthis",
          Permission: 0
        },
      billing: {
        name: "",
        num: "",
        exp: "",
        cvv: ""
      },
      address: {
        street: "",
        city: "",
        state: "",
        zip: ""
      },
      sameAsShip: false
    };
  }
};
</script>

<style scoped>
#bill-info {
  width: 500px;
  border-radius: 5px;
  border-bottom: solid 1px darkgray;
  background-color: #8d9b77;
  padding: 10px;
  margin: 10px auto 10px auto;
  display: block;
}

input {
  display: block;
}

h1 {
  font-weight: bold;
  font-size: 16pt;
}
h4 {
  font-weight: bold;
  text-align: center;
}
button {
  width: 25%;
  margin: auto;
  display: block;
}
.hidden {
  display: none;
}
.window {
  top: 10%;
  left: 25%;
  position: absolute;
  width: 50%;
  margin: auto;
  padding: 0;
  background-color: #8d9b77;
}
.center {
  display: block;
  margin: auto;
}
.background {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #8d9b77;
  z-index: 0;
}
</style>