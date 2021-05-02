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
                  <input type="text" class="form-control" id="exampleInputName" placeholder="Enter name" v-model="currentUser.first_name">
                </div>
                <div class="form-surname float-right">
                  <label for="exampleInputEmail1">Surname</label>
                  <input type="text" class="form-control" id="exampleInputSurname" placeholder="Enter surname" v-model="currentUser.last_name">
                </div>
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" v-model="currentUser.email">
              </div>
              <button type="submit" class="btn btn-outline-primary w-50" >Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <pre>
      {{currentUser}}
    </pre>
  </div>
</template>

<script>

import {mapGetters} from "vuex";

export default {
  name: "Profile",
  computed: {
    ...mapGetters({currentUser: "currentUser", isAuthenticated:"isAuthenticated"})
  },
  methods: {
    onUpdateUser () {
      const payload = {
        userID: this.currentUser.id,
        form: {
          first_name: this.currentUser.first_name,
          last_name: this.currentUser.last_name,
          email: this.currentUser.email,
        }
      }

      console.log(payload);
    }
  }

}

</script>

<style scoped>

</style>