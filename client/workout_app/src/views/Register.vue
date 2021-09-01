<template>
  <div>
    <b-container>
      <b-row class="d-flex justify-content-center">
        <b-card rounded="lg" header-text-variant="white" header-bg-variant="dark" class="mt-3" header="Register Form" style="width: 24rem;">
          <b-form @submit.prevent="onRegister">
            <b-row>
              <b-col>

                <b-form-group
                    class="align-text-left "
                    id="input-group-5"
                    label="First Name:"
                    label-for="input-5"
                >

                  <b-form-input
                      id="input-3"
                      v-model="form.name"
                      type="text"
                      placeholder="Enter First Name"
                      required
                  ></b-form-input>

                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group
                    class="align-text-left"
                    id="input-group-4"
                    label="Last Name:"
                    label-for="input-4"
                >

                  <b-form-input
                      id="input-4"
                      v-model="form.surname"
                      type="text"
                      placeholder="Enter Last Name"
                      required
                  ></b-form-input>

                </b-form-group>
              </b-col>
            </b-row>

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

            <b-form-group
                class="align-text-left"
                id="input-group-3"
                label="Repeat Your Password:"
                label-for="input-3"
            >

              <b-form-input
                  id="input-3"
                  v-model="form.repeat_password"
                  type="password"
                  placeholder="Enter password"
                  required
              ></b-form-input>

            </b-form-group>

            <b-button class="mr-1 w-50 button-bg-color" type="submit" >Register Now</b-button>

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
import Toaster from "@/common/toaster";
import {mapActions} from "vuex";

export default {
name: "Register",
  data () {
    return {
      form: {
        username: "",
        name: "",
        surname: "",
        email: "",
        password: "",
        repeat_password: "",
      }
    }
  },
  methods:{
    ...mapActions([
      "registerAction"
    ]),

    async onRegister(){
      const payload = {
        "first_name": this.form.name,
        "last_name": this.form.surname,
        "username": this.form.username,
        "password": this.form.password,
        "confirm_password": this.form.repeat_password,
        "email": this.form.email,
      }

      try {
        await this.registerAction(payload)
        Toaster.successMessage('Your registration was successful.', 'login')
        await this.$router.push({name: "login"})
      } catch (err) {
        Toaster.errorMessage('Registration failed. Invalid credentials were given.', 'error')
      }
    }
  }
}
</script>

<style scoped>

</style>