<template>
  <div class="justify-content-center row my-1">
    <b-pagination
        size="md"
        :total-rows="exerciseLength"
        :per-page="exerciseSettings.exercisesPerPage"
        v-model="exerciseSettings.currentPage"
    />
  </div>
</template>

<script>
export default {
  name: "PaginationBar",
  props: {
    exerciseSettings: {
      exercisesPerPageOptions: Object,
      exercisesPerPage: String,
      filterQuery: String
    },
    exerciseLength: Number
  },
}
</script>

<style scoped>

</style>