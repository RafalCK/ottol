<template>
	<div class="footer">
		<span class="footer__info">Ottol © 2022 Made by RafalCK</span>
	</div>
</template>

<script>
export default {
	name: "TheFooter",
	components: {},
};
</script>

<style lang="scss">
.footer {
	height: toRem(60);
	width: 100%;
	background: $color-primary;

	display: flex;
	align-items: center;
	justify-content: center;

	&__info {
		color: $color-white;
	}
}
</style>
