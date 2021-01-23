<template>
    <div class="edit">
        <h1>{{title}}</h1>
        <button @click="updateSpice" >{{editText}}</button>
        <button @click="cancelUpdate" :class="{hide : hideDetails}">CANCEL</button>
        <!-- <button @click="deleteSpice" :class="{hide : !hideWarn}">DELETE</button> -->
        <div :class="{hide : hideDetails}">
            <hr/>
            <p>Name</p>
            <input type="text" v-model="updatedInfo.title"/>
            <p>Unit Price (cents/gram)</p>
            <input type="number" v-model="updatedInfo.unit_price"/>
            <p>Sale Amount (0-100%)</p>
            <input type="number" min=0 max=100 v-model="updatedInfo.sale"/>
            <p>Stock Amount (grams)</p>
            <input type="number" v-model.number="updatedInfo.stock"/>
            <p>Description</p>
            <textarea v-model="updatedInfo.description"/>
            <p>Image URL</p>
            <input type="text" v-model="updatedInfo.image"/>
            <img :src="updatedInfo.image ? updatedInfo.image : image">
            <p>Tags</p>
            <div class="tag" v-for="tag in allTags">
                <input type="checkbox" :value="tag.id" v-model="updatedInfo.tags"/>
                <label style="background-color:#8d9b77; color:white; margin-left:3px"> {{tag.title}}</label>
            </div>
          <button @click="updateSpice" >SAVE</button>
          </div>
        <div :class="{hide : hideWarn}">
            <hr/>
            <button @click="deleteSpice" class="alert">DELETE</button>
            <button @click="hideWarn = true">CANCEL</button>
            <p class="alert"><b>Are you <i>sure</i> you want to delete this spice? This action cannot be undone.</b></p>
        </div>
    </div>
</template>

<script>
export default {
    name: "SpiceEdit",
    props: {
        id: Number,
        title: String,
        unit_price: Number,
        stock: Number,
        description: String,
        image: String,
        sale: Number,
        tags: {type: Array, default: function(){return []}},
        // tags: Array,
        visible: {type: Boolean, default: false}
    },
    //computed:  {},
    data() {
        return {
            editText: "UPDATE",
            hideDetails: !this.visible,
            hideWarn: true,
            updatedInfo: {
                id: this.id,
                title: this.title,
                unit_price: this.unit_price,
                stock: this.stock,
                description: this.description,
                image: this.image,
                tags: this.initTags(),
                sale: this.sale
            }
        }
    },
    computed: {
        allTags() {
            return this.$store.state.tags;
        }
    },
    created() {
        if(this.active) {
            this.updateSpice();
        }
        this.$store.dispatch("getTags", "");
    },
    methods: {
      initTags() {
          var tags = [];
          for (var i = 0; i < this.tags.length; i++){
            tags.push(this.tags[i].id);
          }
          return tags;
        },
        updateSpice() {
            this.hideDetails = !this.hideDetails;
            this.hideWarn = true;
            this.editText = this.hideDetails ? "UPDATE" : "SAVE";
            if(this.hideDetails) {
                this.$store.dispatch("updateSpice", this.updatedInfo);
            }
            this.$emit('changed');
        },
        cancelUpdate() {
            this.hideDetails = !this.hideDetails;
            this.editText = this.hideDetails ? "UPDATE" : "SAVE";
        },
        deleteSpice() {
            this.hideDetails = true;
            this.editText = "UPDATE";
            if(this.hideWarn) {
                this.hideWarn = false;
            } else{
                this.$store.dispatch("deleteSpice", this.updatedInfo);
                this.hideWarn = true;
            }
            this.$emit('changed');
        }
    }
}
</script>

<style scoped>
.edit {
    border: solid 1px black;
    margin: 5px auto 5px auto;
    padding: 5px;
    background-color: white;
    overflow: hidden;
    width: 50%;
}
h1 {
    display: inline;
}
button {
    float: right;
    background-color: rgba(0, 0, 0, 0);
    border: 1px solid #7aa256;
    color: #7aa256;
    margin-left: -1px;
    padding: 5px;
    cursor: pointer;

}
button:hover {
    color: #9ad466;
}

.hide {
    display: none;
}
img {
    display: block;
    width: 100px;
}
.alert {
    color: red;
    display: block;
}
.tag {
    background-color: #8d9b77;
    border-radius: 5px;
    margin: 5px;
}
</style>
