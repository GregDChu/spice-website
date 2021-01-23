<template>
  <div style="text-align: center;">
    <div class="container">
      <img width=100%; src="../assets/background.jpg">
      <div class="top-right">
        <h1>The Spice Cabinet</h1>
      </div>

    </div>
    <div style="overflow: auto; margin: auto; width: 70%; text-align: center">
      <banner v-for="i in banners.length" v-on:changed="getBanners()" v-bind:img_link="banners[banners.length-i].img_link" v-bind:link_to="banners[banners.length-i].link_to" v-bind:id="banners[banners.length-i].id"/>
      <!-- <ul >
        <li>
        </li>
      </ul> -->
    </div>
  </div>
</template>

<script>
import Banner from "./Banner.vue";
export default {
  name: "HelloWorld",
  components: {
    Banner
  },
  props: {
    msg: String
  },
  data() {
    return {
      banners: []
    }
  },
  created(){
    this.getBanners();
  },
  methods: {
    getBanners: function(){
      this.$store.dispatch("getBanners").then(() => {
        this.banners = this.$store.state.banners;
        this.$forceUpdate();
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1{
  color: #cc783c;
  font-size: 68px;
  margin:0px;
  text-align:center;
  font-weight: bold;
  background-color: rgba(82, 45, 26, 0.9);

}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.back-img{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('../assets/background.jpg');
  background-size: 100%;
  z-index: -1;
}
.container {
  position: relative;
  text-align: center;
  color: #fbf3e4;
}
.top-right {
  position: absolute;
  top: 8px;
  right: 16px;
}
</style>
