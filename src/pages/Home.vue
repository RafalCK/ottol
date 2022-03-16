<template>
	<h1>Witaj w internetowym totalizatorze sportowym <span class="decoration">Ottol</span></h1>
	<base-card class="card1">
		<template #header>Wejdz do gry</template>
		<router-link class="card__link" to="/game">Graj</router-link>
		<template #text>Obstaw swoje liczby i powiel swoje saldo</template>
	</base-card>
	<base-card class="card2">
		<template #header>Sprawdź czy wygrałeś</template>
		<router-link class="card__link" to="/results">Sprawdz wyniki</router-link>
		<template #text>Być może to do Ciebie uśmiechnie się los i będziesz bogaty</template>
	</base-card>
	<base-card class="card3">
		<template #header>Doładuj swoje konto</template>
		<router-link class="card__link" to="/account">Konto</router-link>
		<template #text>Gdy zabraknie Ci środków nie martw się. Możesz je w łatwy sposób doładować.</template>
	</base-card>
</template>

<script>
import BaseCard from "../components/base/BaseCard.vue";
export default {
	name: "Home",
	components: { BaseCard },
};
</script>

<style lang="scss" scoped>
h1 {
	text-align: center;
	margin-bottom: toRem(50);
}

.card1::after {
	content: "1";
}
.card2::after {
	content: "2";
}
.card3::after {
	content: "3";
}
</style>
