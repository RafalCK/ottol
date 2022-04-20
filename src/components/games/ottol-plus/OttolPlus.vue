<template>
	<div class="game__header">
		<div class="game__image">
			<img src="@/assets/images/lotto_plus.png" />
		</div>
		<h1>Ottol Plus</h1>
	</div>
	<p class="game__info">Wybierz <span class="game__info--bold">6</span> spośród <span class="game__info--bold">49</span> liczb (Przedział liczbowy od 1 do 49). Jeśli nie masz swoich wytypowanych liczb możesz zagrać systemem na chybił trafił.</p>
	<div class="game__board">
		<div class="game__board--left">
			<form class="game__form" @submit="onSubmit">
				<div class="form__input" :class="{ has__error: firstNumberError }">
					<label for="firstNumber">Pierwsza liczba</label>
					<input v-model="firstNumber" type="number" name="firstNumber" min="1" max="50" />
					<span>{{ firstNumberError }}</span>
				</div>
				<div class="form__input" :class="{ has__error: secondNumberError }">
					<label for="secondNumber">Druga liczba</label>
					<input v-model="secondNumber" type="number" name="secondNumber" min="1" max="50" />
					<span>{{ secondNumberError }}</span>
				</div>
				<div class="form__input" :class="{ has__error: thirdNumberError }">
					<label for="thirdNumber">Trzecia liczba</label>
					<input v-model="thirdNumber" type="number" name="thirdNumber" min="1" max="50" />
					<span>{{ thirdNumberError }}</span>
				</div>
				<div class="form__input" :class="{ has__error: fourthNumberError }">
					<label for="fourthNumber">Czwarta liczba</label>
					<input v-model="fourthNumber" type="number" name="fourthNumber" min="1" max="50" />
					<span>{{ fourthNumberError }}</span>
				</div>
				<div class="form__input" :class="{ has__error: fifthNumberError }">
					<label for="fifthNumber">Piąta liczba</label>
					<input v-model="fifthNumber" type="number" name="fifthNumber" min="1" max="50" />
					<span>{{ fifthNumberError }}</span>
				</div>
				<div class="game__confirm">
					<base-button :disabled="noWinnerNumbers" type="button" @click="randomMode" class="game__btn--reverse">Chybił trafił</base-button>
					<base-button :disabled="noWinnerNumbers" class="game__btn">Graj</base-button>
				</div>
				<div v-if="randomNumbers.length == 5" class="game__reset">
					<base-button type="button" class="game__btn--reset" @click="restartGame">Zagraj ponownie</base-button>
				</div>
			</form>
		</div>
		<div class="game__board--right">
			<div class="game__summary">
				<span class="summary__header">Wybrane liczby</span>
				<ul class="summary__balls">
					<li v-for="number of choosedNumbers" key="number" class="ball ball--blue">{{ number }}</li>
				</ul>
				<span class="summary__header">Wylosowane liczby</span>
				<ul class="summary__balls">
					<li v-for="number of randomNumbers" key="number" class="ball ball--yellow">{{ number }}</li>
				</ul>
				<span class="summary__header">Trafione liczby</span>
				<span class="summary__info" v-if="noWinnerNumbers && winnerNumbers.length === 0">Nie trafino żadnej liczby</span>
				<ul v-else class="summary__balls">
					<li v-for="number of winnerNumbers" key="number" class="ball ball--white">{{ number }}</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import BaseCard from "../../base/BaseCard.vue";
import BaseInput from "../../base/BaseInput.vue";
import BaseButton from "../../base/BaseButton.vue";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { computed, ref } from "vue";

export default {
	name: "OttolPlus",
	components: { BaseCard, BaseInput, BaseButton },
	setup() {
		const submittedNumbers = [];
		let randomNumbers = ref([]);
		const numbers = ref([]);
		let winnerNumbers = ref([]);
		let noWinnerNumbers = ref(false);

		const areWinnerNumbers = computed(() => (winnerNumbers.value.length == 0 ? true : false));

		let choosedNumbers = computed(() => {
			return [firstNumber.value, secondNumber.value, thirdNumber.value, fourthNumber.value, fifthNumber.value];
		});

		const schema = computed(() => {
			return yup.object({
				firstNumber: yup
					.number()
					.required()
					.min(1)
					.max(50)
					.empty()
					.nullable()
					.notOneOf([yup.ref("secondNumber"), yup.ref("thirdNumber"), yup.ref("fourthNumber"), yup.ref("fifthNumber"), null], "Te liczby się powtarzają"),
				secondNumber: yup
					.number()
					.required()
					.min(1)
					.max(50)
					.empty()
					.nullable()
					.notOneOf([yup.ref("firstNumber"), yup.ref("thirdNumber"), yup.ref("fourthNumber"), yup.ref("fifthNumber"), null], "Te liczby się powtarzają"),
				thirdNumber: yup
					.number()
					.required()
					.min(1)
					.max(50)
					.empty()
					.nullable()
					.notOneOf([yup.ref("firstNumber"), yup.ref("secondNumber"), yup.ref("fourthNumber"), yup.ref("fifthNumber"), null], "Te liczby się powtarzają"),
				fourthNumber: yup
					.number()
					.required()
					.min(1)
					.max(50)
					.empty()
					.nullable()
					.notOneOf([yup.ref("firstNumber"), yup.ref("secondNumber"), yup.ref("thirdNumber"), yup.ref("fifthNumber"), null], "Te liczby się powtarzają"),
				fifthNumber: yup
					.number()
					.required()
					.min(1)
					.max(50)
					.empty()
					.nullable()
					.notOneOf([yup.ref("firstNumber"), yup.ref("secondNumber"), yup.ref("thirdNumber"), yup.ref("fourthNumber"), null], "Te liczby się powtarzają"),
			});
		});

		const { handleSubmit, handleReset } = useForm({
			validationSchema: schema.value,
		});

		let { value: firstNumber, errorMessage: firstNumberError } = useField("firstNumber");
		let { value: secondNumber, errorMessage: secondNumberError } = useField("secondNumber");
		let { value: thirdNumber, errorMessage: thirdNumberError } = useField("thirdNumber");
		let { value: fourthNumber, errorMessage: fourthNumberError } = useField("fourthNumber");
		let { value: fifthNumber, errorMessage: fifthNumberError } = useField("fifthNumber");

		function confirmNumbers() {
			getRandomNumbers();
		}

		function getRandom(min, max) {
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}

		function drawNumbers() {
			let number;
			let numberInArray;
			for (let i = 0; i < 5; i++) {
				let rev = i;
				setTimeout(function () {
					do {
						number = getRandom(1, 49);
						numberInArray = randomNumbers.value.includes(number);
						if (!numberInArray) {
							randomNumbers.value.push(number);
						}
					} while (numberInArray);
					winnerNumbers.value = submittedNumbers.filter((element) => randomNumbers.value.includes(element));
				}, 1500 * (rev + 1));
			}
		}

		function randomMode() {
			let numberInArray;
			numbers.value = [];
			firstNumber.value = getRandom(1, 49);
			numbers.value.push(firstNumber.value);
			do {
				secondNumber.value = getRandom(1, 49);
				numberInArray = numbers.value.includes(secondNumber.value);
				if (!numberInArray) {
					numbers.value.push(secondNumber.value);
				}
			} while (numberInArray);
			do {
				thirdNumber.value = getRandom(1, 49);
				numberInArray = numbers.value.includes(thirdNumber.value);
				if (!numberInArray) {
					numbers.value.push(thirdNumber.value);
				}
			} while (numberInArray);
			do {
				fourthNumber.value = getRandom(1, 49);
				numberInArray = numbers.value.includes(fourthNumber.value);
				if (!numberInArray) {
					numbers.value.push(fourthNumber.value);
				}
			} while (numberInArray);
			do {
				fifthNumber.value = getRandom(1, 49);
				numberInArray = numbers.value.includes(fifthNumber.value);
				if (!numberInArray) {
					numbers.value.push(fifthNumber.value);
				}
			} while (numberInArray);
		}

		function restartGame() {
			randomNumbers.value = [];
			winnerNumbers.value = [];
			noWinnerNumbers.value = false;
			handleReset();
		}

		const onSubmit = handleSubmit(() => {
			submittedNumbers.push(firstNumber.value);
			submittedNumbers.push(secondNumber.value);
			submittedNumbers.push(thirdNumber.value);
			submittedNumbers.push(fourthNumber.value);
			submittedNumbers.push(fifthNumber.value);
			noWinnerNumbers.value = true;
			drawNumbers();
		});

		return {
			numbers,
			choosedNumbers,
			submittedNumbers,
			randomNumbers,
			winnerNumbers,
			firstNumber,
			secondNumber,
			thirdNumber,
			fourthNumber,
			fifthNumber,
			firstNumberError,
			secondNumberError,
			thirdNumberError,
			fourthNumberError,
			fifthNumberError,
			areWinnerNumbers,
			noWinnerNumbers,
			handleReset,
			confirmNumbers,
			onSubmit,
			drawNumbers,
			randomMode,
			restartGame,
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

	&__confirm {
		display: flex;
		gap: 40px;
	}

	&__btn {
		margin-top: 10px;
		padding: toRem(10) toRem(15);
		color: $color-primary;
		border: 1px solid $color-primary;
		background: transparent;
		transition: $transition;
		cursor: pointer;
		min-width: 144px;

		&:disabled {
			color: $color-white;
			background: $color-primary;
			opacity: 0.5;
		}

		&:hover {
			color: $color-white;
			background: $color-primary;
			transition: $transition;
		}

		&--reverse {
			@extend .game__btn;
			color: $color-text;
			border: 1px solid $color-text;

			&:hover {
				background: $color-text;
			}

			&:disabled {
				background: $color-text;
				opacity: 0.6;
			}
		}

		&--reset {
			@extend .game__btn;
			color: $color-succes;
			border: 1px solid $color-succes;

			&:hover {
				background: $color-succes;
				color: $color-white;
			}
		}
	}

	&__board {
		display: flex;

		&--left {
			display: flex;
			flex: 2 1 0;
		}

		&--right {
			display: flex;
			flex: 1 1 0;
			justify-content: center;
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
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		width: 100%;

		margin-bottom: toRem(10);

		.has__error {
			label {
				color: $color-error;
			}
		}

		label {
			width: 30%;
			margin-bottom: toRem(2);
		}

		input {
			width: 30%;
			height: toRem(30);

			border: 1px solid $color-primary;
			border-radius: 4px;

			color: $color-text;
		}
	}
}
</style>
