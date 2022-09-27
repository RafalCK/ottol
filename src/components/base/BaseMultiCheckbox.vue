<template>
	<div class="multicheckbox-container">
		<BaseCheckbox v-for="(option, index) in options" :checked="value.includes(option)" @update:checked="check(option, $event)" :id="option" :key="index" :disabled="isDisabled(option)" />
	</div>
</template>

<script>
import BaseCheckbox from "./BaseCheckbox";

export default {
	name: "BaseMultiCheckbox",
	components: { BaseCheckbox },
	emits: ["update:value"],
	props: {
		value: {
			type: Array,
			required: true,
		},
		options: {
			type: Array,
			required: true,
		},
	},
	setup(props, context) {
		const check = (optionId, checked) => {
			let updatedValue = [...props.value];
			if (checked) {
				updatedValue.push(optionId);
			} else {
				updatedValue.splice(updatedValue.indexOf(optionId), 1);
			}
			context.emit("update:value", updatedValue);
		};

		const isDisabled = (option) => {
			return props.value.length >= 3 && !props.value.includes(option);
		};

		return {
			check,
			isDisabled,
		};
	},
};
</script>

<style lang="scss">
.multicheckbox-container {
	display: grid;
	grid-auto-flow: row;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: repeat(2, 1fr);
	grid-gap: toRem(40);
}
</style>
