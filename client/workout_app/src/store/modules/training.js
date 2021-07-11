import ApiService from "@/common/api_service";

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

        commit('setExercises', data);

        return data;
    },

    async fetchCategoriesAction({ commit }) {
        ApiService.setAuthHeader();

        const response = await ApiService.get('categories/');
        const { data } = response;

        commit('setCategories', data);

        return data;
    },

    async deleteExerciseAction(_, payload) {
        const { exerciseID } = payload;
        ApiService.setAuthHeader();

        return ApiService.delete(`exercises/${exerciseID}`);
    },

    async editExerciseAction(_, payload) {
        let id, exercise;
        ({ id, ...exercise } = payload);

        ApiService.setAuthHeader();

        return ApiService.patch(`exercises/${id}`, exercise);
    },
}

const mutations = {
    setError: (state, error) => state.errors = error,
    setExercises: (state, exercises) => {
        state.exercises = exercises
    },
    setCategories: (state, categories) => (state.categories = categories),
};

export default {
    state,
    actions,
    mutations,
    getters
};
