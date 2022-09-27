<template>
	<div class="game__header">
		<div class="game__image">
			<img src="@/assets/images/super_szansa.png" />
		</div>
		<h1 class="game__header-title">{{ gameName }}</h1>
	</div>
	<p class="game__info">
		Wybierz czy wylosowana liczba będzie <span class="game__info--bold">czarna/czerwona</span> lub <span class="game__info--bold">parzysta/nieparzysta</span>. Możesz też połączyć te zakładay i zainkasować większą wygraną.<br />
		(Przedział liczbowy od 1 do 36). Jeśli nie masz swoich wytypowanych zakładów możesz zagrać systemem na chybił trafił.
	</p>
	<div class="game__board">
		<div class="game__board--left">
			<form class="game__form" @submit="onSubmit">
				<div class="game__choose">
					<div class="game__choose--item">
						<h3>Liczba:</h3>
						<div class="game__choose--option">
							<label for="even">Parzysta</label>
							<input type="radio" id="even" value="Parzysta" v-model="evenOdd" name="evenOdd" />
							<label for="odd">Nieparzysta</label>
							<input type="radio" id="odd" value="Nieparzysta" v-model="evenOdd" name="evenOdd" />
						</div>
					</div>
					<div class="game__choose--item">
						<h3>Kolor:</h3>
						<div class="game__choose--option">
							<label for="black">Czarne</label>
							<input type="radio" id="black" value="Czarna" v-model="blackRed" name="blackRed" />
							<label for="red">Czerwone</label>
							<input type="radio" id="red" value="Czerwona" v-model="blackRed" name="blackRed" />
						</div>
					</div>
				</div>
				<div class="game__confirm">
					<div class="game__controls">
						<base-button :disabled="gameState.start" type="button" @click="randomMode" class="btn--secondary">Chybił trafił</base-button>
						<div class="game__bid" :class="{ has__error: bidError }">
							<label for="bid">Stawka</label>
							<input v-model="bid" :disabled="gameState.start" type="number" name="bid" min="1" max="1000" />
						</div>
						<base-button :disabled="gameState.start || canPlay" class="btn--primary">Graj</base-button>
					</div>
					<div class="game__confirm--error" :class="{ has__error: bidError }">
						<span>{{ bidError }}</span>
					</div>
				</div>
				<div class="game__reset">
					<base-button v-if="gameState.start" type="button" class="btn--succes" @click="restartGame">Zagraj ponownie</base-button>
					<base-button v-if="addPoints || addPointsBtn" type="button" class="btn--succes" @click="showAddCreditsBtn">{{ showHide }}</base-button>
				</div>
			</form>
			<div class="game__charge" v-if="addPointsBtn">
				<add-score />
			</div>
		</div>
		<div class="game__board--right">
			<div class="game__summary">
				<span class="summary__header">Wybrane opcje</span>
				<ul class="summary__balls">
					<span :class="numberColor">{{ submittedOptions }}</span>
				</ul>
				<span class="summary__header">Wylosowane opcje</span>
				<ul class="summary__balls">
					<li v-if="gameState.start" class="ball" :class="ballColorClass">{{ randomNumber }}</li>
					<span class="drawn__options" :class="ballColorClass">{{ randomedOptions(randomedColor, randomedOddEven) }}</span>
				</ul>
				<span class="summary__header">Trafione opcje</span>
				<template v-if="gameState.start">
					<ul class="summary__options">
						<li v-if="blackRed != null">
							Kolor : <span :class="[gameState.color ? 'green' : 'red']">{{ gameState.color === true ? "Tak" : "Nie" }}</span>
						</li>
						<li v-if="evenOdd != null">
							Parzystość : <span :class="[gameState.number ? 'green' : 'red']">{{ gameState.number === true ? "Tak" : "Nie" }}</span>
						</li>
					</ul>
					<span v-if="gameState.color === true || gameState.number === true" class="summary__info--success">Gratulacje wygrałeś {{ winnersCredits }} kredytów </span>
					<span class="summary__info" v-else>Nie trafino żadnej kombinacji</span>
				</template>
			</div>
		</div>
	</div>
</template>

<script>
import { useStore } from "vuex";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { computed, ref, reactive } from "vue";
import BaseCard from "../../base/BaseCard.vue";
import BaseButton from "../../base/BaseButton.vue";
import AddScore from "../../score/AddScore";
import useRandomNumbers from "../../../composables/useRandomNumbers";

export default {
	name: "RepusSzansa",
	components: { BaseCard, BaseButton, AddScore },
	setup() {
		const store = useStore();
		const score = computed(() => store.state.score);
		const { getRandom } = useRandomNumbers();
		const evenOdd = ref(null);
		const blackRed = ref(null);
		const gameName = "Repus Szansa";

		let submittedOptions = ref("");
		let winnerOptionsArray = ref([]);
		let submittedOptionsArray = ref([]);
		let winnerNumbers = ref([]);
		let addPointsBtn = ref(false);
		let checkedBid = ref();
		let randomNumber = ref(null);
		let ballColor = ref(null);
		let randomedColor = ref("");
		let randomedOddEven = ref("");
		const gameState = reactive({
			color: false,
			number: false,
			start: false,
		});

		let resultCredits = 0;
		let resultScore = 0;

		const numberColor = computed(() => ({
			text_black: blackRed.value === "Czarna",
			text_red: blackRed.value === "Czerwona",
		}));

		const ballColorClass = computed(() => ({
			ball_black: ballColor.value === 0,
			ball_red: ballColor.value === 1,
		}));

		const addPoints = computed(() => (bid.value > score.value ? true : false) || score.value == 0);
		let winnersCredits = computed(() => checkedBid.value * winnerOptionsArray.value.length * 2);
		const showHide = computed(() => (addPointsBtn.value ? "Ukryj dodawanie kredytów" : "Dokup kredyty"));
		const areWinnerNumbers = computed(() => (winnerNumbers.value.length == 0 ? true : false));
		const canPlay = computed(() => (blackRed.value === null && evenOdd.value === null ? true : false));
		let selectedOptions = computed(() => (blackRed.value === null ? "" : blackRed.value) + " " + (evenOdd.value === null ? "" : evenOdd.value));
		let randomedOptions = (color, number) => {
			return color + " " + number;
		};

		const schema = computed(() => {
			return yup.object({
				bid: yup.number().required().min(1).max(score.value, "Nie masz wystarcząjco kredytów").empty().nullable(),
			});
		});

		const { handleSubmit, handleReset } = useForm({
			validationSchema: schema,
		});

		let { value: bid, errorMessage: bidError } = useField("bid");

		const onSubmit = handleSubmit(() => {
			submittedOptions.value = selectedOptions.value;
			checkedBid.value = bid.value;
			gameState.start = true;
			if (blackRed.value !== null) {
				submittedOptionsArray.value.push(blackRed);
			}
			if (evenOdd.value !== null) {
				submittedOptionsArray.value.push(evenOdd);
			}
			removeCredits();
			handleReset();
			drawNumber();
		});

		function removeCredits() {
			store.dispatch("removeCredits", { value: checkedBid.value });
		}

		function addCredits() {
			store.dispatch("addCredits", { value: checkedBid.value * winnerOptionsArray.value.length * 2 });
		}

		function addResult() {
			store.dispatch("addResult", { gameName: gameName, betValue: checkedBid.value, choosen: selectedOptions.value, random: randomedOptions(randomedColor.value, randomedOddEven.value), winner: winnerOptionsArray.value.length > 0 ? winnerOptionsArray.value : "Brak trafionych opcji", credits: (resultCredits = winnersCredits.value), saldo: (resultScore = score.value) });
		}

		function drawNumber() {
			const number = getRandom(1, 36);
			const color = getRandom(0, 1);
			let drawNum = "";
			let drawnColor = "";
			randomNumber.value = number;
			number % 2 == 0 ? (drawNum = "Parzysta") : (drawNum = "Nieparzysta");
			color == 0 ? (drawnColor = "Czarna") : (drawnColor = "Czerwona");
			ballColor.value = color;
			randomedColor.value = drawnColor;
			randomedOddEven.value = drawNum;
			if (drawnColor === blackRed.value && drawNum === evenOdd.value) {
				gameState.color = true;
				gameState.number = true;
				winnerOptionsArray.value.push(drawnColor);
				winnerOptionsArray.value.push(drawNum);
			} else if (drawNum === evenOdd.value && drawnColor !== blackRed.value) {
				gameState.color = false;
				gameState.number = true;
				winnerOptionsArray.value.push(drawNum);
			} else if (drawnColor === blackRed.value && drawNum !== evenOdd.value) {
				gameState.color = true;
				gameState.number = false;
				winnerOptionsArray.value.push(drawnColor);
			} else if (drawnColor !== blackRed.value && drawNum !== evenOdd.value) {
				gameState.color = false;
				gameState.number = false;
			}
			addCredits();
			addResult();
		}

		function randomMode() {
			const number = getRandom(0, 1);
			const color = getRandom(0, 1);
			number === 0 ? (evenOdd.value = "Parzysta") : (evenOdd.value = "Nieparzysta");
			color === 0 ? (blackRed.value = "Czarna") : (blackRed.value = "Czerwona");
		}

		function restartGame() {
			submittedOptions.value = "";
			winnerNumbers.value = [];
			checkedBid.value = null;
			randomedColor.value = "";
			randomedOddEven.value = "";
			gameState.start = false;
			winnerOptionsArray.value = [];
			submittedOptionsArray.value = [];
		}

		function showAddCreditsBtn() {
			addPointsBtn.value = !addPointsBtn.value;
		}

		return {
			gameName,
			submittedOptions,
			winnerNumbers,
			bid,
			bidError,
			areWinnerNumbers,
			selectedOptions,
			addPoints,
			addPointsBtn,
			showHide,
			winnersCredits,
			checkedBid,
			drawNumber,
			randomMode,
			onSubmit,
			restartGame,
			showAddCreditsBtn,
			canPlay,
			evenOdd,
			blackRed,
			numberColor,
			randomNumber,
			ballColor,
			ballColorClass,
			randomedOptions,
			randomedColor,
			randomedOddEven,
			gameState,
			submittedOptionsArray,
			winnerOptionsArray,
		};
	},
};
</script>

<style lang="scss" scoped>
.game {
	&__header {
		margin-top: toRem(30);
		background: $color-white;

		box-shadow: 0 6px 10px rgba(0, 0, 0, 0.08), 0 0 6px rgba(0, 0, 0, 0.05);
		transition: 0.3s transform cubic-bezier(0.155, 1.105, 0.295, 1.12), 0.3s box-shadow, 0.3s -webkit-transform cubic-bezier(0.155, 1.105, 0.295, 1.12);

		cursor: pointer;

		padding: toRem(20);
		margin-bottom: toRem(20);
		border-radius: 4px;

		position: relative;
		overflow: hidden;

		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;

		&:hover {
			transform: scale(1.05);
			box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06);
		}
	}

	&__image {
		max-width: toRem(160);
		height: 100%;

		img {
			width: 100%;
			height: auto;
		}
	}

	&__info {
		text-align: center;
		font-size: toRem(15);
		margin-bottom: toRem(22);

		&--bold {
			font-weight: $bold;
			color: $color-primary;
		}
	}

	&__form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		width: 100%;
	}

	&__choose {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 48%;

		&--item {
			display: flex;
			flex-direction: row;
			flex: 1 1 0;
		}

		&--option {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			width: 100%;

			input {
				margin: 0 toRem(10);
			}
		}
	}

	&__confirm {
		&--error {
			text-align: center;
			margin-top: 10px;
		}
	}

	&__controls {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;

		.btn {
			margin-top: 10px;
		}
	}

	&__bid {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		margin: 0 25px;

		input {
			height: toRem(24);
		}
	}

	&__board {
		display: flex;

		&--left {
			display: flex;
			flex-direction: column;
			flex: 2 1 0;
		}

		&--right {
			flex: 1 1 0;
		}
	}

	&__summary {
		display: flex;
		flex-direction: column;
		align-items: center;

		width: 60%;

		background-color: #f8f8f8;

		padding: toRem(20);

		.text_red {
			color: $color-error;
		}

		.text_black {
			color: $color-black;
		}
	}

	&__reset {
		display: flex;
		margin-top: 10px;
		gap: 10px;
	}

	&__charge {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 20px;

		:deep() .form__input {
			align-items: center;
		}
	}
}

.summary {
	&__header {
		text-transform: uppercase;
		color: $color-additional;
	}
	&__balls {
		display: flex;
		flex-direction: row;

		padding: 0;
		list-style: none;
	}

	&__info {
		margin-top: toRem(16);
		text-align: center;
	}

	&__options {
		display: flex;
		flex-direction: column;
		padding: 0;
		list-style: none;

		.red {
			color: $color-error;
			text-transform: uppercase;
		}

		.green {
			color: $color-succes;
			text-transform: uppercase;
		}
	}
}

.drawn__options {
	display: flex;
	align-items: center;
	&.ball_red {
		color: $color-error;
		background: transparent;
	}

	&.ball_black {
		color: $color-black;
		background: transparent;
	}
}

.ball {
	width: toRem(30);
	height: toRem(30);
	border-radius: 50%;

	margin-right: toRem(8);

	font-weight: $bold;

	display: flex;
	justify-content: center;
	align-items: center;

	&_black {
		background: $color-black;
		color: $color-white;
	}

	&_red {
		background: $color-error;
		color: $color-white;
	}
}

.form {
	&__input {
		align-items: center;
	}
}

@media (max-width: 800px) {
	.game__choose {
		width: 100%;

		h3 {
			text-align: center;
		}
	}
	.game__choose--item {
		flex-direction: column;
	}

	.game__controls {
		margin-top: toRem(20);
	}
}

@media (min-width: 801px) and (max-width: 1400px) {
	.game__choose {
		width: 100%;
		align-items: center;
	}

	.game__choose--option {
		justify-content: flex-start;
		margin-left: toRem(20);
	}

	.game__summary {
		width: 100%;
		margin-left: toRem(30);
	}
}
</style>
