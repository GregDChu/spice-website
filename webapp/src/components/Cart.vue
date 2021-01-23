<template>
    <div id="cart">
        <div class="header">
            <h1>My Cart</h1>
        </div>
        <div class="hide_scroll">
            <div class="content">
                <CartTile v-for="item in cartItems" :index="item.index"/>
            </div>
        </div>
        <div class="footer">
            <p style="display:inline;">Total: ${{cartPrice.toFixed(2)}}</p>
            <div @click="hideCart" style="display: inline;">
            <router-link to="/checkout" style="float: right; display:inline;">Go To Checkout</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import CartTile from "./CartTile.vue"

export default {
    name: "Cart",
    components: { CartTile },
    computed: {
        cartItems() {
            return this.$store.state.cart;
        },
        cartPrice() {
            const prices = this.$store.state.cart.map(item => {
                return item.spice.unit_price * item.amount * (100.0 - item.spice.sale) / 10000.0});
            var sum = 0;
            prices.filter(price => {
                sum += price;
            })
            return sum;
        }
    },
    methods: {
        hideCart() {
            this.$emit('hidecart');
        }
    }
}
</script>

<style scoped>
#cart {
    position: fixed;
    top: 70px;
    right: 0;
    border: solid 1px #7aa256;
    width: 300px;
    border-radius: 5px;
    background-color: rgba(82, 45, 26, 0.8);
    z-index: 1;
}
p {
    color: #7aa256;
}
h1 {
    text-align: left;
    margin: 0;
    font-weight: bold;
    font-size: 26px;
    color: #7aa256;
}
.header {
    padding: 10px;
    border-bottom: solid 1px #7aa256;
    background-color: rgba(82, 45, 26, 1);
    border-radius: 5px 5px 0px 0px;
}
.hide_scroll {
    overflow: hidden;
}
.content {
    width: 120%;
    overflow-y: scroll;
    height: 340px;
}
.footer {
    border-top: solid 1px #7aa256;
    padding: 10px;
    background-color: rgba(82, 45, 26, 1);
    border-radius: 0px 0px 5px 5px;
}
#exit {
    float: right;
    position: relative;
}
a{
    color:#cc783c;
}
</style>
