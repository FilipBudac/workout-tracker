<template>

  <b-container>
    <b-row class="d-flex justify-content-center">
      <b-card class="mt-3" header-text-variant="white" header-bg-variant="dark" header="Update User Form" style="width: 29.7rem;">
        <b-form @submit.prevent="onUpdateUser">

          <b-row>
            <b-col>

              <b-form-group
                  class="align-text-left"
                  id="input-group-5"
                  label="First Name:"
                  label-for="input-5"
              >

                <b-form-input
                    id="input-3"
                    v-model=" user.first_name"
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
                    v-model="user.last_name"
                    type="text"
                    placeholder="Enter Last Name"
                    required
                ></b-form-input>

              </b-form-group>
            </b-col>
          </b-row>

          <b-form-group
              class="align-text-left"
              id="input-group-2"
              label="Your Email:"
              label-for="input-2"
          >

            <b-form-input
                id="input-2"
                v-model="user.email"
                placeholder="Enter password"
                required
            ></b-form-input>

          </b-form-group>

          <b-button class="mr-1 w-25 button-bg-color" type="submit" variant="dark">Edit</b-button>
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
</template>

<script>

import Toaster from "@/common/toaster";
import {mapActions} from "vuex";

export default {
  name: "Profile",
  async beforeMount() {
    this.user = await this.fetchUserAction(this.$route.params)
  },
  data () {
    return {
      errors: [],
      user: {}
    }
  },
  methods: {
    ...mapActions([
      "updateUserAction",
      "fetchUserAction"
    ]),
    async onUpdateUser () {
      const payload = {
        userID: this.user.id,
        form: {
          first_name: this.user.first_name,
          last_name: this.user.last_name,
          email: this.user.email,
        }
      }

      try {
        await this.updateUserAction(payload)
        Toaster.successMessage('User has been updated.', 'account_box')
      } catch (e) {
        this.errors.push(e)
        Toaster.errorMessage('User update has failed.', 'error')
      }
    }
  }

}

</script>

<style scoped>


</style>