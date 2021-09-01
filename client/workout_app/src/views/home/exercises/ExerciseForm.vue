<template>
<div>
  <b-collapse id="collapse-1" class="w-75 m-3 mx-auto">
    <b-card header="Add Exercise" bg-variant="light" class="w-75">

        <b-row>
          <!--  NAME  -->
          <b-col>
            <b-form-input
                placeholder="Enter exercise name..."
                id="name"
                v-model="form.name"
            ></b-form-input>
          </b-col>

          <!--  CATEGORY  -->
          <b-col>
            <b-form-select align-left v-model="form.category">
              <b-form-select-option
                  v-for="category in categories"
                  :key="category.id"
                  :value="category.id"
              >
                {{ category.name }}
              </b-form-select-option>
            </b-form-select>
          </b-col>
        </b-row>

        <!--  DESCRIPTION  -->
        <b-row>
          <b-col>
            <b-form-textarea
                v-model="form.description"
                id="textarea"
                placeholder="Enter something..."
                rows="3"
                max-rows="6"
                class="w-100 mt-3"
            ></b-form-textarea>
          </b-col>
        </b-row>

        <b-row>
          <b-button @click="addExercise" class="ml-3 w-25 mt-3" variant="info" block>Add</b-button>
        </b-row>
    </b-card>
  </b-collapse>
</div>
</template>

<script>
import {mapActions} from "vuex";
import Toaster from "@/common/toaster";

export default {
  name: "ExerciseForm",
  props: {
    categories: Array
  },
  data() {
    return {
      form: {
        name: "",
        category: "",
        description: "",
      }
    }
  },

  methods: {
    ...mapActions([
      "addExerciseAction",
    ]),

    async addExercise() {
      const payload = {
        name: this.form.name,
        description: this.form.description,
        category: this.form.category,
      }

      try {
        await this.addExerciseAction(payload)
        Toaster.successMessage('Exercise has been added.', 'login')
      } catch (err) {
        Toaster.errorMessage('Add exercise has failed.', 'error')
      }
    }
  }
}
</script>

<style scoped>

</style>