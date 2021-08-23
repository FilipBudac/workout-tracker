<template>
  <div>
    <div>
      <b-card bg-variant="light" class="w-50">
        <b-form>
          <b-form-group
          >
            <b-form-input id="exerciseName"></b-form-input>
          </b-form-group>

          <b-form
              inline
              label="Reps:"
              label-for="nested-city"
              label-cols-sm="3"
              label-align-sm="right"

          >

            <b-form-spinbutton class="w-25" id="sb-inline" v-model="value" inline></b-form-spinbutton>
            <b-input-group class="m-5 w-50">

              <b-form-input></b-form-input>

              <b-input-group-append>
                <b-dropdown :text="selectedOption" variant="outline-secondary">
                  <b-dropdown-item @click="selectedOption = option" v-model="selectedOption" :key="option" v-for="option in difficultyOptions">{{ option }}</b-dropdown-item>
                </b-dropdown>
              </b-input-group-append>

            </b-input-group>
          </b-form>
        </b-form>


        <p>{{selectedOption}}</p>
         
      </b-card>
    </div>
  </div>
</template>

<script>

export default {
  name: "Trainings",
  data(){
    return{
      selectedOption: "RPE",
      difficultyOptions: ["RPE", "RIR", "%"]
    }
  }
}
</script>

<style scoped>

</style>