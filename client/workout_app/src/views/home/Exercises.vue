<template>
  <div>

    <div class="justify-content-center row container ml-1 mt-4">

      <b-form-fieldset label="Rows per page" class="col-2">
        <b-form-select :options="options" v-model="perPage">
        </b-form-select>
      </b-form-fieldset>

      <b-form-fieldset label="Filter" class="col-6">
        <b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>
      </b-form-fieldset>

    </div>


    <b-table
        head-variant="dark"
        class="w-75 m-5 mx-auto table-light border border-secondary"
        responsive="sm"
        :items="exercises"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        :filter-function="filterTable"
        hover
    >

      <template #cell(buttons)="row">
        <b-row class="text-right">
          <div class="table-delete-button text-right">
            <b-button variant="info" @click="row.toggleDetails">
              <b-icon-pencil-square />
            </b-button>
          </div>

          <div class="ml-1 mr-1"/>

          <div class="table-delete-button text-right">
            <b-button @click="deleteExercise(row.item.id)" variant="danger">
              <b-icon-trash />
            </b-button>
          </div>
        </b-row>

      </template>

      <template #row-details="row">
        <b-card>
          <b-form inline>
            <b-form-input
                id="inline-form-input-name"
                class="mb-2 mr-sm-2 mb-sm-0 w-50"
                placeholder="Exercise name"
            ></b-form-input>

            <b-dropdown
                split
                split-variant="outline-primary"
                variant="info"
                text="Choose Category"
                class="m-2"
            >
              <b-dropdown-item href="#">Chest</b-dropdown-item>
              <b-dropdown-item href="#">Biceps</b-dropdown-item>
              <b-dropdown-item href="#">Shoulders</b-dropdown-item>
              <b-dropdown-item href="#">Legs</b-dropdown-item>
              <b-dropdown-item href="#">Triceps</b-dropdown-item>
            </b-dropdown>
            <b-button right @click="row.toggleDetails">Hide</b-button>
          </b-form>
        </b-card>
      </template>

    </b-table>

    <div class="justify-content-center row my-1">
      <b-pagination size="md" :total-rows="this.exercises.length" :per-page="perPage" v-model="currentPage" />
    </div>

  </div>
</template>

<script>

import {
  FETCH_EXERCISES
} from "@/store/actions/training";
import Toaster from "../../common/toaster";
import {DELETE_EXERCISE} from "@/store/actions/training";

export default {
  name: "Exercises",
  async beforeMount() {
    this.exercises = await this.$store.dispatch(FETCH_EXERCISES)
  },
  data(){
    return {
      currentPage: 1,
      perPage: 10,
      filter: null,
      options: [
        { text: 5, value: 5 },
        { text: 10, value: 10 },
        { text: 15, value: 15 }
      ],
      fields: [
        { key: "name", label: "Exercises", sortable: true },
        { key: "category_name", label: "Category", sortable: true },
        { key: "buttons", label: "" },
      ],
      exercises: [],
      errors: [],
    }
  },
  methods: {
    filterTable(exercise, searchString) {
      // search string is present in exercise name or category name
      return exercise.name.toLocaleLowerCase().includes(searchString.toLocaleLowerCase()) ||
          exercise.category_name.toLocaleLowerCase().includes(searchString.toLocaleLowerCase());
    },
    async deleteExercise(exerciseID){
      const payload = {
        exerciseID: exerciseID
      }
      try {
        await this.$store.dispatch(DELETE_EXERCISE, payload)
        this.exercises = this.exercises.filter(exercise => exercise.id !== exerciseID)
        Toaster.successMessage('Exercise has been deleted.', 'account_box')
      } catch (err) {
        this.errors.push(err)
        Toaster.errorMessage('Exercise has not been deleted.', 'error')
      }
    }
  }
}
</script>

<style scoped>

</style>