<template>
  <div>

    <!--  EXERCISES SETTINGS -->
    <ExercisesSettings
        v-bind:exerciseSettings.sync="exerciseSettings"
    />

    <div class="w-75 m-5 mx-auto text-left">
        <b-button v-b-toggle.collapse-1 align="left" class="w-50 mx-auto" variant="info">Add Exercise</b-button>

        <div class="mt-1 mb-2"/>

        <router-link
            tag="b-button"
            variant="info"
            class="nav-link w-50"
            exact
            :to="{
              name: 'exercise_gallery',
            }"
        >Exercise Gallery</router-link>
    </div>

    <b-collapse id="collapse-1" class="w-75 m-5 mx-auto">
        <b-card header="Add Exercise" bg-variant="light" class="w-75">

          <b-form>
            <b-row class="ml-auto">
              <b-col>
                <!--  NAME  -->
                <b-form-input
                    placeholder="Enter exercise name..."
                    id="inline-form-input-name"
                    class="mb-2 mr-sm-2 mb-sm-3 w-100 label-align-md"
                ></b-form-input>
              </b-col>

              <b-col align="left">
                <!--  CATEGORY  -->
                <b-form-select class="mb-2 mr-sm-2 mb-sm-0 ml-3" align-left>
                  <b-form-select-option
                      v-for="category in categories"
                      :key="category.id"
                      :value="category.id"
                  >
                    {{category.name}}
                  </b-form-select-option>
                </b-form-select>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <!--  DESCRIPTION  -->
                <b-form-textarea
                    id="textarea"
                    placeholder="Enter something..."
                    rows="3"
                    max-rows="6"
                    class="w-100 m-3"
                ></b-form-textarea>
              </b-col>
            </b-row>
            <b-row>
              <b-button class="ml-3" variant="info" block>Add</b-button>
            </b-row>
          </b-form>
        </b-card>
    </b-collapse>

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

export default {
  name: "Exercises",
  components: {
    ExercisesSettings,
    PaginationBar,
    ExercisesTable
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
  }
}
</script>

<style scoped>

</style>
