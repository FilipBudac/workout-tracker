<template>

  <div class="container">
    <b-row class="ml-3 mt-3">

      <!--  SELECT ROWS PER PAGE  -->
      <b-form-fieldset label="Rows per page" class="col-2">
        <b-form-select :options="exerciseSettings.exercisesPerPageOptions" v-model="exerciseSettings.exercisesPerPage">
        </b-form-select>
      </b-form-fieldset>

      <!--  INPUT SEARCH BAR -->
      <b-form-fieldset label="Filter" class="col-6">
        <b-form-input v-model="exerciseSettings.filterQuery" placeholder="Type to Search"></b-form-input>
      </b-form-fieldset>
    </b-row>
  </div>

</template>

<script>

export default {
  name: "ExercisesSettings",
  props: {
    exerciseSettings: {
      exercisesPerPageOptions: Object,
      exercisesPerPage: String,
      filterQuery: String
    }
  },

}
</script>

<style scoped>

</style>