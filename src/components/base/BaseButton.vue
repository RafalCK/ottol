<template>
	<button class="btn" :disabled="false"><slot></slot></button>
</template>

<script>
export default {
	name: "BaseButton",
	components: {},
};
</script>

<style lang="scss">
.btn {
	padding: toRem(10) toRem(15);
	background: transparent;
	transition: $transition;
	cursor: pointer;
	min-width: 144px;
	max-height: 42px;

	&:disabled {
		color: $color-white;
		opacity: 0.5;
	}

	&:hover {
		color: $color-white;
		transition: $transition;
	}

	&--primary {
		color: $color-primary;
		border: 1px solid $color-primary;

		&:disabled {
			background: $color-primary;
		}

		&:hover {
			background: $color-primary;
		}
	}

	&--secondary {
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

	&--succes {
		color: $color-succes;
		border: 1px solid $color-succes;

		&:hover {
			background: $color-succes;
		}

		&:disabled {
			background: $color-succes;
			opacity: 0.6;
		}
	}
}
</style>
