<template>
  <div id="header">
    <div id="brand">
      <router-link to="/" style="margin: 0;">
        <h1>The Spice Cabinet</h1>
      </router-link>
    </div>

    <div id="user-links">
      <div v-if="this.$store.state.loginState.loggedIn" style="display: inline">
        <router-link to="/myaccount"><b>Hi,
          {{this.$store.state.loginState.user.firstname}}</b>
        </router-link>
        <button @click="logout" class="user-button">LOGOUT</button>
      </div>
      <div v-else style="display: inline">
        <button @click="toggleLogin" class="user-button">LOGIN</button>

      </div>
      <Login ref="login"/>
      <button v-if="this.$store.state.loginState.loggedIn"
      @click="toggleCart" class="user-button">CART</button>
      <div id="outside-cart" v-if="!hideCart" @click="hideCart = true">
      </div>
      <Cart :class="{hidden : hideCart}" v-on:hidecart="hideCart = true"/>
      <router-link v-if="this.$store.state.loginState.loggedIn &&
      this.$store.state.loginState.user.permission < 3" to="/dashboard" style="margin: 0">
        <button class="user-button">DASHBOARD</button>

      </router-link>
    </div>

    <div id="links">
      <div class="center" id="shop-nav">
        <button @click="sendToShop(null)">SHOP</button>
        <button @click="sendToShop('spice')">SPICES</button>
        <button @click="sendToShop('herb')">HERBS</button>
        <button @click="sendToShop('blend')">BLENDS</button>
        <button @click="sendToShop('sale')">SALES</button>
        <!--<router-link :to="{ name: 'Shop', params: { itags: ['herb'] }}">HERBS</router-link>
        <router-link :to="{ name: 'Shop', params: { itags: ['blend'] }}">BLENDS</router-link>
        <router-link :to="{ name: 'Shop', params: { isale: true }}">SALE</router-link>-->
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from "./SearchBar.vue";
import Login from "./Login.vue";
import Cart from "./Cart.vue";
export default {
  name: "Header",
  components: {
    SearchBar,
    Login,
    Cart
  },
  data() {
    return {
      hideCart: true
    };
  },
  methods: {
    toggleCart() {
      this.hideCart = !this.hideCart;
    },
    toggleLogin() {
      this.$refs.login.modalActive = true;
    },
    logout() {
      this.$store.dispatch("logout");
    },
    sendToShop:function(where) {
      if(where == "sale") {
        this.$store.dispatch("setShopSale", true);
        this.$store.dispatch("assignShopTag", null);
      } else {
        this.$store.dispatch("setShopSale", false);
        this.$store.dispatch("assignShopTag", where);
      }
      this.$router.push({ name: 'Shop'}, () => {});
    }
  }
};
</script>

<style scoped>
@font-face {
  font-family: "Brand Font";
  src: url("../assets/day-roman.regular.ttf") format("truetype");
}

#outside-cart {
    width: 100%;
    height: 100%;
    background-color: transparent;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 0;
}

#header {
  width: 100%;
  padding: 15px;
  border-bottom: solid #7aa256 1px;
  position: sticky;
  top: 0;
  background-color: rgba(82, 45, 26, 0.8);
  display: block;
  z-index: 10;
  height: 60px;
}

#brand {
  float: left;
}
#brand h1 {
  font-family: Brand Font;
  display: inline;
  line-height: 40%;
  color: #7aa256;
  font-size: 16pt;
}

#links {
  width: 100%;
  text-align: center;
}

a {
  color: #cc783c;
  margin: 10px;
}

a:hover {
  color: #f98634;
}

#shop-nav button {
  font-size: 15pt;
  font-weight: bold;
  background: transparent;
  border: none;
  padding: 0px 10px 0px 10px;
  color: #cc783c;
}

#shop-nav button:hover {
  color: #f98634;
  cursor: pointer;
}

#user-links {
  float: right;
}

.user-button{
  margin-left: -1px;;
  padding: 5px;
  background-color: rgba(0, 0, 0, 0);
  border: solid 1px #7aa256;
  border-radius: 0;
  color: #7aa256;
  cursor: pointer;
  display: inline;
}

#user-links button:hover {
  color: #9ad466;
}

.hidden {
  display: none;
}
</style>
