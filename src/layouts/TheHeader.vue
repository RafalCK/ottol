<template>
	<div class="header">
		<h2>Ottol</h2>
		<nav>
			<router-link to="/game">Graj</router-link>
			<router-link to="/results">Sprawdz wyniki</router-link>
			<router-link to="/account">Konto</router-link>
		</nav>
	</div>
</template>

<script>
export default {
	name: "TheHeader",
	components: {},
};
</script>

<style lang="scss" scoped>
.header {
	height: toRem(60);
	background: salmon;
	padding: 0 toRem(20);

	display: flex;
	align-items: center;
	justify-content: space-between;
}

a {
	margin-right: toRem(16);
	text-decoration: none;
	color: $color-white;
	font-size: toRem(18);
	transition: color 0.2s ease-in-out;

	&:hover {
		color: $color-text;
	}
}
</style>
