<template>
	<h1>Twoje <span class="decoration">Konto</span></h1>
	<div class="account__board">
		<h3>Aktualny stan konta: {{ score }}</h3>
		<add-score />
	</div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import AddScore from "../components/score/AddScore.vue";

export default {
	name: "Account",
	components: { AddScore },
	setup() {
		const store = useStore();

		const score = computed(() => store.state.score);

		return {
			score,
		};
	},
};
</script>

<style lang="scss" scoped>
h1 {
	text-align: center;
	margin-bottom: toRem(50);
}

@media (max-width: 576px) {
	h1 {
		font-size: toRem(34);
	}

	h3 {
		font-size: toRem(18);
	}
}
</style>
