<template>
    <div>
        <div>
            <CartTile></CartTile>
            <CustomerInfo></CustomerInfo>
            <b-button v-on:click="change=!change">Change Info</b-button>
            <ShippingInfo :class="{Ship : change}"></ShippingInfo>
            <br>
        </div>
    </div>
</template>

<script>
import CustomerInfo from "@/components/CustomerInfo.vue"
import CartTile from "@/components/CartTile.vue"
import ShippingInfo from "@/components/ShippingInfo.vue"

export default {
    name: "Confirmation",
    components: {
        CustomerInfo,
        CartTile,
        ShippingInfo
    },
    data() {
        return {
            change: false,
            colors: [{
                name: "Red",
                hex: "#FF0000"},
                {
                name: "Green",
                hex: "#00FF00"},
                {
                name: "Orange",
                hex: "#FF8888"},
                {
                name: "Yellow",
                hex: "#FFFF00"},
                {
                name: "Blue",
                hex: "#0000Ff"}]
        }
    }
}
</script>

<style scoped>
.Ship{display:none;}
</style>