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

<style lang="scss">
.header {
	height: 60px;
	width: 100%;
	background: salmon;

	display: flex;
	align-items: center;
	justify-content: space-between;
}

a {
	margin-right: 10px;
	text-decoration: none;
}
</style>
