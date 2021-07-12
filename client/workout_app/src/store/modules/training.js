import ApiService from "@/common/api_service";
import {DELETE_EXERCISE, SET_CATEGORIES, SET_EXERCISE, SET_EXERCISES} from "@/store/mutations/training";

const state = {
    exercises: [],
    categories: []
};

const getters = {
    getExercises: state => state.exercises,
    getCategories: state => state.categories,
};

const actions = {

    async fetchExercisesAction({ commit }) {
        ApiService.setAuthHeader();

        const response = await ApiService.get('exercises/');
        const { data } = response;

        commit(SET_EXERCISES, data);

        return data;
    },

    async fetchCategoriesAction({ commit }) {
        ApiService.setAuthHeader();

        const response = await ApiService.get('categories/');
        const { data } = response;

        commit(SET_CATEGORIES, data);

        return data;
    },

    async deleteExerciseAction({ commit }, payload) {
        const { exerciseID } = payload;
        ApiService.setAuthHeader();

        const response = await ApiService.delete(`exercises/${exerciseID}`);
        const { data } = response;

        commit(DELETE_EXERCISE, exerciseID);

        return data;
    },

    async editExerciseAction({ commit }, payload) {
        let id, exercise;
        ({ id, ...exercise } = payload);

        ApiService.setAuthHeader();

        const response = await ApiService.patch(`exercises/${id}`, exercise);
        const { data } = response;

        commit(SET_EXERCISE, data);

        return data;
    },
}

const mutations = {
    setError: (state, error) => (state.errors = error),

    setExercises: (state, exercises) => (state.exercises = exercises),

    setCategories: (state, categories) => (state.categories = categories),

    deleteExercise: (state, exerciseID) => state.exercises = state.exercises.filter(exercise => exercise.id !== exerciseID),

    setExercise: (state, exercise) => {
        const index = state.exercises.findIndex(tmpExercise => tmpExercise.id === exercise.id);
        if (index !== -1) {
            state.exercises.splice(index, 1, exercise);
        }
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};
