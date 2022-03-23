<template>
	<input name="password" v-model="password" type="password" />
	<span>{{ passwordError }}</span>
	<input name="number" v-model="min" type="number" />
	<input name="number" v-model="max" type="number" />
	<p>Array : {{ arrayNum }}</p>
</template>
<script>
import { computed, ref } from "vue";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
export default {
	setup() {
		const min = ref(5);
		const max = ref(5);
		const arrayNum = computed(() => {
			return [min.value, max.value];
		});
		const schema = computed(() => {
			return yup.object({
				password: yup.string().OneOf(arrayNum.value, "Powtarzaja sie"),
			});
		});
		// Create a form context with the validation schema
		useForm({
			validationSchema: schema,
		});

		const { value: password, errorMessage: passwordError } = useField("password");
		return {
			password,
			passwordError,
			min,
			max,
			schema,
			arrayNum,
		};
	},
};
</script>
