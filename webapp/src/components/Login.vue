<template>
  <div >
    <b-modal :active.sync="modalActive" has-modal-card trap-focus>
      <div class="modal-card" style="width:auto">
        <section class="login-modal-body">
          <section class="modal-card-body">
            <div>
              <b-loading :is-full-page="false" :active.sync="loginLoading" style="z-index: 1;" />
              <span class="has-text-danger" v-if="error">Unsuccessful logging in.</span>
              <h3><b>Existing Login</b></h3>
              <b-field label="Email">
                <b-input
                type="email"
                v-model="loginEmail"
                placeholder="Your email"
                required
                ></b-input>
              </b-field>

              <b-field label="Password">
                <b-input
                type="password"
                v-model="loginPassword"
                password-reveal
                placeholder="Your password"
                required
                ></b-input>
              </b-field>
            </div>
            <b-button v-on:click="login">Login</b-button>
          </section>

          <section class="modal-card-body" style="border-left: 3px solid grey">
            <span class="has-text-danger" v-if="serror">Unsuccessful sign up, email may already be in use.</span>
            <h3><b>New User Signup</b></h3>

            <b-field label="First Name">
              <b-input
              v-model="firstname"
              placeholder="John"
              required
              ></b-input>
            </b-field>

            <b-field label="Last Name">
              <b-input
              v-model="lastname"
              placeholder="Smith"
              required
              ></b-input>
            </b-field>

            <b-field label="Email">
              <b-input
              type="email"
              v-model="email"
              placeholder="Your email"
              required
              ></b-input>
            </b-field>

            <b-field label="Confirm Email">
              <b-input
              type="email"
              v-model="emailConf"
              placeholder="Confirm Email"
              required
              ></b-input>
            </b-field>
            <span class="has-text-danger" v-if="email != emailConf">Emails do not match</span>

            <b-field label="Password">
              <b-input
              type="password"
              v-model="password"
              password-reveal
              placeholder="Your password"
              required
              ></b-input>
            </b-field>
            <b-field label="Confirm Password">
              <b-input
              type="password"
              v-model="passwordConf"
              password-reveal
              placeholder="Confirm Password"
              required
              ></b-input>
            </b-field>
            <span class="has-text-danger" v-if="password != passwordConf" style="display:block; float:left;">
              Passwords do not match
            </span>
            <b-button v-on:click="signUp">Sign Up</b-button>
          </section>
        </section>
      </div>

      <div style="width:100%;">
        <footer class="modal-card-foot">
          <button class="button" type="button" v-on:click="modalActive = false">Close</button>
        </footer>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "Login",
  methods: {
    login: function(){
      this.loginLoading = true;
      this.$store.dispatch("login", {email: this.loginEmail, password: this.loginPassword})
      .then(() => {
        this.loginLoading = false;
        this.modalActive = false;
      },
      () => {
        this.error = true;
        this.loginLoading = false;
      })
    },
    signUp: function(){
      this.error = false;
      if (this.email == this.emailConf && this.password == this.passwordConf){
        this.$store.dispatch("signup", {firstname: this.firstname, lastname: this.lastname, email: this.email, password: this.password} )
        .then(() => {
          this.loginEmail = this.email;
          this.loginPassword = this.password;
          this.login();
          // this.modalActive = false;
        },
        () => {
          this.serror = true;
        })
      }
    }
  },
  data() {
    return {
      modalActive: false,
      firstname: "",
      lastname: "",
      loginEmail: "",
      email: "",
      emailConf: "",
      loginPassword: "",
      password: "",
      passwordConf: "",
      error: false,
      serror: false,
      loginLoading: false
    }
  }
};
</script>

<style scoped>
div{
  float: left;
  background: #fbf3e4;
}

h3{
  font-size:16pt;
}
.login-modal-body{
  float: left;
  background: #fbf3e4;
}
.login-modal-body section{
  width: 50%;
  float: left;
  background: #fbf3e4;
}
.login-modal-foot{
  background: #8d9b77;
  width: 100%;
}
footer {
  background: #8d9b77;
  width: 100%;
}

section button {
  margin-top:50px;
  float:right;
  position:sticky;
  bottom:0;
}
</style>
