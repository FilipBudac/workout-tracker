<template>
  <div>
    <div>
      <div class="wrapper d-flex justify-content-center">
        <div class="form-wrapper w-50 p-5 ">
          <div class="jumbotron border border-primary rounded-100">
            <form @submit.prevent="onUpdateUser">
              <div class="form-group clearfix">
                <div class="form-name float-left">
                  <label for="exampleInputName">Name</label>
                  <input type="text" class="form-control" id="exampleInputName" placeholder="Enter name" v-model="user.first_name">
                </div>
                <div class="form-surname float-right">
                  <label for="exampleInputSurname">Surname</label>
                  <input type="text" class="form-control" id="exampleInputSurname" placeholder="Enter surname" v-model="user.last_name">
                </div>
              </div>
              <div class="form-group">
                <label for="exampleInputEmail">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter email" v-model="user.email">
              </div>
              <button type="submit" class="btn btn-outline-primary w-50" >Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
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

</style>