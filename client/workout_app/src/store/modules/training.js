
const state = {
    errors: [],
    exercises: {},
};

const getters = {
    getExercises(state) {
        return state.exercises;
    },
    errors(state) {
        return state.errors;
    }
};

const actions = {
    // TODO: define action (tip: FETCH_USER action, Profile.vue)
    // actions are called from events, which are handled in Vue components
};

const mutations = {
    // TODO: define mutations
    // mutations mutate state
};

export default {
    state,
    actions,
    mutations,
    getters
};
