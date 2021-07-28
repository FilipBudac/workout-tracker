<template>
  <div>
    <div class="m-5">
      <h1>Exercise Gallery</h1>
      <hr>
    </div>
    <div class="row" v-bind:key="rowID" v-for="rowID in Math.ceil(exercises.length / exercisesInRoWCount)">

      <div v-for="exercise in exercises.slice(exercisesInRoWCount * (rowID - 1), exercisesInRoWCount * rowID)" v-bind:key="exercise.id" class="m-3">
        <ExerciseCard v-bind:exercise="exercise " />
      </div>

    </div>
  </div>

</template>

<script>

import {mapGetters} from "vuex";
import ExerciseCard from "@/views/home/exercises/ExerciseCard";


export default {
  name: "ExerciseGallery",
  components: {
    ExerciseCard
  },
  computed: {
    ...mapGetters({
      exercises: 'getExercises',
      categories: 'getCategories'
    }),
  },
  data() {
    return {
      exercisesInRoWCount: 4
    }
  },
}

</script>

<style scoped>

</style>