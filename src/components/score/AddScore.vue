<template>
	<div class="form__input" :class="{ has__error: creditsError }">
		<label for="credits">Ilość doładowania kredytów:</label>
		<input v-model="credits" type="number" name="credits" min="1" max="1000" />
		<span>{{ creditsError }}</span>
	</div>
	<base-button @click="addCredits" class="btn--secondary">Dodaj kredyty</base-button>
</template>

<script>
import { useStore } from "vuex";
import { useField } from "vee-validate";
import * as yup from "yup";
import { computed } from "vue";
import BaseButton from "../base/BaseButton.vue";

export default {
	name: "AddScore",
	components: { BaseButton },
	setup() {
		const store = useStore();
		const { value: credits, errorMessage: creditsError } = useField("credits", yup.number().min(1).max(1000).empty().nullable());

		const score = computed(() => store.state.score);

		function addCredits() {
			store.dispatch("addCredits", { value: credits.value });
			credits.value = undefined;
		}

		return {
			addCredits,
			credits,
			score,
			creditsError,
		};
	},
};
</script>

<style lang="scss" scoped>
h1 {
	text-align: center;
	margin-bottom: toRem(50);
}
</style>
