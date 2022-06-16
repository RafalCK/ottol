<template>
	<div class="round">
		<input type="checkbox" :id="id" v-model="checked" @input="(event) => $emit('update:checked', event.target.checked)" :checked="checked" :disabled="disabled" />
		<label :for="id">{{ id }}</label>
	</div>
</template>

<script>
export default {
	name: "BaseCheckbox",
	props: {
		checked: { type: Boolean },
		disabled: { type: Boolean },
		label: { type: String },
		id: { type: Number },
	},
	setup() {},
};
</script>

<style lang="scss">
.round {
	position: relative;
}

.round label {
	background-color: $color-white;
	border: 1px solid $color-additional;
	color: $color-black;
	border-radius: 50%;
	cursor: pointer;
	height: toRem(30);
	width: toRem(30);
	font-weight: $bold;

	position: absolute;
	left: 0;
	top: 0;

	display: flex;
	justify-content: center;
	align-items: center;
}

.round input[type="checkbox"] {
	visibility: hidden;
}

.round input[type="checkbox"]:checked + label {
	background-color: $color-succes;
	color: $color-white;
}
</style>
