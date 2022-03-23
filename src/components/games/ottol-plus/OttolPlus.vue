<template>
	<div class="game__header">
		<div class="game__image">
			<img src="@/assets/images/lotto_plus.png" />
		</div>
		<h1>Ottol Plus</h1>
	</div>
	<p class="game__info">Wybierz <span class="game__info--bold">6</span> spośród <span class="game__info--bold">49</span> liczb (Przedział liczbowy od 1 do 49). Jeśli nie masz swoich wytypowanych liczb możesz zagrać systemem na chybił trafił.</p>
	<form class="game__form" @submit="onSubmit">
		<div class="form__input">
			<label for="firstNumber">Pierwsza liczba</label>
			<input v-model="firstNumber" type="number" name="firstNumber" min="1" max="50" />
			<span>{{ firstNumberError }}</span>
		</div>
		<div class="form__input">
			<label for="secondNumber">Druga liczba</label>
			<input v-model="secondNumber" type="number" name="secondNumber" min="1" max="50" />
			<span>{{ secondNumberError }}</span>
		</div>
		<div class="form__input">
			<label for="thirdNumber">Trzecia liczba</label>
			<input v-model="thirdNumber" type="number" name="thirdNumber" min="1" max="50" />
			<span>{{ thirdNumberError }}</span>
		</div>
		<div class="form__input">
			<label for="fourthNumber">Czwarta liczba</label>
			<input v-model="fourthNumber" type="number" name="fourthNumber" min="1" max="50" />
			<span>{{ fourthNumberError }}</span>
		</div>
		<div class="form__input">
			<label for="fifthNumber">Piąta liczba</label>
			<input v-model="fifthNumber" type="number" name="fifthNumber" min="1" max="50" />
			<span>{{ fifthNumberError }}</span>
		</div>
		<div class="game__confirm">
			<base-button type="button" class="game__btn--reverse">Chybił trafił</base-button>
			<base-button class="game__btn">Zatwierdz liczby</base-button>
		</div>
	</form>
	<p>Test Array : {{ testArray }}</p>
	<p>Test Computed : {{ numbersArray }}</p>
	<p>Chybił trafił liczby: {{ numbers.join(",") }}</p>
	<p>Potwierdzone liczby: {{ submittedNumbers.join(",") }}</p>
	<p>Wylosowane liczby: {{ randomNumbers.join(",") }}</p>
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
		const submittedNumbers = ref([]);
		const testArray = ref([1, 2, 3, 4, 5]);
		const randomNumbers = ref([]);
		const numbers = ref([]);
		const arrs = [];

		const isActive = ref(true);

		useForm({
			validationSchema: schema,
		});

		const { value: firstNumber, errorMessage: firstNumberError } = useField("firstNumber");
		const { value: secondNumber, errorMessage: secondNumberError } = useField("secondNumber");
		const { value: thirdNumber, errorMessage: thirdNumberError } = useField("thirdNumber");
		const { value: fourthNumber, errorMessage: fourthNumberError } = useField("fourthNumber");
		const { value: fifthNumber, errorMessage: fifthNumberError } = useField("fifthNumber");

		const numbersArray = computed(() => {
			return [firstNumber.value, secondNumber, thirdNumber.value, fourthNumber.value, fifthNumber.value];
		});

		const schema = computed(() => {
			return yup.object({
				firstNumber: yup.number().required().min(1).max(50).transform(emptyStringToNull).nullable().notOneOf([numbersArray], "Liczby nie mogą się powtarzać"),
				secondNumber: yup.number().required().min(1).max(50).transform(emptyStringToNull).nullable().notOneOf([numbersArray], "Liczby nie mogą się powtarzać"),
				thirdNumber: yup.number().required().min(1).max(50).transform(emptyStringToNull).nullable().notOneOf([numbersArray], "Liczby nie mogą się powtarzać"),
				fourthNumber: yup.number().required().min(1).max(50).transform(emptyStringToNull).nullable().notOneOf([numbersArray], "Liczby nie mogą się powtarzać"),
				fifthNumber: yup.number().required().min(1).max(50).transform(emptyStringToNull).nullable().notOneOf([numbersArray], "Liczby nie mogą się powtarzać"),
			});
		});

		function emptyStringToNull(value, originalValue) {
			if (typeof originalValue === "string" && originalValue === "") {
				return null;
			}
			return value;
		}

		function confirmNumbers() {
			isActive.value = false;
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
				do {
					number = getRandom(1, 49);
					numberInArray = randomNumbers.value.includes(number);
					if (!numberInArray) {
						randomNumbers.value.push(number);
					}
				} while (numberInArray);
			}
		}

		// function randomMode() {
		// 	let numberInArray;
		// 	firstNumber.value = getRandom(1, 49);
		// 	numbers.value.push(firstNumber.value);
		// 	console.log(numbers.value);
		// 	do {
		// 		secondNumber.value = getRandom(1, 49);
		// 		numberInArray = numbers.value.includes(secondNumber.value);
		// 		if (!numberInArray) {
		// 			numbers.value.push(secondNumber.value);
		// 			console.log(numbers.value);
		// 		}
		// 	} while (numberInArray);
		// 	do {
		// 		thirdNumber.value = getRandom(1, 49);
		// 		numberInArray = numbers.value.includes(thirdNumber.value);
		// 		if (!numberInArray) {
		// 			numbers.value.push(thirdNumber.value);
		// 			console.log(numbers.value);
		// 		}
		// 	} while (numberInArray);
		// 	do {
		// 		fourthNumber.value = getRandom(1, 49);
		// 		numberInArray = numbers.value.includes(fourthNumber.value);
		// 		if (!numberInArray) {
		// 			numbers.value.push(fourthNumber.value);
		// 			console.log(numbers.value);
		// 		}
		// 	} while (numberInArray);
		// 	do {
		// 		fifthNumber.value = getRandom(1, 49);
		// 		numberInArray = numbers.value.includes(fifthNumber.value);
		// 		if (!numberInArray) {
		// 			numbers.value.push(fifthNumber.value);
		// 			console.log(numbers.value);
		// 		}
		// 	} while (numberInArray);
		// }

		function onSubmit() {
			submittedNumbers.value.push(firstNumber);
			submittedNumbers.value.push(secondNumber);
			submittedNumbers.value.push(thirdNumber);
			submittedNumbers.value.push(fourthNumber);
			submittedNumbers.value.push(fifthNumber);
			isActive.value = false;
			drawNumbers();
		}

		return {
			numbers,
			testArray,
			submittedNumbers,
			randomNumbers,
			numbersArray,
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
			isActive,
			schema,
			arrs,
			confirmNumbers,
			onSubmit,
			drawNumbers,
		};
	},
};
</script>

<style lang="scss" scoped>
.game__header {
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

.game__image {
	max-width: toRem(160);
	height: 100%;

	img {
		width: 100%;
		height: auto;
	}
}

.game__info {
	text-align: center;
	font-size: toRem(15);
	margin-bottom: toRem(22);

	&--bold {
		font-weight: $bold;
		color: $color-primary;
	}
}

.game__form {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.form {
	&__input {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		width: 100%;

		margin-bottom: toRem(10);

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

.game__confirm {
	display: flex;
	gap: 40px;
}
.game__btn {
	margin-top: 10px;
	padding: toRem(10) toRem(15);
	color: $color-primary;
	border: 1px solid $color-primary;
	background: transparent;
	transition: $transition;
	cursor: pointer;
	min-width: 144px;

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
	}
}
</style>
