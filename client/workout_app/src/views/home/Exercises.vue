<template>
  <div>
    <b-table border-variant="" head-variant="dark" class="w-75 m-5 mx-auto table-light border border-secondary" hover :items="exercises" :fields="fields">

        <template #cell(exercise)="data">
          <div class="table-exercise">
            {{data.item.name}}
          </div>
        </template>
        <template #cell(delete_exercise)="">
          <div class="table-delete-button text-right">
            <b-button variant="info">Delete</b-button>
          </div>
        </template>

    </b-table>
  </div>
</template>

<script>

import {FETCH_EXERCISES} from "../../store/actions/training";

export default {
  name: "Exercises",
  async beforeMount() {
    this.exercises = await this.$store.dispatch(FETCH_EXERCISES)
  },
  data(){
    return {
      fields: [
        {key: "exercise", label: "Exercises"},
        {key: "delete_exercise", label: ""},
      ],
      exercises: [],

    }
  }
}
</script>

<style scoped>

</style>