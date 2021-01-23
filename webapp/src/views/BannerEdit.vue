<template>
  <div v-if="this.$store.dispatch('authorized', 1)">
    <div style="border: solid 1px black; width: 50%; padding: 10px;">
      <!-- <button>X</button> -->
      <section>
        <b-loading :is-full-page="true" :active.sync="changingBanners" style="z-index: 1;" />
        <h3>Banner Creation</h3>
        <b-field label="Image Link">
          <b-input
          v-model="img_link"
          placeholder="Image Link"
          required
          ></b-input>
        </b-field>

        <b-field label="Link To...">
          <b-input
          v-model="link_to"
          placeholder="Link to what page"
          required
          ></b-input>
        </b-field>


        <button v-on:click="createBanner()">Save Banner</button>
      </section>
    </div>
    <br>
    <h3> Current Banners</h3>
    <div>
      <ul v-for="i in banners.length">
        <li>
          <banner v-on:changed="getBanners()" v-bind:img_link="banners[banners.length-i].img_link" v-bind:link_to="banners[banners.length-i].link_to" v-bind:id="banners[banners.length-i].id"/>
        </li>
      </ul>
      <!-- <ul v-for="b in this.$store.state.banners">
      <li>
      <banner v-bind:img_link="b.img_link" v-bind:link_to="b.link_to" v-bind:id="b.id"/>
    </li>
  </ul> -->
</div>
</div>
</template>

<script>
import Banner from "@/components/Banner.vue"
export default {
  name: "BannerEdit",
  components: {
    Banner
  },
  methods: {
    createBanner: function(){
      this.changingBanners = true;
      this.$store.dispatch("addBanner", {img_link: this.img_link, link_to: this.link_to,}).then(() => {
        this.changingBanners = false;
        this.getBanners();
      });
    },
    getBanners: function(){
      this.changingBanners = true;
      this.$store.dispatch("getBanners").then(() => {
        this.banners = this.$store.state.banners;
        this.changingBanners = false;
        this.$forceUpdate();
      });
    }
  },
  data(){
    return {
      img_link: "",
      link_to: "",
      banners: [],
      changingBanners: false
    }
  },
  created(){
    this.getBanners();
  }
  // created(){
  //   this.$store.dispatch("getBanners").then((response) => {
  //     this.banners = response;
  //   });
  // }
}
</script>

<style scoped>
div {
  /* border: solid 1px black;
  width: 50%;
  padding: 10px; */
}
button{
  padding: 5px;
  background-color: rgba(0, 0, 0, 0);
  border: solid 1px #7aa256;
  border-radius: 0;
  color: #7aa256;
  cursor: pointer;
}
button:hover{
  color: #9ad466;
}
h3 {
  font-size: 20pt;
  font-weight: bold;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
</style>
