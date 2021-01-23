<template>
    <div>
        <h2>Billed to: {{ user_data.f_name }} {{user_data.l_name }}</h2>
        <h5>Credit Card: {{ user_data.ccid }}</h5>
        <h5>Confirmation Sent To: {{user_data.email}}</h5>
        <h5>Shipping to: {{ user_data.address_id }}</h5>
    </div>
</template>

<script>
export default {
  name: "CustomerInfo",
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
        }
    };
  }
};
</script>

<style scoped>
div {
  width: 1000px;
  border-radius: 5px;
  border-bottom: solid 1px darkgray;
  background-color: #8d9b77;
  padding: 10px;
  margin: 5px;
  display: inline-block;
}
img {
  width: 150px;
  height: 150px;
  margin-left: auto;
  margin-right: auto;
  display: block;
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
  background-color: rgba(0, 0, 0, 0);
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
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 0;
}
</style>