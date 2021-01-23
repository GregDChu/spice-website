<template>
  <div v-if="this.$store.dispatch('authorized', 0)" class="section">
    <b-loading :is-full-page="true" :active.sync="staffLoading" style="z-index: 1;" />
    <!-- <SearchBar/> -->
    <span class="has-text-danger" v-if="error">User not available to change, account may not exist.</span>
    <router-link to="/dashboard">
      <div class="manageLink">
        Back
      </div>
    </router-link>
    <br>
    <b-field label="Add Staff Member" style="margin-left:5px;">
      <br>
      <b-input
      type="email"
      v-model="newStaff"
      placeholder="Staff Email"
      ></b-input>
      <button v-on:click="addStaff">Add</button>
    </b-field>
    <template v-for="account in accounts">
      <AccountCard v-on:perm-change="getAccounts()" v-if="account.permission > 0 && account.permission < 3" v-bind:email="account.email" v-bind:firstname="account.firstname" v-bind:lastname="account.lastname" v-bind:perm="account.permission" />
      </template>
      <!-- <AccountCard firstname="Alice" lastname="Kwan" email="email@email.com" v-bind:perm="2" /> -->
      <!-- <AccountCard/>
      <AccountCard/> -->
      <br>
    </div>
  </template>

  <script>
  // @ is an alias to /src
  import SearchBar from "@/components/SearchBar.vue";
  import AccountCard from "@/components/AccountCard.vue";

  export default {
    name: "staff",
    components: {
      SearchBar,
      AccountCard
    },
    methods: {
      getAccounts: function(){
        this.staffLoading = true;
        return this.$store.dispatch("getAccounts").then((response) => {
          this.accounts = response;
          this.staffLoading = false;
          this.$forceUpdate();
        });
      },
      addStaff: function(){
        this.staffLoading = true;
        this.$store.dispatch("updatePerm", {email: this.newStaff, perm: 2}).then(() => {
          this.getAccounts();
          this.error = false;
        }, () => {
          this.staffLoading = false;
          this.error = true;
        });
      }
    },
    data(){
      return {
        accounts: [],
        newStaff: "",
        error: false,
        staffLoading: false
      }
    },
    created(){
      this.getAccounts();
    }
  };
  </script>

  <style scoped>
  #accountInfo{
    background: #6e795d;
    border-radius: 5px;
    color: #eeeeee;
    font-weight: bold;
    font-size: 18pt;
  }

  .manageLink{
    float:left;
    margin-left: 5px;
    margin-top: 5px;
    padding: 5px;
    background-color: rgba(0, 0, 0, 0);
    border: solid 1px #7aa256;
    border-radius: 0;
    color: #7aa256;
    cursor: pointer;
  }

  .manageLink:hover {
    color: #9ad466;
  }

  button {
    margin-left: 5px;
    margin-right: 5px;
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
    display: inline-block;
    margin: 10px;
  }

  br{
    display:block;
    margin:5px;
  }

  </style>
