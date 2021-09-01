<template>
  <div>
      <b-row>

        <!--  TRAINING RECORD FORM  -->
        <!--  TODO: TRAINING RECORD FORM COMPONENT  -->
        <b-col>
          <b-card bg-variant="light" class="m-3">
            <b-form>

              <!--  EXERCISE NAME  -->
              <b-form-group>
                <vue-bootstrap-typeahead
                    v-model="exerciseName"
                    :data="exerciseNameList"
                    placeholder="Exercise"
                />
              </b-form-group>


              <div class="text-left">
                <!--  REPS  -->
                <div>
                  <label class="spinbutton-label-width">Reps:</label>
                  <b-form-spinbutton class="ml-3" id="repetitions" v-model="repetitions" inline></b-form-spinbutton>
                </div>

                <div class="mt-3"/>

                <!--  SETS  -->
                <div>
                  <label class="spinbutton-label-width">Sets:</label>
                  <b-form-spinbutton class="ml-3" id="sets" v-model="sets" inline></b-form-spinbutton>
                </div>

                <div class="mt-3"/>

                <!--  WEIGHT  -->
                <div>
                  <label class="textfield-label-width">Weight:</label>
                  <b-form-input type="number" class="weight_input d-inline-flex" v-model="weight"></b-form-input>
                </div>
              </div>

              <b-form-group class="mt-3">
                <b-input-group class="w-50">

                  <!--  INTENSITY VALUE  -->
                  <b-form-input
                      v-model="intensity"
                      placeholder="Intensity value"
                  />

                  <!--  INTENSITY OPTION -->
                  <b-input-group-append class="intensity_input">
                    <b-dropdown :text="selectedOption" variant="outline-secondary">
                      <b-dropdown-item @click="selectedOption = option" v-model="selectedOption" :key="option" v-for="option in difficultyOptions">{{ option }}</b-dropdown-item>
                    </b-dropdown>
                  </b-input-group-append>

                </b-input-group>
              </b-form-group>

              <b-button class="m-3 w-25" @click="addItems" variant="info">Add Record</b-button>
            </b-form>

          </b-card>
        </b-col>


        <!--  TRAINING FORM  -->
        <!--  TODO: TRAINING FORM COMPONENT  -->
      <b-col>
        <b-card class="mt-3 mr-5">

          <!--  TRAINING NAME  -->
          <b-form-input
              placeholder="Training name"
          />

          <b-form-textarea
              class="mt-4 mb-4"
              placeholder="Training notes"
              max-rows="6"
              v-model="trainingNotes"
          />

          <div>
            <label class="mt-2">Rate your training session</label>
            <b-form-rating v-model="trainingRating" class="mb-3" variant="info" />
          </div>

          <b-button variant="info w-25 mt-2">Save Training</b-button>
        </b-card>
      </b-col>

      </b-row>

      <!--  TRAINING RECORDS TABLE  -->
      <!--  TODO: TRAINING RECORDS TABLE COMPONENT  -->
      <div>
        <div class="m-2">
          <h3>Training Records</h3>
        </div>
        <b-table class="w-50" align="center" striped hover :items="items" :fields="fields"></b-table>
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
      training: {
        name : "",
        description: "",
        rating: null,
        created_at: this.getDate(),
        user : "",
        records : []
      },


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
      console.log("ha")
      if(this.validateExercise() === false){
        console.log("nie no")

        this.resetInputs()
        return
      }


      let combine = this.intensity + " " + this.selectedOption;
      let result = {Exercise: this.exerciseName, Reps: this.repetitions, Sets: this.sets, Weight: this.weight, Intensity: combine}
      this.items.push(result)
      console.log(this.items)
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

    getDate(){
      let current = new Date()
      return `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`
    },

    resetInputs(){
      this.repetitions = null
      this.exerciseName = null
      this.intensity = null
      this.sets = null
      this.weight = 0
    },

  }

}

</script>

<style scoped>
  .weight_input{
    width: 140px;
  }

  .spinbutton-label-width {
    width: 80px;
  }

  .textfield-label-width {
    width: 96px;
  }

</style>
