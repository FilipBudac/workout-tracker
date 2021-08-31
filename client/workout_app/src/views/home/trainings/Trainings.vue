<template>
  <div>
    <div>
      <b-row>
        <b-col>
          <b-card bg-variant="light" class="m-3">
            <b-form>
              <!--  EXERCISE NAME  -->
              <b-form-group  label="Exercise">
                <vue-bootstrap-typeahead
                    v-model="exerciseName"
                    :data="exerciseNameList"
                />
              </b-form-group>

              <b-form inline>
                <b-form-group
                    class="ml-5"
                    label="Reps:"
                    label-for="repetitions"
                    label-cols-sm="2"
                >
                  <b-form-spinbutton id="repetitions" v-model="repetitions" inline></b-form-spinbutton>
                </b-form-group>

                <b-form-group
                    class="ml-1"
                    label="Sets:"
                    label-for="sets"
                    label-cols-sm="2"
                >
                  <b-form-spinbutton class="ml-3" id="sets" v-model="sets" inline></b-form-spinbutton>
                </b-form-group>


              </b-form>
              <b-form >

                <!--  WEIGHT  -->
                <b-form-group class="ml-1"
                              label="Weight:"
                              label-cols-sm="2">
                  <b-form-input class="weight_input" v-model="weight"></b-form-input>
                </b-form-group>

                <b-form-group>
                  <b-input-group class="w-50">

                    <!--  INTENSITY  -->
                    <b-form-input v-model="intensity"></b-form-input>
                    <b-input-group-append  class="intensity_input">
                      <b-dropdown :text="selectedOption" variant="outline-secondary">
                        <b-dropdown-item @click="selectedOption = option" v-model="selectedOption" :key="option" v-for="option in difficultyOptions">{{ option }}</b-dropdown-item>
                      </b-dropdown>
                    </b-input-group-append>

                  </b-input-group>
                </b-form-group>
              </b-form>

              <b-button class="m-3 w-25" @click="addItems" variant="info">Add</b-button>
            </b-form>

          </b-card>
        </b-col>

      <b-col>
        <b-card class="mt-3">
          <b-form-group class="ml-1"
                        label="Training title"
                        label-for="trainingName"
                        v-model="trainingTitle"
                  >
            <b-form-input></b-form-input>
          </b-form-group>
          <b-form>
            <b-form-textarea
                class="my-3"
                placeholder="Training notes"
                max-rows="6"
                v-model="trainingNotes"
            >

            </b-form-textarea>
          </b-form>
          <b-form-group label="Rate your training session">
            <b-form-rating v-model="trainingRating" class="m-3" variant="info"></b-form-rating>
          </b-form-group>

          <b-button variant="info">Save</b-button>
        </b-card>
      </b-col>

      </b-row>


      <div>
        <b-table class="w-50" align="center" striped hover :items="items" :fields="fields"></b-table>
      </div>
    </div>
  </div>
</template>

<script>

import {mapGetters} from "vuex";
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'
import Vue from "vue";

// Global registration
Vue.component('vue-bootstrap-typeahead', VueBootstrapTypeahead)

export default {
  computed: {
    ...mapGetters({
      exercises: 'getExercises',
      categories: 'getCategories',
    }),

  },

  async created() {
    await this.createExerciseNameList();
  },

  name: "Trainings",
  data(){
    return{
      selectedOption: "RPE",
      difficultyOptions: ["RPE", "RIR", "%"],
      intensity: null,
      exerciseName: '',
      repetitions: null,
      sets: null,
      weight: 0,

      items: [],
      exerciseNameList: [],

      trainingTitle: "",
      trainingNotes: "",
      trainingRating: null,

      fields: [
        {
          key: 'Exercise',
        },
        {
          key: 'Sets',
        },
        {
          key: 'Reps',
        },
        {
          key: 'Weight',
        },
        {
          key: 'Intensity',
        }
      ],
    }
  },
  methods:{
    addItems(){
      if(this.validateExercise() === false){
        console.log("nie no")

        this.resetInputs()
        return
      }


      let combine = this.intensity + " " + this.selectedOption;
      let result = {Exercise: this.exerciseName, Reps: this.repetitions, Sets: this.sets, Weight: this.weight, Intensity: combine}
      this.items.push(result)

      this.resetInputs()
    },

    createExerciseNameList(){
      for (let i = 0; i < this.exercises.length; i++){
        this.exerciseNameList.push(this.exercises[i].name)
      }
    },

    validateExercise(){
      if (this.exerciseNameList.includes(this.exerciseName) === false) {
        return false
      }
      else if (this.selectedOption === "RPE") {
        if (this.intensity > 10 || this.intensity < 0) {
          return false
        }
      }
      if (this.selectedOption === "RIR") {
        if (this.intensity < 0) {
          return false
        }
      }
      if (this.selectedOption === "%") {
        if (this.intensity > 100 || this.intensity < 0) {
          return false
        }
      }
    return true
    },

    resetInputs(){
      this.repetitions = null
      this.exerciseName = null
      this.intensity = null
      this.sets = null
      this.weight = 0
    }
  }
}

</script>

<style scoped>
  .weight_input{
    width: 100px;
  }

</style>