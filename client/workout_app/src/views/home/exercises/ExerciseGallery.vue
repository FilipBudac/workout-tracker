<template>
  <div>
    <div class="m-5">
      <h1>Exercise Gallery</h1>
      <hr>
    </div>

    <div align="center">
      <b-input-group class="m-5 w-50">
        <b-form-input @change="filterGallery" v-model="filterQuery"></b-form-input>
        <b-input-group-append>
          <b-button @click="filterGallery" variant="info">Search</b-button>

          <b-dropdown text="Category" variant="outline-secondary">
            <b-dropdown-item @click="filterQuery = category.name" :key="category.id" v-for="category in categories">{{ category.name }}</b-dropdown-item>

          </b-dropdown>

        </b-input-group-append>
      </b-input-group>
    </div>

    <b-container align="center">
      <b-row>
        <b-col :key="exercise.id" v-for="exercise in paginatedItems">
          <ExerciseCard v-bind:exercise="exercise" />
        </b-col>
      </b-row>
    </b-container>

    <div class="overflow-auto">
      <b-pagination
          @change="onPageChanged"
          :total-rows="exercisesCount"
          :per-page="perPage"
          v-model="currentPage"
          class="my-0 m-5"
          align="center"
      />

    </div>
  </div>

</template>

<script>

import {mapGetters} from "vuex";
import ExerciseCard from "@/views/home/exercises/ExerciseCard";


export default {
  name: "ExerciseGallery",
  components: {
    ExerciseCard
  },
  computed: {
    ...mapGetters({
      exercises: 'getExercises',
      categories: 'getCategories',
    }),

  },
  beforeMount() {
    this.paginatedItems = this.exercises;
    this.exercisesCount = this.exercises.length;
  },
  data() {
    return {
      paginatedItems: this.exercises,
      exercisesCount: 0,
      currentPage: 1,
      perPage: 3,
      filterQuery: "",
      filterItems: this.exercises,
      filter: false,
      categoryForm: "",
    }
  },

  methods: {
    filterGallery() {
      this.filter = true;
      this.filterItems = [];

      for (let i = 0; i < this.exercises.length; i++) {
        if (
            this.exercises[i].name.toLocaleLowerCase().includes(this.filterQuery.toLocaleLowerCase()) ||
            this.exercises[i].category_name.toLocaleLowerCase().includes(this.filterQuery.toLocaleLowerCase())
        ) {
          this.filterItems.push(this.exercises[i])
        }
      }
      console.log(this.filterItems)

      this.paginate(this.filterItems, this.perPage, 0);
    },
    paginate(exercises, pageSize, pageNumber) {
      this.paginatedItems = exercises.slice(
          pageNumber * pageSize,
          (pageNumber + 1) * pageSize
      );

      if (this.filter) {
        this.exercisesCount = this.filterItems.length;
      }
    },
    onPageChanged(page) {
      if (this.filter) {
        this.paginate(this.filterItems, this.perPage, page - 1);
      } else {
        this.paginate(this.exercises, this.perPage, page - 1);
      }
    }
  },
  mounted() {
    this.paginate(this.exercises, this.perPage, 0);
  }
}

</script>

<style scoped>

</style>