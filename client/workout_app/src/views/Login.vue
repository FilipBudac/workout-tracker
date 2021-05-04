<template>
  <div>
    <b-container>
      <b-row class="d-flex justify-content-center">
        <b-card class="mt-3" header="Login Form" style="width: 24rem;">
          <b-form @submit.prevent="onLogin">

            <b-form-group
                id="input-group-1"
                label="Username:"
                label-for="input-1"
                align="left"
            >
              <b-form-input
                  id="input-1"
                  v-model="form.username"
                  placeholder="Enter username"
                  required
              ></b-form-input>

            </b-form-group>

            <b-form-group
                id="input-group-2"
                label="Your Password:"
                label-for="input-2"
                align="left"
            >

              <b-form-input
                  id="input-2"
                  v-model="form.password"
                  type="password"
                  placeholder="Enter password"
                  required
              ></b-form-input>

            </b-form-group>

            <b-button class="mr-1" type="submit" variant="primary">Login</b-button>
          </b-form>
        </b-card>
      </b-row>

      <b-row class="d-flex justify-content-center" v-if="errors && errors.length">
        <b-card class="mt-3" header="Form Data Result" style="width: 24rem;">
          <ul>
            <li v-for="error in errors" :key="error.message">
              {{error.message}}
            </li>
          </ul>
        </b-card>
      </b-row>

    </b-container>
  </div>
</template>

<script>
import {LOGIN} from "@/store/actions/auth";
import Toaster from "@/common/toaster";

export default {
  name: "Login",
  data () {
    return {
      form: {
        username: "",
        password: ""
      },
      errors: []
    }
  },
  methods: {
    logInFailed(response) {
      return 'status' in response && response !== 200
    },
    async onLogin() {
      const payload = {
        "grant_type": "password",
        "client_id": process.env.VUE_APP_CLIENT_ID,
        "username": this.form.username,
        "password": this.form.password
      }

      try {
        const response = await this.$store.dispatch(LOGIN, payload)

        if (this.logInFailed(response)) {
          Toaster.errorMessage('Log in failed. Invalid credentials were given.', 'error')
          return
        }

        Toaster.successMessage('You are logged in.', 'login')
        await this.$router.push({name: "home"})

      } catch (e) {
        this.errors.push(e)
      }
    },
  }
}
</script>

<style scoped>

</style>