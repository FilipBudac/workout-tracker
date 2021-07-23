<template>
  <div>
    <b-row>

      <b-col sm="2">
        <SideNav />
      </b-col>

      <b-col sm="10">
        <div>
          <b-card-group deck>
            <b-card class="w-25 m-5" img-height="200px" v-for="exercise in exercises" :key="exercise"  :img-src="exercise.img" img-alt="Card image" img-top>
              <b-card-text>
                {{exercise.name}}
              </b-card-text>
            </b-card>
          </b-card-group>

        </div>
      </b-col>

    </b-row>
  </div>
</template>

<script>

import SideNav from "../../../components/sidenav/SideNav";
import {mapGetters} from "vuex";


export default {
  name: "ExerciseGallery",
  components: {SideNav},
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