<template>
  <div>
    <b-row>
        <div v-b-scrollspy:nav-scroller>
          <b-card-group>
            <div class="row" v-bind:key="rowIdx" v-for="rowIdx in Math.ceil(exercises.length / 3)">
              <div v-bind:key="exercise" class="one-third column" v-for="exercise in exercises.slice(3 * (rowIdx - 1), 3 * rowIdx)">
                <b-card class="row w-75"
                        img-height="200px"
                        :img-src="exercise.img"
                        img-alt="Card image" img-top>
                  <b-card-text>
                    {{exercise.name}}
                  </b-card-text>
                </b-card>
              </div>
            </div>
          </b-card-group>

        </div>

    </b-row>
  </div>
</template>

<script>

import {mapGetters} from "vuex";


export default {
  name: "ExerciseGallery",
  computed: {
    ...mapGetters({
      exercises: 'getExercises',
      categories: 'getCategories'
    }),
  },
}

</script>

<style scoped>

</style>