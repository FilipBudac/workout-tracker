<template>
  <div>
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav>

        <router-link
            v-if="isAuthenticated"
            class="nav-link"
            exact
            :to="{ name: 'home' }"
        >
          Home
        </router-link>
        <router-link
            v-if="!isAuthenticated"
            class="nav-link"
            exact
            :to="{ name: 'register' }"
        >
          Register
        </router-link>
        <router-link
            v-if="!isAuthenticated"
            class="nav-link"
            exact
            :to="{ name: 'login' }"
        >
          Login
        </router-link>
        <router-link
            v-if="isAuthenticated"
            class="nav-link"
            exact
            :to="{
              name: 'profile',
              params: { username: this.currentUser.username }
            }"
        >
          Profile
        </router-link>

        <button v-if="isAuthenticated" @click="logout">Logout</button>

      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
import { LOGOUT } from "@/store/actions/auth";
import { mapGetters } from "vuex";

export default {
  name: "Header",
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