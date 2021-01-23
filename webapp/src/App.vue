<template>
  <div id="app">
      <!-- {{this.$store.dispatch("checkLogin")}} -->
      <Header/>
      <router-view id="router-view" ref="rview"/>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <!-- <div style="height: 100px;">
      </div> -->
      <Footer/>
      <div class="back-img"></div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
export default {
  components: {
    Header,
    Footer
  },
  data: function() {
    return {
      isLoginModalActive: false
    };
  },
  computed: {
    isLoggedIn: function() {
      return this.$store.state.loginState.loggedIn;
    }
  },
  methods: {
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        return this.$router.push("/");
      });
    }
  },
  mounted: function() {
    this.$store.dispatch("checkLoggedIn");
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #fbf3e4;
}

#router-view {
  padding-bottom: 100px;
}

.back-img{
  /*display: none;*/
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /*background-image: url('./assets/background.jpg');*/
  background-size: 100%;
  z-index: -1;
  background-color: #fbf3e4;
}
</style>
