<template>
  <div>

      <b-navbar toggleable="lg" type="dark" variant="dark">
        <!-- Left aligned nav items -->
        <img width="45px" :src="logo_image">
        <b-navbar-brand>Gymloger</b-navbar-brand>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <router-link right
                       v-if="isAuthenticated"
                       class="nav-link"
                       exact
                       :to="{
              name: 'profile',
              params: { username: this.currentUser.username }
            }"
          >
            <b-avatar size="1.9rem" variant="info"></b-avatar>
            Profile
          </router-link>
          <router-link right
              v-if="isAuthenticated"
              class="nav-link"
              exact
              :to="{ name: 'home' }"
          >
            <b-icon variant="info"  @click="logout" icon="house-door" aria-hidden="true"></b-icon> Home
          </router-link>
          <router-link right
              v-if="!isAuthenticated"
              class="nav-link"
              exact
              :to="{ name: 'register' }"
          >
            Register
          </router-link>
          <router-link right
              v-if="!isAuthenticated"
              class="nav-link"
              exact
              :to="{ name: 'login' }"
          >
            Login
          </router-link>

          <b-button  v-if="isAuthenticated" variant="outline-info" class="mb-2 ml-4">
            <b-icon  v-if="isAuthenticated"  @click="logout" icon="power" aria-hidden="true"></b-icon> Logout
          </b-button>
        </b-navbar-nav>
      </b-navbar>

    </div>


</template>

<script>
import { LOGOUT } from "@/store/actions/auth";
import { mapGetters } from "vuex";

export default {
  name: "Header",
  data(){
    return{
      logo_image: require('@/assets/logo.png')
    }
  },
  computed: {
    ...mapGetters(["currentUser", "isAuthenticated"])
  },
  methods: {
   async logout () {
      try {
        await this.$store.dispatch(LOGOUT)
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