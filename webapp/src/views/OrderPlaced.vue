<template>
    <div>
        <h1>Congratualtions! Your order has been placed.</h1>
        <p>Thank you for your business. We will start processing your order as soon as we can.</p>
        <button>
            <router-link to="shop">Continue Shopping</router-link>
        </button>
    </div>
</template>

<script>
export default {
    name: "OrderPlaced"
}
</script>

<style scoped>
h1 {
    font-size: 25pt;
    color: darkgreen;
    text-align: center;
    margin-top: 40px;
}

p {
    font-size: 12pt;
    text-align: center;
}

button {
    margin: 10px auto;
    display: block;
}
</style>