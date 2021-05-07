<template>

  <b-container>
    <b-row class="d-flex justify-content-center">
      <b-card class="mt-3" header="Update User Form" style="width: 29.7rem;">
        <b-form @submit.prevent="onUpdateUser">

          <b-row class="justify-content-center">
            <b-form-group
                class="align-text-left mr-1"
                id="input-group-1"
                label="Username:"
                label-for="input-1"
            >
              <b-form-input
                  id="input-1"
                  v-model="user.first_name"
                  placeholder="Enter username"
                  required
              ></b-form-input>

            </b-form-group>

            <b-form-group
                class="align-text-left ml-1"
                id="input-group-2"
                label="Your Password:"
                label-for="input-2"
            >

              <b-form-input
                  id="input-2"
                  v-model="user.last_name"
                  placeholder="Enter password"
                  required
              ></b-form-input>

            </b-form-group>
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

          <b-button class="mr-1 w-25" type="submit" variant="dark">Edit</b-button>
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

import {FETCH_USER} from "@/store/actions/auth";
import {UPDATE_USER} from "@/store/actions/auth";
import Toaster from "@/common/toaster";

export default {
  name: "Profile",
  async beforeMount() {
    this.user = await this.$store.dispatch(FETCH_USER, this.$route.params)
  },
  data () {
    return {
      errors: [],
      user: {}
    }
  },
  methods: {
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
        await this.$store.dispatch(UPDATE_USER, payload)
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

.align-text-left {
  text-align: left
}

</style>