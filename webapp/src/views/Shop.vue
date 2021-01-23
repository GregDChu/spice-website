<template>
  <div ref="shopview" style="background-color: #fbf3e4;">
    <div class="filter">
      <h2>FILTERS</h2>
      <b-field label="Search">
        <b-input v-model="search" />
      </b-field>
      <hr>
      <p>Sort By:</p>
      <select v-model="sortby">
        <option v-for="filter in filters" :key="filter.id" :value="filter.id">{{filter.name}}</option>
      </select>
      <hr>
      <p>Tags:</p>
      <input type="checkbox" v-model="sale">
      <label class="tag" for="tag">Sale</label>
      <div v-for="tag in getTags" :key="tag.id">
        <input type="checkbox" :id="tag" :value="tag.title" v-model="selectedTags">
        <label class="tag" :for="tag">{{tag.title.charAt(0).toUpperCase() + tag.title.slice(1).toLowerCase()}}</label>
      </div>
    </div>
    <div class="content">
      <b-loading :is-full-page="false" :active.sync="spicesLoading" style="z-index: 1;" />
      <SpiceTile v-for="spice in getSpices" v-bind="spice" :key="spice.id" v-bind:visible="$route.params.item == spice.title" v-if="spice.stock >= 20"/>
      </div>
    </div>
  </template>

  <script>
  import SpiceTile from "@/components/SpiceTile.vue"
  export default {
    name: "Shop",
    components: {
      SpiceTile
    },
    props: {
      //itag: {type: Array, default: function() {return null}},
      //isale: {type: Boolean, default: function() {return false}}
    },
    computed: {
      getSpices() {
        var filtered = this.filterSpices(this.$store.state.spices);
        if(this.sortby == 0) {
          filtered = filtered.sort(this.alphaSortAscend);
        } else if (this.sortby == 1) {
          filtered = filtered.sort(this.alphaSortDescend);
        } else if (this.sortby == 2) {
          filtered = filtered.sort(this.priceSortAscend);
        } else if (this.sortby == 3) {
          filtered = filtered.sort(this.priceSortDescend);
        }
        return filtered;
      },
      getTags() {
        return this.$store.state.tags;
      },
      sale: {
        get: function() {
          return this.$store.state.shopSale;
        },
        set : function(val) {
          this.$store.dispatch("setShopSale", val);
        }
      },
      selectedTags: {
        get: function() {
          const shopTag = this.$store.state.shopTag;
          return shopTag == null ? this.tags : [... this.tags, shopTag];
        },
        set: function(tags) {
          const shopTag = this.$store.state.shopTag;
          if(!tags.includes(shopTag)) {
            this.$store.dispatch("assignShopTag", null);
          }
          this.tags = tags;
        }
      }
    },
    methods: {
      filterSpices(spices){
        return spices.filter( spice => {
          return (!this.sale || spice.sale > 0) && (!this.selectedTags.length || this.selectedTags.filter(tag => {
            return spice.tags.find(t => {
              return t.title == tag
            })
          }).length > 0) && (spice.title.toLowerCase().includes(this.search.toLowerCase()) ||
          spice.description.toLowerCase().includes(this.search.toLowerCase()) ||
          spice.tags.filter(tag => {
            return tag.title.includes(this.search.toLowerCase())
          }).length > 0);
        })
      },
      priceSortAscend:function(a, b) {
        const aPrice = a.unit_price * ((100.0 - a.sale) / 100.0);
        const bPrice = b.unit_price * ((100.0 - b.sale) / 100.0);
        console.log(a.title, aPrice);
        console.log(b.title, bPrice);
        if(aPrice < bPrice) {
          return -1;
        }
        return 1;
      },
      priceSortDescend:function(a, b) {
        const aPrice = a.unit_price * ((100.0 - a.sale) / 100.0);
        const bPrice = b.unit_price * ((100.0 - b.sale) / 100.0);
        if(aPrice > bPrice) {
          return -1;
        }
        return 1;
      },
      alphaSortAscend:function(a, b) {
        if(a.title  < b.title) {
          return -1;
        }
        return 1;
      },
      alphaSortDescend:function(a, b) {
        if(a.title > b.title) {
          return -1;
        }
        return 1;
      }
    },
    created(){
      this.spicesLoading = true;
      this.$store.dispatch("getTags", "");
      this.$store.dispatch("getItems", "").then(() => {
        this.spicesLoading = false;
      });
      //console.log(this.$route.params.itag);
      //this.tags = [this.$router.params.itag]
    },
    data() {
      return {
        filtered: false,
        filters: [
          {id: 0, name: "Name (A-Z)"},
          {id: 1, name: "Name (Z-A)"},
          {id: 2, name: "Price (Low-High)"},
          {id: 3, name: "Price (High-Low)"}
        ],
        tags: [],
        //sale: false,
        sortby: 0,
        spices: [],
        search: "",
        spicesLoading: false
      }
    }
  }

  </script>

<style scoped>
.filter {
  width: 200px;
  height: 100vh;
  overflow-y: scroll;
  margin-top: 60px;
  /* padding-top: 60px; */
  padding-left: 15px;
  padding-right: 15px;
  /* padding: 60px 15px 60px 15px; */
  border-right: solid 1px black;
  float: left;
  position: fixed;
  left: 0;
  top: 0;
  background-color: #fbf3e4;
}

.filter:after{
  content: "";
  display: block;
  height: 80px;
  width: 100%;
}

.content {
  padding-left: 210px;
  min-height: 100vh;
  height: auto;
  /* overflow-y: scroll; */
}

.tag {
  background-color: #fbf3e4;
  border-radius: 5px;
  font-size: 10pt;
}
p {
  font-size: 14pt;
}
hr{
  background-color: #9ad466;
}
</style>
