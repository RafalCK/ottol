<template>
	<form style="margin-top: 20px">
		<div class="form__input">
			<input name="number1" v-model="number1" type="number" />
			<span>{{ numberError1 }}</span>
		</div>
		<div class="form__input">
			<input name="number2" v-model="number2" type="number" />
			<span>{{ numberError2 }}</span>
		</div>
		<div class="form__input">
			<input name="number3" v-model="number3" type="number" />
			<span>{{ numberError3 }}</span>
		</div>
		<div class="form__input">
			<input name="number4" v-model="number4" type="number" />
			<span>{{ numberError4 }}</span>
		</div>
		<div class="form__input">
			<input name="number5" v-model="number5" type="number" />
			<span>{{ numberError5 }}</span>
		</div>
	</form>
	<p>Tablica : {{ numbersArray }}</p>
</template>
<script>
import { computed, ref } from "vue";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
export default {
	setup() {
		let numValue1 = ref(1);
		let numValue2 = ref();
		let numValue3 = ref();
		let numValue4 = ref(5);
		let numValue5 = ref();

		const numbersArray = computed(() => {
			return [number1.value, number2.value, number3.value, number4.value, number5.value];
		});

		const staticArray = [1, 2, 3, 4, 5];

		let schema = computed(() => {
			return yup.object({
				number1: yup.number().required().min(1).max(50).empty().nullable().notOneOf([staticArray], "Te liczby się powtarzają"),
				number2: yup.number().required().min(1).max(50).empty().nullable().notOneOf([staticArray], "Te liczby się powtarzają"),
				number3: yup.number().required().min(1).max(50).empty().nullable().notOneOf([staticArray], "Te liczby się powtarzają"),
				number4: yup.number().required().min(1).max(50).empty().nullable().notOneOf([staticArray], "Te liczby się powtarzają"),
				number5: yup.number().required().min(1).max(50).empty().nullable().notOneOf([staticArray], "Te liczby się powtarzają"),
			});
		});

		useForm({
			validationSchema: schema,
		});

		let { value: number1, errorMessage: numberError1 } = useField("number1");
		let { value: number2, errorMessage: numberError2 } = useField("number2");
		let { value: number3, errorMessage: numberError3 } = useField("number3");
		let { value: number4, errorMessage: numberError4 } = useField("number4");
		let { value: number5, errorMessage: numberError5 } = useField("number5");

		number1.value = numValue1.value;
		number2.value = numValue2.value;
		number3.value = numValue3.value;
		number4.value = numValue4.value;
		number5.value = numValue5.value;

		return {
			number1,
			number2,
			number3,
			number4,
			number5,
			numberError1,
			numberError2,
			numberError3,
			numberError4,
			numberError5,
			numbersArray,
		};
	},
};
</script>

<style lang="scss" scoped>
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
</style>
