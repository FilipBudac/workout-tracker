<template>
  <div>
    <b-card
        :title="exercise.name"
        :img-src="exercise.img"
        img-height="280px"
        img-alt="exercise-image"
        class="card-size"
    >

      <b-card-text>
        {{exercise.description}}
      </b-card-text>

    </b-card>
  </div>
</template>

<script>
export default {
  name: "ExerciseCard",
  props: {
    exercise: Object
  },
}
</script>

<style scoped>
  .card-size {
    max-width: 20rem;
    min-width: 20rem;
    max-height: 40rem;
    min-height: 25rem;
  }

</style>