<template>
  <div>

      <b-navbar toggleable="lg" type="dark" variant="dark" class="header-height">

        <!-- Left aligned nav items -->
        <img width="45px" :src="logo_image" alt="logo">
        <b-navbar-brand>Gymloger</b-navbar-brand>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <router-link
            right
            v-if="isAuthenticated"
            class="nav-link"
            exact
            :to="{
              name: 'profile',
              params: { username: this.currentUser.username }
            }"
          >
            <b-avatar size="1.6rem" variant="info" />
            Profile
          </router-link>

          <router-link right
              v-if="isAuthenticated"
              class="nav-link"
              exact
              :to="{ name: 'home' }"
          >
            <b-icon variant="info" icon="house-door" aria-hidden="true" />
            Home
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

          <b-button
              v-if="isAuthenticated"
              variant="outline-info"
              class="mb-1 ml-4"
              @click="logout"
          >
            <b-icon
                v-if="isAuthenticated"
                icon="power"
                aria-hidden="true"
            />
            Logout
          </b-button>

        </b-navbar-nav>
      </b-navbar>

    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Toaster from "@/common/toaster";

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
    ...mapActions([
      "logoutAction"
    ]),
   async logout () {
      try {
        await this.logoutAction()
        await this.$router.push({name: "login"})
      } catch (e) {
        Toaster.errorMessage('Logout has failed!', 'error')
      }
    }
  }
}
</script>

<style scoped>

</style>