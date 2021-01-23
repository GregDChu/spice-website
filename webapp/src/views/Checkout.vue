<template>
    <div class="back">
      <b-loading :is-full-page="true" :active.sync="submittingOrder" style="z-index: 1;" />
        <div>
            <div id="purchases">
                <h4>Your Items</h4>
                <CartTile v-for="item in cartItems" :key="item.index" :index="item.index" style="margin: auto;"/>
            </div>
            <ShippingInfo ref="ship_info"/>
            <BillingInfo ref="bill_info"/>
            <br>
            <p style="color: red; display: block; text-align: center;">{{this.warnText}}</p>
            <button v-if="cartItems.length > 0" @click="sendOrder">Place Order</button>
        </div>
    </div>
</template>

<script>
import ShippingInfo from "@/components/ShippingInfo.vue"
import BillingInfo from "@/components/BillingInfo.vue"
import CartTile from "@/components/CartTile.vue"
import router from "@/router.js";

export default {
    name: "Checkout",
    components: {
        ShippingInfo,
        BillingInfo,
        CartTile
    },
    computed: {
        cartItems() {
            return this.$store.state.cart;
        },
        shipAddress() {
            return this.$refs.ship_info.address;
        }
    },
    methods: {
        sendOrder() {
            let address = this.$refs.ship_info.getAddress;
            let shipComp = this.$refs.ship_info;
            let billComp = this.$refs.bill_info;
            if(!shipComp.verifyAddress) {
                this.warnText = "Please fill out all of your shipping information.";
            } else if(!billComp.verifyInfo) {
                this.warnText = "Please fill out all of your billing information.";
            } else if(shipComp.inStore && billComp.sameAsShip){
                this.warnText = "You cannot set your billing address to \
                the same as shipping if you're picking up your order in store.";
            } else {
              this.submittingOrder = true;
                this.$store.dispatch("sendOrder", address).then(() => {
                  this.submittingOrder = false;
                  router.push({name: 'complete'});
                }, () => {
                  this.warnText = "Something went wrong when placing the order,\nour stock may be too low, please refresh the page and try again."
                });
            }
        }
    },
    data() {
        return {
            warnText: "",
            submittingOrder: false
        }
    }
}
</script>

<style scoped>
#purchases {
    width: 40%;
    margin: auto;
    background-color: #8d9b77;
    padding: 10px;
    margin-top: 30px;
    border: solid 1px black;
}
button {
    margin: auto;
    display: block;
}

h4 {
    font-size: 16pt;
    text-align: center;
    border-bottom: solid 1px black;
    margin-bottom: 10px;
}

.back {
    background-color: #fbf3e4;
}
</style>
