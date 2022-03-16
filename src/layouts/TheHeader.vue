<template>
	<div class="header">
		<div class="logo">
			<router-link to="/">
				<img src="../assets/images/logo_ottol.png" />
			</router-link>
		</div>
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
	background: $color-primary;
	padding: 0 toRem(20);

	display: flex;
	align-items: center;
	justify-content: space-between;
}

.logo {
	max-width: toRem(85);
	height: toRem(65);
	img {
		width: 100%;
		height: auto;
		object-fit: cover;
	}
}

a {
	margin-right: toRem(16);
	text-decoration: none;
	color: $color-white;
	font-size: toRem(18);
	font-weight: $bold;
	transition: color 0.2s ease-in-out;

	&:hover {
		color: $color-hover;
	}
}
</style>
