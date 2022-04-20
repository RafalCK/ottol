<template>
	<div class="score">
		<span class="score__points">Saldo: 100</span>
	</div>
</template>

<script>
export default {
	name: "ScoreBar",
	components: {},
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
