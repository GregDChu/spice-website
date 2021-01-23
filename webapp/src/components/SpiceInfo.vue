<template>
  <div class="spice-info">
    <div class="desc">
      <img :src='spice.image' />
      <h4>{{spice.title}}</h4>
      <p style="margin-bottom: 5px;">
        {{spice.description}}
      </p>
      <p class="tag" v-for="tag in spice.tags">{{tag.title}}</p>
    </div>
    <div class="purchase">
      <form>
        <p>Amount: </p>
        <input type="number" v-model.number="amount" min="20" :max="spice.stock"/><p> g</p>
        <br/>
        <div v-if="spice.sale > 0" style="color:red;">
          <p style="color:red;"> {{" $" + (this.amount * spice.unit_price * (100.0 - spice.sale) / 10000.0).toFixed(2)}}</p>
          <br>
          <p style="text-decoration: line-through;">${{(this.amount * spice.unit_price / 100.0).toFixed(2)}}</p>
          <p> {{spice.sale}}% off!</p>
        </div>
        <div v-else>
          <p>{{getPrice()}}</p>
        </div>
      </form>
      <p style="color: red; display: block;">{{warnText}}</p>
      <button @click="addToCart">Add to Cart</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SpiceInfo",
  props: {
    id: Number
  },
  computed: {
    spice: {
      get: function() {
        return this.$store.state.spices.find(spice => {
          return (spice.id == this.$props.id)
        });
      },
      set: function(obj) {
        this.$store.dispatch("softUpdateSpice", obj);
      }
    },
    duplicateCartItem() {
      return this.$store.state.cart.find(item => { return item.spice.id == this.spice.id});
    }
  },
  methods: {
    getPrice(){
      return "$" + (this.amount * (this.spice.unit_price / 100.0) * ((100.0 - this.spice.sale) / 100.0)).toFixed(2);
    },
    addToCart() {
      this.warnText = "";
      if(this.amount > this.spice.stock) {
        this.amount = this.spice.stock;
        this.warnText = "Sorry, we don't have that much " + this.spice.title + " in stock...";
      } else if(this.duplicateCartItem != undefined) {
        let spiceCopy = Object.assign({}, this.spice);
        this.$set(this.spice, 'stock', this.spice.stock - this.amount);
        let dupItem = this.duplicateCartItem;
        this.$store.dispatch("updateCartItem", {index: dupItem.index, spice: dupItem.spice, amount: dupItem.amount + this.amount})
      }else if(this.amount >= 20) {
        let spiceCopy = Object.assign({}, this.spice);
        this.$set(this.spice, 'stock', this.spice.stock - this.amount);
        this.$store.dispatch("addToCart", {index: this.$store.state.cart.length,
          spice: spiceCopy,
          amount: this.amount});
        }
      }
    },
    data() {
      return {
        amount: 20,
        warnText: ""
      }
    }
  }
  </script>

  <style scoped>
  img {
    width: 50%;
    height: 50%;
    margin: auto;
  }
  h4 {
    font-weight: bold;
  }
  p {
    font-size: 10pt;
  }
  div {
    background-color: #fbf3e4;
  }
  .spice-info {
    border: solid 1px black;
    border-radius: 5px;
    padding: 20px;
    margin-top: 25px;
    overflow: hidden;
    width: 100%;
    background-color: #fbf3e4;
  }
  .desc {
    float: left;
    width: 50%;
    display: inline;
    border-right: solid 1px black;
    margin-right: 15px;
  }

  .purchase {
    display: inline;
  }

  .purchase p {
    display: inline;
  }
  .edit {
    display: block;
  }
  .tag {
    background-color: #8d9b77;
    border-radius: 5px;
    padding: 0 10px 0 10px;
    margin: 0 1px;
  }
  .spice-modal-body {
    float: left;
    background: #fbf3e4;
  }
  .spice-modal-body section {
    width: 50%;
    float: left;
    background: #fbf3e4;
  }

  .noclass {
    background-color: rgb(0,0,0,0);
  }
  </style>
