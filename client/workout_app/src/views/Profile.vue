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

    <pre>
      {{user}}
    </pre>

  </div>
</template>

<script>

import {mapGetters} from "vuex";
import {FETCH_USER} from "@/store/actions/auth";
import {UPDATE_USER} from "@/store/actions/auth";

export default {
  name: "Profile",
  computed: {
    ...mapGetters(['currentUser'])
  },
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
      } catch (e) {
        this.errors.push(e)
      }
    }
  }

}

</script>

<style scoped>

</style>