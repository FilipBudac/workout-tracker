<template>
  <div>
    <div>
      <div class="wrapper d-flex justify-content-center">
        <div class="form-wrapper w-50 p-5">
          <div class="jumbotron border border-primary rounded-100">
            <form @submit.prevent="onRegister">
              <div class="form-group clearfix">
                <div class="form-group">
                  <label for="exampleInputNickname">Nickname</label>
                  <input type="text" class="form-control" id="exampleInputNickname" placeholder="Nickname" v-model="form.username">
                </div>
                  <div class="form-name float-left">
                    <label for="exampleInputName">Name</label>
                    <input type="text" class="form-control" id="exampleInputName" placeholder="Enter name" v-model="form.name">
                  </div>
                <div class="form-surname float-right">
                  <label for="exampleInputEmail1">Surname</label>
                  <input type="text" class="form-control" id="exampleInputSurname" placeholder="Enter surname" v-model="form.surname">
                </div>
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" v-model="form.email">
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="form.password">
              </div>
              <div class="form-group">
                <label for="exampleInputPasswordRepeat">Repeat password</label>
                <input type="password" class="form-control" id="exampleInputPasswordRepeat" placeholder="Repeat password" v-model="form.repeat_password">
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
import {REGISTER} from "@/store/actions/auth";

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
      },
      errors: []
    }
  },
  methods:{
    async onRegister(){
      const payload = {
        "first_name": this.form.name,
        "last_name": this.form.surname,
        "username": this.form.username,
        "password": this.form.password,
        "confirm_password": this.form.repeat_password,
        "email": this.form.email
      }

      try {
        await this.$store.dispatch(REGISTER, payload)
        await this.$router.push({name: "login"})
      } catch (e) {
        this.errors.push(e)
      }
    }
  }
}
</script>

<style scoped>

</style>