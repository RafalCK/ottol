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
	background: $color-primary;
	color: $color-white;
	border: none;
}
</style>
