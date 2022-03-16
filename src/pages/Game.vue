<template>
	<h1>Wybierz <span class="decoration">Gre</span></h1>
	<div class="game">
		<div class="game__container">
			<game-card v-for="game in games" :key="game.id">
				<div class="game__image">
					<img :src="game.img" />
				</div>
				<h3>{{ game.title }}</h3>
				<router-link class="card__link" :to="game.route">Graj</router-link>
			</game-card>
		</div>
	</div>
</template>

<script>
import GameCard from "../components/card/GameCard.vue";
export default {
	name: "Game",
	components: { GameCard },
	setup() {
		const games = [
			{
				id: 1,
				title: "Ottol Plus",
				img: require("@/assets/images/lotto_plus.png"),
				route: "/game/ottol-plus",
			},
			{
				id: 2,
				title: "Ottol Mini",
				img: require("@/assets/images/mini_lotto.png"),
				route: "/game/ottol-mini",
			},
			{
				id: 3,
				title: "Repus Szansa",
				img: require("@/assets/images/super_szansa.png"),
				route: "/game/repus-szansa",
			},
		];
		return {
			games,
		};
	},
};
</script>

<style lang="scss" scoped>
h1 {
	text-align: center;
	margin-bottom: toRem(50);
}

.game {
	&__container {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: toRem(20) toRem(40);
	}

	&__image {
		max-width: toRem(200);
		height: toRem(80);

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
}
</style>
