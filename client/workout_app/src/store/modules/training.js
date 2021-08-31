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

    async fetchExercisesAction({ commit, rootGetters }) {
        ApiService.setAuthHeader();

        const user = rootGetters.currentUser;
        const response = await ApiService.get('exercises/', {'user': user.id});
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

    async addExerciseAction({ commit, rootGetters }, payload) {
        ApiService.setAuthHeader();

        const user = rootGetters.currentUser;

        payload['user'] = user.id;

        console.log(payload);

        const response = await ApiService.post(`exercises/`, payload);
        const { data } = response;

        commit(SET_EXERCISE, data);

        return data;
    },

    async uploadImageAction({ commit }, payload) {
        ApiService.setAuthHeader();
        ApiService.setMultipartHeader()

        const { file, exerciseID, locationOrigin } = payload;
        const formData = new FormData()

        formData.append("file", file)
        formData.append("exercise_id", exerciseID)
        formData.append("location_origin", locationOrigin)

        const response = await ApiService.post(`exercises/image`, formData);
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
