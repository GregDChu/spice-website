<template>
  <div id="manage-spice" v-if="this.$store.dispatch('authorized', 1)">
    <b-loading :is-full-page="true" :active.sync="spicesLoading" style="z-index: 1;" />
    <router-link to="/dashboard">
      <div style="display: block;">
        Back
      </div>
    </router-link>
    <button @click="hideFields = !hideFields">NEW PRODUCT</button>
    <div id="spice-form" :class="{hide : hideFields}">
      <img :src="newSpice.image"/>
      <h4>New Spice</h4>
      <p>Name</p>
      <input type="text" placeholder="Name" v-model="newSpice.title"/>
      <p>Image URL</p>
      <input type="text" placeholder="Image URL" v-model="newSpice.image"/>
      <p>Description</p>
      <textarea placeholder="Description" v-model="newSpice.description"/>
      <p>Unit Price (cents/gram)</p>
      <input type="number" placeholder="Unit Price (cents/gram)" v-model="newSpice.unit_price"/>
      <p>Sale Amount (0-100%)</p>
      <input type="number" placeholder="Sale Amount (0-100)" v-model="newSpice.sale"/>
      <p>Stock Amount (grams)</p>
      <input type="number" placeholder="Stock Amount" v-model="newSpice.stock"/>
      <p style="color: red" v-if="this.showReqFields">You must enter a Name, Unit Price, and Image.</p>
      <button @click="addSpice">ADD</button>
      <button @click="clearInput">CANCEL</button>
    </div>
    <button @click="hideTags = !hideTags">MANAGE TAGS</button>
    <div id="tag-form" :class="{hide : hideTags}">
      <p>Tags</p>
      <div class="tag" v-for="tag in allTags" style="background-color:#8d9b77; color:white; margin-left:5px;">
        <!-- <input type="checkbox" :value="tag.id" v-model="tags"/> -->
        <button class="delButton" @click="deleteTag(tag)">X</button>
        <label style="background-color:#8d9b77; color:white; margin-left:2px"> {{tag.title}}</label>
      </div>
      <p style="text-align: center;">New Tag</p>
      <input type="text" placeholder="New Tag" v-model="newTag" style="width: 50%; margin: auto;"/>
      <button @click="addTag">Add Tag</button>
    </div>
    <b-field style="width: 50%; margin: auto;">
      <b-input v-model="search" placeholder="SEARCH"/>
    </b-field>
    <SpiceEdit v-for="spice in getSpices"
    v-if="(typeof $route.params.spice == 'undefined' && spice.title.toLowerCase().includes(search.toLowerCase())) || $route.params.spice == spice.id"
    :key="spice.id" v-bind="spice" v-bind:visible="$route.params.spice == spice.id" v-on:changed="updateSpices"/>
  </div>
</template>

<script>
import SpiceEdit from "@/components/SpiceEdit.vue";

export default {
  name: "SpiceManage",
  components: { SpiceEdit },
  created() {
    this.$store.dispatch("getTags", "");
  },
  computed: {
    allTags() {
      return this.$store.state.tags;
    },
    getSpices() {
      return this.$store.state.spices;
    }
  },
  methods: {
    addTag() {
      if(this.newTag != null){
        this.spicesLoading = true;
        this.$store.dispatch("addTag", this.newTag).then(() => {
          this.spicesLoading = false;
        });
        this.newTag = null;
      }
    },
    deleteTag(tag){
      if (!confirm("Are you sure you want to delete " + tag.title + "? This action cannot be undone!")){
        return;
      }
      this.spicesLoading = true;
      this.$store.dispatch("deleteTag", tag).then(() => {
        this.$store.dispatch("getTags", "").then(() => {
          this.spicesLoading = false;
        })
      });
    },
    addSpice() {
      if(this.newSpice.title == "" || this.newSpice.unit_price == "" || this.newSpice.image == "")
      {
        this.showReqFields = true;
      } else {
        this.$store.dispatch("createSpice", Object.assign({}, this.newSpice));
        this.clearInput();
        this.updateSpices();
      }
    },
    clearInput() {
      for (var attrib in this.newSpice) {
        this.newSpice[attrib] = "";
      }
      this.hideFields = true;
      this.showReqFields = false;
    },
    updateSpices() {
      this.spicesLoading = true;
      this.$store.dispatch("getItems", "").then((response) => {
        this.spicesLoading = false;
      });
    }
  },
  mounted() {
    this.updateSpices();
  },
  data() {
    return {
      hideFields: true,
      hideTags: true,
      showReqFields: false,
      newSpice:  {
        title: "",
        unit_price: "",
        stock: 0,
        description: "",
        image: "",
        sale: 0
      },
      spicesLoading: false,
      search: "",
      tags: [],
      newTag: null
    }
  }
}
</script>

<style scoped>
input {
  display: block;
}
.hide {
  display: none;
}

.delButton{
  background-color: white;
  color: red;
  font-size: 10px;
  padding-top: 1px;
  padding-bottom: 1px;
}

.tag {

  border-radius: 10px;
  background-color: #7aa256;
  color: black;
  margin: 3px;
}

button {
  border: solid 1px #7aa256;
  margin: 5px auto 5px auto;
  padding: 5px;
  background-color: white;
  text-align: center;
  color: #7aa256;
  cursor: pointer;
  width: 50%;
  display: block;
}

button:hover {
  color: #9ad466;
}
#manage-spice {
  margin: 30px auto;
}

#spice-form {
  width: 40%;
  margin: auto;

  padding: 15px;
}
#tag-form {
  width: 40%;
  margin: auto;

  padding: 15px;
}

img {
  float: right;
  width: 40%;
}

textarea {
  margin: 5px;
}

input {
  margin: 5px;
}
</style>
