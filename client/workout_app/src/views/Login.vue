<template>
  <div>
    <b-container>
      <b-row class="d-flex justify-content-center">
        <b-card class="mt-3" header-text-variant="white" header-bg-variant="dark" header="Login Form" style="width: 24rem;">
          <b-form @submit.prevent="onLogin">

            <b-form-group
                class="align-text-left"
                id="input-group-1"
                label="Username:"
                label-for="input-1"
            >
              <b-form-input
                  id="input-1"
                  v-model="form.username"
                  placeholder="Enter username"
                  required
              ></b-form-input>

            </b-form-group>

            <b-form-group
                class="align-text-left"
                id="input-group-2"
                label="Your Password:"
                label-for="input-2"
            >

              <b-form-input
                  id="input-2"
                  v-model="form.password"
                  type="password"
                  placeholder="Enter password"
                  required
              ></b-form-input>

            </b-form-group>

            <b-button class="mr-1 w-25 button-bg-color" type="submit" variant="dark">Login</b-button>
          </b-form>
        </b-card>
      </b-row>

<!--      <b-row class="d-flex justify-content-center" v-if="errors && errors.length">-->
<!--        <b-card class="mt-3" header="Form Data Result" style="width: 24rem;">-->
<!--          <ul>-->
<!--            <li v-for="error in errors" :key="error.message">-->
<!--              {{error.message}}-->
<!--            </li>-->
<!--          </ul>-->
<!--        </b-card>-->
<!--      </b-row>-->

    </b-container>
  </div>
</template>

<script>
import Toaster from "@/common/toaster";
import {mapActions} from "vuex";

export default {
  name: "Login",
  data () {
    return {
      form: {
        username: "",
        password: ""
      },
    }
  },
  methods: {
    ...mapActions([
      "loginAction"
    ]),

    async onLogin() {
      const payload = {
        grant_type: "password",
        client_id: process.env.VUE_APP_CLIENT_ID,
        username: this.form.username,
        password: this.form.password
      }

      try {
        await this.loginAction(payload)
        Toaster.successMessage('You are logged in.', 'login')
        await this.$router.push({name: "home"})
      } catch (err) {
        Toaster.errorMessage('Log in failed.', 'error')
      }
    },
  }
}
</script>

<style scoped>


</style>