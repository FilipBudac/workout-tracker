<template>
  <div>

    <div class="justify-content-center row container ml-1 mt-4">

      <!--  SELECT ROWS PER PAGE  -->
      <b-form-fieldset label="Rows per page" class="col-2">
        <b-form-select :options="options" v-model="perPage">
        </b-form-select>
      </b-form-fieldset>

      <!--  INPUT SEARCH BAR -->
      <b-form-fieldset label="Filter" class="col-6">
        <b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>
      </b-form-fieldset>

    </div>

    <!--  TEST UPLOAD FILE  -->
    <div class="w-50 container">
      <b-form-file
          accept="image/*"
          @change="encodeImage($event.target.files)"
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
      ></b-form-file>

      <img :src="image" alt="image">

    </div>

    <!--  EXERCISE TABLE -->
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

      <!--  DELETE EXERCISE  -->
      <template #cell(buttons)="exercise">
        <b-row class="text-right">
          <div class="table-delete-button text-right">
            <b-button variant="info" @click="exercise.toggleDetails">
              <b-icon-pencil-square />
            </b-button>
          </div>

          <div class="ml-1 mr-1"/>

          <div class="table-delete-button text-right">
            <b-button @click="deleteExercise(exercise.item.id)" variant="danger">
              <b-icon-trash />
            </b-button>
          </div>
        </b-row>
      </template>

      <!--  EDIT EXERCISE -->
      <template #row-details="exercise">
        <b-card>
          <b-form inline>

            <!--  NAME  -->
            <b-form-input
                v-bind:value="exercise.item.name"
                id="inline-form-input-name"
                class="mb-2 mr-sm-2 mb-sm-0 w-50"
            ></b-form-input>

            <!--  CATEGORY  -->
            <b-form-select v-model="exercise.item.category">
              <b-form-select-option
                  v-for="category in categories"
                  :key="category.id"
                  :value="category.id"
              >
                {{category.name}}
              </b-form-select-option>
            </b-form-select>


            <!--  DESCRIPTION  -->
            <b-form-textarea
                id="textarea"
                placeholder="Enter something..."
                rows="3"
                max-rows="6"
                v-bind:value="exercise.item.description"
            ></b-form-textarea>

            <!--  HIDE BUTTON  -->
            <b-button right @click="exercise.toggleDetails">Hide</b-button>

          </b-form>
        </b-card>
      </template>

    </b-table>

    <!--  PAGINATION BAR  -->
    <div class="justify-content-center row my-1">
      <b-pagination size="md" :total-rows="this.exercises.length" :per-page="perPage" v-model="currentPage" />
    </div>

  </div>
</template>

<script>

import {
  DELETE_EXERCISE,
  FETCH_EXERCISES,
  FETCH_CATEGORIES
} from "@/store/actions/training";
import Toaster from "@/common/toaster";

export default {
  name: "Exercises",
  async beforeMount() {
    this.exercises = await this.$store.dispatch(FETCH_EXERCISES)
    this.categories = await this.$store.dispatch(FETCH_CATEGORIES)
    console.log(this.categories)
    console.log(this.exercises)
  },
  data(){
    return {
      image: null,
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
    async deleteExercise(exerciseID) {
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
    },
    getUploadedFile(files) {
      if (!files || files.length === 0) {
        Toaster.errorMessage('No file has been selected.', 'error')
        return
      }

      return files[0]
    },
    encodeImage(files) {
      const file = this.getUploadedFile(files)
      const reader = new FileReader()

      reader.readAsDataURL(file);

      reader.onload = () => {
        this.image = reader.result
      }

      reader.onerror = () => {
        Toaster.errorMessage('File upload has failed.', 'error')
      }
    }
  }
}
</script>

<style scoped>

</style>
