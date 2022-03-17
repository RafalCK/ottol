<template>
	<div class="game__header">
		<div class="game__image">
			<img src="@/assets/images/lotto_plus.png" />
		</div>
		<h1>Ottol Plus</h1>
	</div>
	<Form class="game__form" @submit="onSubmit" :validation-schema="schema">
		<div class="form__input">
			<label for="firstNumber">Pierwsza liczba</label>
			<Field v-model="firstNumber" type="number" name="firstNumber" min="1" max="50" />
			<ErrorMessage name="firstNumber" />
		</div>
		<div class="form__input">
			<label for="secondNumber">Druga liczba</label>
			<Field v-model="secondNumber" type="number" name="secondNumber" min="1" max="50" />
			<ErrorMessage name="secondNumber" />
		</div>
		<div class="form__input">
			<label for="thirdNumber">Trzecia liczba</label>
			<Field v-model="thirdNumber" type="number" name="thirdNumber" min="1" max="50" />
			<ErrorMessage name="thirdNumber" />
		</div>
		<div class="form__input">
			<label for="fourthNumber">Czwarta liczba</label>
			<Field v-model="fourthNumber" type="number" name="fourthNumber" min="1" max="50" />
			<ErrorMessage name="fourthNumber" />
		</div>
		<div class="form__input">
			<label for="fifthNumber">Piąta liczba</label>
			<Field v-model="fifthNumber" type="number" name="fifthNumber" min="1" max="50" />
			<ErrorMessage name="fifthNumber" />
		</div>
		<base-button class="game__btn">Zatwierdz liczby</base-button>
	</Form>
	<p>Twoje wybrane liczby: {{ numbers.join(",") }}</p>
	<p>Wylosowane liczby: {{ randomNumbers.join(",") }}</p>
</template>

<script>
import BaseCard from "../../base/BaseCard.vue";
import BaseInput from "../../base/BaseInput.vue";
import BaseButton from "../../base/BaseButton.vue";
import CustomErrorMessages from "../../yup/CustomErrorMessages.vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { ref } from "vue";

export default {
	name: "OttolPlus",
	components: { BaseCard, BaseInput, BaseButton, Form, Field, ErrorMessage },
	setup() {
		const numbers = ref([]);
		const randomNumbers = ref([]);

		const firstNumber = ref("");
		const secondNumber = ref("");
		const thirdNumber = ref("");
		const fourthNumber = ref("");
		const fifthNumber = ref("");

		const isActive = ref(true);

		const schema = yup.object({
			firstNumber: yup.number().required().min(1).max(50),
			secondNumber: yup.number().required().min(1).max(50),
			thirdNumber: yup.number().required().min(1).max(50),
			fourthNumber: yup.number().required().min(1).max(50),
			fifthNumber: yup.number().required().min(1).max(50),
		});

		// let schema = yup.object().shape({
		// 	firstNumber: yup.number().required().min(1).max(50),
		// 	secondNumber: yup.number().required().min(1).max(50),
		// 	thirdNumber: yup.number().required().min(1).max(50),
		// 	fourthNumber: yup.number().required().min(1).max(50),
		// 	fifthNumber: yup.number().required().min(1).max(50),
		// });

		function confirmNumbers() {
			numbers.value.push(firstNumber.value);
			numbers.value.push(secondNumber.value);
			numbers.value.push(thirdNumber.value);
			numbers.value.push(fourthNumber.value);
			numbers.value.push(fifthNumber.value);
			isActive.value = false;
			firstNumber.value = "";
			secondNumber.value = "";
			thirdNumber.value = "";
			fourthNumber.value = "";
			fifthNumber.value = "";
			getRandomNumbers();
		}

		function getRandom(min, max) {
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}

		function getRandomNumbers() {
			for (let i = 0; i < 5; i++) {
				let number = getRandom(1, 50);
				if (number == randomNumbers.value.includes(number)) {
					number = getRandom(1, 50);
				} else {
					randomNumbers.value.push(number);
				}
			}
		}

		function onSubmit(values) {
			console.log(values);
		}

		return {
			numbers,
			firstNumber,
			secondNumber,
			thirdNumber,
			fourthNumber,
			fifthNumber,
			isActive,
			randomNumbers,
			schema,
			confirmNumbers,
			onSubmit,
			getRandom,
			getRandomNumbers,
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
.game__btn {
	margin-top: 20px;
	padding: toRem(10) toRem(15);
	color: $color-primary;
	border: 1px solid $color-primary;
	background: transparent;
	transition: $transition;
	cursor: pointer;

	&:hover {
		color: $color-white;
		background: $color-primary;
		transition: $transition;
	}
}
</style>
