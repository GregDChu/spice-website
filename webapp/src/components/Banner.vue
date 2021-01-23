<template>
  <div id="banner">
    <router-link :to="link_to">
      <img :src="img_link"/>
    </router-link>
    <div v-if="this.$store.state.loginState.loggedIn && this.$store.state.loginState.user.permission < 2" to="/dashboard" style="position: absolute; top:1%; right:1%; z-index:1">
      <button @click.stop="deleteBanner">DELETE</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Banner",
  data() {
    return {
      updatedInfo: {
        id: this.id,
        img_link: this.img_link,
        link_to: this.link_to
      }
    };
  },
  props: {
    img_link: String,
    link_to: String,
    id: Number
  },
  methods: {
    deleteBanner() {
      this.$store.dispatch("deleteBanner", this.updatedInfo).then(() => {
        this.$emit('changed');
      });
    }
  }
};
</script>

<style scoped>
div {
  width: auto;
  overflow: auto;
  /* border-color: darkslategrey; */
  /* border-radius: 8cm; */
  /* display: inline-block; */
  margin: auto;
  float: left;
}

#banner{
  display: inline-block;
  float: left;
  margin: 7px;
  position: relative;
}

button{
  background:red;
  border-color:red;
  border-radius:3px;
  color:white;
}
</style>
