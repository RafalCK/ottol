<template>
	<div class="score">
		<span class="score__points">Saldo: {{ score }}</span>
	</div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
	name: "ScoreBar",
	components: {},
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
.score {
	height: toRem(30);
	background: $color-grey;
	padding: 0 toRem(35);

	display: flex;
	align-items: center;
	justify-content: flex-end;

	&__points {
		font-weight: $bold;
		font-size: toRem(16);
	}
}
</style>
