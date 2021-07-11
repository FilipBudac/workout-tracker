<template>
  <div>

    <ExercisesSettings
        v-bind:exerciseSettings.sync="exerciseSettings"
    />

    <div class="w-75 m-5 mx-auto text-left">
      <b-button v-b-toggle.collapse-1 align="left" class="w-50 mx-auto" variant="info">Add Exercise</b-button>
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
    <b-table
        head-variant="dark"
        class="w-75 m-5 mx-auto table-light border border-secondary"
        responsive="sm"
        v-if="exercises"
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
            <b-button class="m-2" @click="deleteExercise(exercise.item.id); $bvModal.hide(exercise.item.id)" variant="danger">Delete</b-button>
          </b-row>

        </b-modal>

      </template>


      <!--  EDIT EXERCISE -->
      <template #row-details="exercise">
        <b-card bg-variant="light">
          <b-img
              :src="exercise.item.img"
              alt=""
              style="width: 200px; height: 200px"
              align="right"
              class="mr-5 border"
              rounded
          >
          </b-img>
          <b-form v-model="exerciseForm" class="w-50">
            <b-row class="ml-auto">
              <b-col>
                <!--  NAME  -->
                <b-form-input
                    v-model="exercise.item.name"
                    v-bind:value="exercise.item.name"
                    id="inline-form-input-name"
                    class="mb-2 mr-sm-2 mb-sm-3 w-100 label-align-md"
                ></b-form-input>
              </b-col>

              <b-col align="left">
                <!--  CATEGORY  -->
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
            <!--  ADD IMAGE  -->
            <b-row>
              <b-col cols="">
                <div class="w-100 container">
                  <b-form-file
                      accept="image/*"
                      @change="encodeImage($event.target.files, exercise.item)"
                      placeholder="Choose a file or drop it here..."
                      drop-placeholder="Drop file here..."
                  ></b-form-file>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <!--  DESCRIPTION  -->
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

    <!--  PAGINATION BAR  -->
    <PaginationBar
        v-bind:exerciseSettings.sync="exerciseSettings"
        :exercise-length="this.exercises.length"
    />

  </div>
</template>

<script>

import Toaster from "@/common/toaster";
import {mapActions} from "vuex";
import ExercisesSettings from "@/views/home/ExercisesSettings";
import PaginationBar from "@/views/home/PaginationBar";

export default {
  name: "Exercises",
  components: {
    ExercisesSettings,
    PaginationBar
  },
  async mounted() {
    this.exercises = await this.fetchExercisesAction();
    this.categories = await this.fetchCategoriesAction();

    console.log(this.categories)
    console.log(this.exercises)
  },

  data() {
    return {
      exerciseForm: [],
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
      tableFields: [
        { key: "name", label: "Exercises", sortable: true },
        { key: "category_name", label: "Category", sortable: true },
        { key: "buttons", label: "" },
      ],

      categories: [],
      exercises: []
    }
  },

  methods: {
    ...mapActions([
      "fetchExercisesAction",
      "fetchCategoriesAction",
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
        this.exercises = this.exercises.filter(exercise => exercise.id !== exerciseID)
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
        this.exercises = await this.fetchExercisesAction()
        Toaster.successMessage('Exercise edit was successful', 'login')
      } catch (err) {
        Toaster.errorMessage('Exercise edit failed.', 'error')
      }
    }

  }
}
</script>

<style scoped>

</style>
