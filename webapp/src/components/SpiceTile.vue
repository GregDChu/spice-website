<template>
  <div style="margin: 0px; padding: 0px; display:inline-block;">
    <div class="spice-tile" v-if="spice.stock > 0" v-on:click="toggleDetails">
      <img :src='spice.image'>
      <h4 style="margin-bottom: 5px;">{{spice.title.charAt(0).toUpperCase() + spice.title.slice(1).toLowerCase()}}
        <span v-if="spice.sale > 0" style="color: red;"> - {{spice.sale}}% off!</span>
      </h4>

      <div v-if="spice.sale > 0" style="color: black; text-align: center;">
        <p style="text-decoration: line-through;">${{getPrice().toFixed(2)}}</p>
        <p style="color:red"> {{" → $" + getSalePrice().toFixed(2)}}</p>
      </div>
      <div v-else style="text-align: center">
        <p style="color:black">{{"$" + getPrice().toFixed(2)}}</p>
      </div>
      <button v-on:click.stop="edit" v-if="this.$store.state.loginState.loggedIn && this.$store.state.loginState.user.permission <= 1">
        EDIT
      </button>
    </div>
    <div :class="[hideDetails ? 'hidden' : 'background']" v-on:click="toggleDetails">
    </div>
    <div :class="[hideDetails ? 'hidden' : 'window']" >
      <SpiceInfo class="center" v-bind:id="spice.id"/>
    </div>
  </div>
</template>

<script>
import SpiceInfo from "./SpiceInfo.vue"
export default {
  name: "SpiceTile",
  components: { SpiceInfo },
  props: {
    visible: {type: Boolean, default: false},
    id: Number
  },
  computed: {
    spice: {
      get: function() {
        return this.$store.state.spices.find(spice => {
          return (spice.id == this.$props.id)
        });
      },
      set: function(val) {

      }
    },
  },
  methods: {
    toggleDetails() {
      this.hideDetails = !this.hideDetails;
      if (!this.hideDetails) {
        this.$router.push({name: 'Shop', params: {item: this.spice.title}});
      } else {
        this.$router.push({name: 'Shop'})
      }
      // this.hideDetails = !this.hideDetails;
      //this.$refs.SpiceInfo.modalActive = true;
    },
    edit() {
      this.$router.push({name: 'spices', params: {spice: this.spice.id}});
    },
    getPrice() {
      return (this.spice.unit_price / 100.0);
    },
    getSalePrice() {

      return (this.spice.unit_price / 100.0) * ((100.0 - this.spice.sale) / 100.0);
    }
  },
  data() {
    return {
      hideDetails: !this.visible,
      tags: []
    }
  }
}
</script>

<style scoped>
.spice-tile {
  width: 200px;
  border-radius: 5px;
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
p{
  display: inline;
}
h4 {
  font-weight: bold;
  text-align: center;
}
button {
  background-color: transparent;
  color: #fbf3e4;
  border: solid 1px #cc783c;
  padding: 5px;
  cursor: pointer;
  margin: 0 auto -1px auto;
  display: block;
  width: 50%;
}
button:hover{
  color: #aaaaff;
}
.hidden {
  display: none;
}
.window {
  top: 10%;
  left: 25%;
  position: fixed;
  width: 50%;
  margin: auto;
  padding: 0;
  background-color: rgba(0, 0, 0, 0);
}
.background {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 0;
}
a {
  color: white;
  width: 100%;
  height: 100%;
}
</style>
