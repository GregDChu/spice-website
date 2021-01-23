<template>
    <div class="carttile">
        <button style="float: right" @click="deleteItem">X</button>
        <h3 style="margin:0; color: #cc783c;">{{spice.title}}</h3>
        <img style="float: left" :src="spice.image">
        <div class="info">
            <input style="width: 50px" type="number" min="20" v-model.number="amount" :max="spice.stock">
            <p style="display: inline"> g</p>
            <p style="margin: 0">Price: ${{(spice.unit_price * amount * (100.0 - spice.sale) / 10000.0).toFixed(2)}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "CartTile",
    props: {
        index: Number
    },
    methods: {
        deleteItem() {
            let spiceCopy = Object.assign({}, this.spice);
            spiceCopy.stock = this.spice.stock + this.amount;
            this.$store.dispatch("softUpdateSpice", spiceCopy);
            this.$store.dispatch("deleteCartItem", this.index);
        }
    },
    computed: {
        spice: {
            get: function() {
                return this.$store.state.cart.find(item => {
                    return item.index == this.$props.index
                }).spice;
            }
        },
        amount: {
            get: function() {
                return this.$store.state.cart.find(item => {
                    return item.index == this.$props.index
                }).amount;
            },
            set: function(val) {
                if(val > this.spice.stock) {
                    val = this.spice.stock;
                }
                let spiceCopy = Object.assign({}, this.spice);
                spiceCopy.stock = this.spice.stock - val;
                this.$store.dispatch("softUpdateSpice", spiceCopy)
                this.$store.dispatch("updateCartItem", {index: this.index, spice: this.spice, amount: val});
            }
        }
    }
    // TODO Compute the amount from the store and update according
}
</script>

<style scoped>
h3{
    color: #cc783c;
    margin:0;
}
.carttile {
    background-color: #fbf3e4;
    width: 80%;
    margin: 10px;
    display: block;
    padding: 5px;
    overflow: auto;
    border-bottom: solid 1px #5e5d5a;
    border-radius: 5px;
    color: #cc783c;
}
.info {
    text-align: left;
}
img {
    width: 50px;
    display: inline;
}
</style>
