import { createStore } from "vuex";

export default createStore({
	state: {
		score: 100,
	},
	mutations: {
		addCredits(state, payload) {
			state.score = state.score + payload.value;
		},
		removeCredits(state, payload) {
			state.score = state.score - payload.value;
		},
	},
	actions: {
		addCredits(context, payload) {
			context.commit("addCredits", payload);
		},
		removeCredits(context, payload) {
			context.commit("removeCredits", payload);
		},
	},
	modules: {},
});
