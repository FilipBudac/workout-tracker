<template>
  <div>
    <ul>
      <li v-for="exercise in exercises" v-bind:key="exercise.id">
        {{ exercise.name }}
      </li>
    </ul>

  </div>
</template>

<script>

import {FETCH_EXERCISES} from "../../store/actions/training";

export default {
  name: "Exercises",
  async beforeMount() {
    this.exercises = await this.$store.dispatch(FETCH_EXERCISES)
  },
  data(){
    return {
      exercises: [],
    }
  }
}
</script>

<style scoped>

</style>