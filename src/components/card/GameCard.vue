<template>
	<div class="game__card">
		<slot> </slot>
	</div>
</template>

<script>
export default {
	name: "GameCard",
	components: {},
};
</script>

<style lang="scss">
.game__card {
	border-radius: 4px;
	background: #fff;
	box-shadow: 0 6px 10px rgba(0, 0, 0, 0.08), 0 0 6px rgba(0, 0, 0, 0.05);
	transition: 0.3s transform cubic-bezier(0.155, 1.105, 0.295, 1.12), 0.3s box-shadow, 0.3s -webkit-transform cubic-bezier(0.155, 1.105, 0.295, 1.12);
	cursor: pointer;
	padding: toRem(20);
	margin-bottom: toRem(20);
	position: relative;
	overflow: hidden;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	&:hover {
		transform: scale(1.05);
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06);
	}

	h3 {
		font-weight: $bold;
	}

	&-info {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
}
</style>
