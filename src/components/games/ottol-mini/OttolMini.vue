<template>
	<div class="game__header">
		<div class="game__image">
			<img src="@/assets/images/mini_lotto.png" />
		</div>
		<h1 class="game__header-title">{{ gameName }}</h1>
	</div>
	<p class="game__info">Wybierz <span class="game__info--bold">3</span> spośród <span class="game__info--bold">9</span> liczb (Przedział liczbowy od 1 do 9). Jeśli nie masz swoich wytypowanych liczb możesz zagrać systemem na chybił trafił.</p>
	<div class="game__board">
		<div class="game__board--left">
			<form class="game__form" @submit="onSubmit">
				<BaseMultiCheckbox v-model:value="selectedNumbers" :options="numbers" />
				<div class="game__confirm">
					<div class="game__controls">
						<base-button :disabled="noWinnerNumbers" type="button" @click="runRandomMode(3, selectedNumbers)" class="btn--secondary">Chybił trafił</base-button>
						<div class="game__bid" :class="{ has__error: bidError }">
							<label for="bid">Stawka</label>
							<input v-model="bid" :disabled="noWinnerNumbers" type="number" name="bid" min="1" max="1000" />
						</div>
						<base-button :disabled="noWinnerNumbers || canPlay" class="btn--primary">Graj</base-button>
					</div>
					<div class="game__confirm--error" :class="{ has__error: bidError }">
						<span>{{ bidError }}</span>
					</div>
				</div>
				<div class="game__reset">
					<base-button v-if="randomNumbers.length == 3" type="button" class="btn--succes" @click="restartGame">Zagraj ponownie</base-button>
					<base-button v-if="addPoints || addPointsBtn" type="button" class="btn--succes" @click="showAddCreditsBtn">{{ showHide }}</base-button>
				</div>
			</form>
			<div class="game__charge" v-if="addPointsBtn">
				<add-score />
			</div>
		</div>
		<div class="game__board--right">
			<div class="game__summary">
				<span class="summary__header">Wybrane liczby</span>
				<ul class="summary__balls">
					<li v-for="number of submittedNumbers" key="number" class="ball ball--blue">{{ number }}</li>
				</ul>
				<span class="summary__header">Wylosowane liczby</span>
				<ul class="summary__balls">
					<li v-for="number of randomNumbers" key="number" class="ball ball--yellow">{{ number }}</li>
				</ul>
				<span class="summary__header">Trafione liczby</span>
				<template v-if="winnerNumbers.length !== 0">
					<ul class="summary__balls">
						<li v-for="number of winnerNumbers" key="number" class="ball ball--white">{{ number }}</li>
					</ul>
					<span class="summary__info--success">Gratulacje wygrałeś {{ winnersCredits }} kredytów </span>
				</template>
				<span class="summary__info" v-else-if="noWinnerNumbers && winnerNumbers.length === 0">Nie trafino żadnej liczby</span>
			</div>
		</div>
	</div>
</template>

<script>
import { useStore } from "vuex";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { computed, ref } from "vue";
import BaseCard from "../../base/BaseCard.vue";
import BaseButton from "../../base/BaseButton.vue";
import AddScore from "../../score/AddScore";
import BaseCheckbox from "../../base/BaseCheckbox.vue";
import BaseMultiCheckbox from "../../base/BaseMultiCheckbox.vue";
import useRandomNumbers from "../../../composables/useRandomNumbers";
export default {
	name: "OttolMini",
	components: { BaseCard, BaseButton, AddScore, BaseCheckbox, BaseMultiCheckbox },
	setup() {
		const store = useStore();
		const score = computed(() => store.state.score);
		const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		const { getRandom, drawNumbers } = useRandomNumbers();
		const gameName = "Ottol Mini";

		let submittedNumbers = ref([]);
		let randomNumbers = ref([]);
		let winnerNumbers = ref([]);
		let noWinnerNumbers = ref(false);
		let addPointsBtn = ref(false);
		let checkedBid = ref();
		const selectedNumbers = ref([]);

		const addPoints = computed(() => (bid.value > score.value ? true : false) || score.value == 0);
		let winnersCredits = computed(() => checkedBid.value * winnerNumbers.value.length);
		const showHide = computed(() => (addPointsBtn.value ? "Ukryj dodawanie kredytów" : "Dokup kredyty"));
		const areWinnerNumbers = computed(() => (winnerNumbers.value.length == 0 ? true : false));
		const canPlay = computed(() => (selectedNumbers.value.length === 3 ? false : true));

		let resultCredits = 0;
		let resultScore = 0;

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
			submittedNumbers.value = selectedNumbers.value;
			noWinnerNumbers.value = true;
			checkedBid.value = bid.value;
			removeCredits();
			handleReset();
			drawNumbers(3, randomNumbers, winnerNumbers, submittedNumbers, addCredits, 1, 9, addResult);
		});

		function removeCredits() {
			store.dispatch("removeCredits", { value: checkedBid.value });
		}

		function addCredits() {
			store.dispatch("addCredits", { value: checkedBid.value * winnerNumbers.value.length });
		}

		function addResult() {
			store.dispatch("addResult", { gameName: gameName, betValue: checkedBid.value, choosen: submittedNumbers.value, random: randomNumbers.value, winner: winnerNumbers.value.length > 0 ? winnerNumbers.value : "Brak trafionych opcji", credits: (resultCredits = winnersCredits.value), saldo: (resultScore = score.value) });
		}

		function randomMode(numberMax, numberInArray) {
			const number = getRandom(1, 9);
			if (!numberInArray.includes(number)) {
				numberInArray.push(number);
			}
			if (numberInArray.length < numberMax) {
				randomMode(numberMax, numberInArray);
			}
			return numberInArray;
		}

		function runRandomMode(numberMax, numberInArray) {
			if (numberInArray.length > 0) {
				numberInArray.splice(0, numberInArray.length);
				randomMode(numberMax, numberInArray);
			} else {
				randomMode(numberMax, numberInArray);
			}
		}

		function restartGame() {
			submittedNumbers.value = [];
			selectedNumbers.value = [];
			randomNumbers.value = [];
			winnerNumbers.value = [];
			checkedBid.value = null;
			noWinnerNumbers.value = false;
		}

		function showAddCreditsBtn() {
			addPointsBtn.value = !addPointsBtn.value;
		}

		return {
			numbers,
			submittedNumbers,
			randomNumbers,
			winnerNumbers,
			bid,
			bidError,
			areWinnerNumbers,
			noWinnerNumbers,
			addPoints,
			addPointsBtn,
			showHide,
			winnersCredits,
			checkedBid,
			drawNumbers,
			randomMode,
			onSubmit,
			restartGame,
			showAddCreditsBtn,
			selectedNumbers,
			canPlay,
			runRandomMode,
			gameName,
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

		&-title {
			margin-left: toRem(10);
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

	&__confirm {
		margin-top: toRem(40);
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
			justify-content: center;
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

	&--blue {
		background: $color-text;
		color: $color-white;
	}

	&--yellow {
		background: $color-primary;
		color: $color-black;
	}

	&--white {
		background: $color-succes;
		color: $color-white;
	}
}
.form {
	&__input {
		align-items: center;
	}
}

@media (min-width: 801px) and (max-width: 1300px) {
	.game__board--right {
		margin-left: toRem(20);
	}
}
</style>
