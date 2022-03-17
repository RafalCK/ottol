<template></template>

<script>
import { setLocale } from "yup";
export default {
	name: "CustomErrorMessages",
	components: {},
	setup() {
		setLocale({
			mixed: {
				default: "Não é válido",
			},
			number: {
				min: "Deve ser maior que ${min}",
			},
		});
	},
};
</script>

<style lang="scss"></style>
