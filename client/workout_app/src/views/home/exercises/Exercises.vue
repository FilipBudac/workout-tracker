<template>
  <div>

    <!--  EXERCISES SETTINGS -->
    <ExercisesSettings
        v-bind:exerciseSettings.sync="exerciseSettings"
    />

    <!--  BUTTONS  -->
    <div class="container">
      <b-row class="ml-3 text-left">
        <b-col>
          <!--  EXERCISE GALLERY BUTTON  -->
          <b-button @click="navigateToExerciseGallery" v-b-toggle.collapse-1 class="w-25">Exercise Gallery</b-button>
        </b-col>
      </b-row>

      <div class="mt-2"/>

      <b-row class="ml-3 text-left">
        <b-col>
          <!--  ADD EXERCISE BUTTON  -->
          <b-button v-b-toggle.collapse-1 class="w-25" variant="info">Add Exercise</b-button>
        </b-col>
      </b-row>
    </div>

    <!--  COLLAPSE EXERCISE FORM -->
    <ExerciseForm
        v-bind:categories.sync="categories"
    />

    <!--  EXERCISE TABLE -->
    <ExercisesTable
        v-bind:exerciseSettings.sync="exerciseSettings"
    />

    <!--  PAGINATION BAR  -->
    <PaginationBar
        v-if="exercises"
        v-bind:exerciseSettings.sync="exerciseSettings"
        :exercise-length="exercises.length"
    />

  </div>
</template>

<script>

import {mapActions, mapGetters} from "vuex";

import ExercisesSettings from "@/views/home/exercises/ExercisesSettings";
import PaginationBar from "@/views/home/exercises/PaginationBar";
import ExercisesTable from "@/views/home/exercises/ExercisesTable";
import ExerciseForm from "@/views/home/exercises/ExerciseForm";

export default {
  name: "Exercises",
  components: {
    ExercisesSettings,
    PaginationBar,
    ExercisesTable,
    ExerciseForm
  },

  async created() {
    await this.fetchExercisesAction();
    await this.fetchCategoriesAction();
  },

  computed: {
    ...mapGetters({
      exercises: 'getExercises',
      categories: 'getCategories'
    }),
  },

  data() {
    return {
      exerciseSettings: {
        currentPage: 1,
        filterQuery: null,
        exercisesPerPage: 10,
        exercisesPerPageOptions: [
          { text: 5, value: 5 },
          { text: 10, value: 10 },
          { text: 15, value: 15 }
        ]
      },
    }
  },

  methods: {
    ...mapActions([
      "fetchExercisesAction",
      "fetchCategoriesAction",
    ]),

    async navigateToExerciseGallery() {
      await this.$router.push({name: "exercise_gallery"})
    }
  }
}
</script>

<style scoped>

</style>
