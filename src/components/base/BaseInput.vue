<template>
	<div class="form__control">
		<label><slot name="label"></slot></label>
		<input type="number" :id="id" class="base__input" />
	</div>
</template>

<script>
export default {
	name: "BaseInput",
	components: {},
};
</script>

<style lang="scss"></style>
