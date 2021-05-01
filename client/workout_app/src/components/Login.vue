<template>
<!--  <div class="d-flex justify-content-center">-->
  <div>
    <b-container>
      <b-row class="d-flex justify-content-center">
        <b-card class="mt-3" header="Login Form" style="width: 24rem;">
          <b-form @submit="onSubmit" @reset="onReset">

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
                  placeholder="Enter password"
                  required
              ></b-form-input>

            </b-form-group>

            <b-button class="mr-1" type="submit" variant="primary">Login</b-button>
            <b-button class="ml-1" type="reset" variant="danger">Reset</b-button>
          </b-form>
        </b-card>
      </b-row>

      <b-row class="d-flex justify-content-center">
        <b-card class="mt-3" header="Form Data Result" style="width: 24rem;">
          <pre class="m-0">{{ form }}</pre>
        </b-card>
      </b-row>

      <ul v-if="errors && errors.length">
        <li v-for="error in errors" :key="error.message">
          {{error.message}}
        </li>
      </ul>

    </b-container>
  </div>
</template>

<script>
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
    onSubmit(event) {
      event.preventDefault()

      const route = 'http://localhost:8000/api/login/'

      const data = {
        "grant_type": "password",
        "client_id": "GT7n0mzHOFKzCTuvVMeoT1vIS5TExcO1m67Fjl51",
        "username": "filip",
        "password": "filip"
      }

      let config = {
        headers: {
          'Content-Type': 'application/json',
        }
      }

      this.axios.post(route, data, config)
      .then((response) => {
        console.log(response.data)
        alert(JSON.stringify(response.data))
      })
      .catch(e => {
        this.errors.push(e)
      })
    },
    onReset(event) {
      event.preventDefault()
      this.form.username = ''
      this.form.password = ''
    }
  }
}
</script>

<style scoped>

</style>