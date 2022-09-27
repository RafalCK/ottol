import { createStore } from "vuex";

export default createStore({
	state: {
		score: 100,
		result: [],
	},
	getters: {
		doneResults: (state) => {
			return state.result;
		},
	},
	mutations: {
		addCredits(state, payload) {
			state.score = state.score + payload.value;
		},
		removeCredits(state, payload) {
			state.score = state.score - payload.value;
		},
		addResult(state, payload) {
			state.result.push({
				gameName: payload.gameName,
				betValue: payload.betValue,
				choosen: payload.choosen,
				random: payload.random,
				winner: payload.winner,
				credits: payload.credits,
				saldo: payload.saldo,
			});
		},
	},
	actions: {
		addCredits(context, payload) {
			context.commit("addCredits", payload);
		},
		removeCredits(context, payload) {
			context.commit("removeCredits", payload);
		},
		addResult(context, payload) {
			context.commit("addResult", payload);
		},
	},
	modules: {},
});
