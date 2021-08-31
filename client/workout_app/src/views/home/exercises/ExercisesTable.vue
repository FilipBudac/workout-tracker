<template>
  <div>
    <b-table
        head-variant="dark"
        class="w-75 m-5 mx-auto table-light border border-secondary"
        responsive="sm"
        :items="exercises"
        :fields="tableFields"
        :current-page="exerciseSettings.currentPage"
        :per-page="exerciseSettings.exercisesPerPage"
        :filter="exerciseSettings.filterQuery"
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
            <b-button @click="$bvModal.show(exercise.item.id.toString())" variant="danger">
              <b-icon-trash />
            </b-button>
          </div>
        </b-row>


        <b-modal :id="exercise.item.id.toString()" hide-footer>
          <template #modal-title>
            Are you sure you want to delete {{exercise.item.name}}?
          </template>
          <b-row>
            <b-button class="m-2" @click="$bvModal.hide(exercise.item.id)">Cancel</b-button>
            <b-button class="m-2" @click="deleteExercise(exercise.item.id); $bvModal.hide(exercise.item.id.toString())" variant="danger">Delete</b-button>
          </b-row>
        </b-modal>
      </template>

      <!--  EDIT EXERCISE -->
      <template #row-details="exercise">
        <b-card bg-variant="light">

          <b-img
              :src="exercise.item.img"
              alt="exercise-image"
              style="width: 200px; height: 200px"
              align="right"
              class="mr-5 border"
              rounded
          />

          <b-form class="w-50">
            <b-row class="ml-auto">

              <!--  NAME  -->
              <b-col>
                <b-form-input
                    v-model="exercise.item.name"
                    v-bind:value="exercise.item.name"
                    id="inline-form-input-name"
                    class="mb-2 mr-sm-2 mb-sm-3 w-100 label-align-md"
                ></b-form-input>
              </b-col>

              <!--  CATEGORY  -->
              <b-col>
                <b-form-select v-model="exercise.item.category" class="mb-2 mr-sm-2 mb-sm-0 ml-3" align-left>
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

            <!--  IMAGE  -->
            <b-row>
              <b-col cols="">
                <div class="container">
                  <b-form-file
                      accept="image/*"
                      @change="encodeImage($event.target.files, exercise.item)"
                      placeholder="Choose a file or drop it here..."
                      drop-placeholder="Drop file here..."
                  ></b-form-file>
                </div>
              </b-col>
            </b-row>

            <!--  DESCRIPTION  -->
            <b-row>
              <b-col>
                <b-form-textarea
                    v-model="exercise.item.description"
                    id="textarea"
                    placeholder="Enter something..."
                    rows="3"
                    max-rows="6"
                    v-bind:value="exercise.item.description"
                    class="w-100 m-3"
                ></b-form-textarea>
              </b-col>
            </b-row>

            <b-row>
              <b-button v-on:click="editExercise(exercise.item)" class="ml-5 mr-3" block variant="info">Edit Exercise</b-button>
            </b-row>

          </b-form>

        </b-card>
      </template>

    </b-table>
  </div>
</template>

<script>
import Toaster from "@/common/toaster";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "ExercisesTable",
  props: {
    exerciseSettings: {
      exercisesPerPageOptions: Object,
      exercisesPerPage: String,
      filterQuery: String
    },
  },
  computed: {
    ...mapGetters({
      exercises: 'getExercises',
      categories: 'getCategories'
    }),
  },

  data() {
    return {
      tableFields: [
        { key: "name", label: "Exercises", sortable: true },
        { key: "category_name", label: "Category", sortable: true },
        { key: "buttons", label: "" },
      ],
    }
  },
  methods: {
    ...mapActions([
      "fetchExercisesAction",
      "deleteExerciseAction",
      "editExerciseAction"
    ]),

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
        await this.deleteExerciseAction(payload)
        Toaster.successMessage(`Exercise has been deleted.`, 'account_box')
      } catch (err) {
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

    encodeImage(files, exercise) {
      const file = this.getUploadedFile(files)
      const reader = new FileReader()

      reader.readAsDataURL(file);

      reader.onload = () => {
        exercise.img = reader.result
      }

      reader.onerror = () => {
        Toaster.errorMessage('File upload has failed.', 'error')
      }
    },

    async editExercise(exercise){
      const payload = {
        name: exercise.name,
        description: exercise.description,
        category: exercise.category,
        img: exercise.img,
        id: exercise.id
      }

      try {
        await this.editExerciseAction(payload)
        Toaster.successMessage('Exercise edit was successful.', 'login')
      } catch (err) {
        Toaster.errorMessage('Exercise edit failed.', 'error')
      }
    }
  }
}
</script>

<style scoped>

</style>
