<template>
  <div>
    <div class="manageLink" style="position: relative;">
    <b-loading :is-full-page="false" :active.sync="changingAccount" style="z-index: 1;" />
      <p>{{firstname + " " + lastname}}<br>
        {{email}}</p>
      <b-field label="Permissions">
        <b-select v-model="p">
          <option value="3">Remove Staff</option>
          <option value="2">Staff</option>
          <option value="1">Admin</option>
        </b-select>
        <button v-on:click="this.changePerms">Save</button>
      </b-field>
    </div>
    <br>
  </div>
</template>

<script>
export default {
  name: "account_card",
  props: {
    firstname: String,
    lastname: String,
    email: String,
    perm: Number
  },
  data(){
    return {
      p : this.perm,
      changingAccount: false
    };
  },
  methods: {
    changePerms: function(){
      this.changingAccount = true;
      this.$store.dispatch("updatePerm", {email: this.email, perm: this.p}).then(() => {
        this.$emit('perm-change');
        this.changingAccount = false;
      });
    }
  }
};
</script>

<style scoped>
div{
  float: bottom;
}
#accountInfo{
  background: #6e795d;
  border-radius: 5px;
  color: #eeeeee;
  font-weight: bold;
  font-size: 18pt;
}

.manageLink{
  /* float:left; */
  margin-left: -1px;
  margin-top: 5px;
  padding: 5px;
  background-color: rgba(0, 0, 0, 0);
  border: solid 1px #7aa256;
  border-radius: 0;
  color: #7aa256;
  cursor: pointer;
}

button {
  margin-left: -1px;
  margin-top: 5px;
  padding: 5px;
  background-color: rgba(0, 0, 0, 0);
  border: solid 1px #7aa256;
  border-radius: 0;
  color: #7aa256;
  cursor: pointer;
}

ul {
  list-style-type: none;
  padding: 10px;
}
li {
  /* display: inline-block; */
  margin: 10px;
}
</style>
