<template>
	<the-header></the-header>
	<main>
		<div class="wrapper" :class="{ wrapper__main: $route.meta.hideSubheader }">
			<router-view></router-view>
		</div>
	</main>
	<the-footer></the-footer>
</template>

<script>
import TheFooter from "./layouts/TheFooter.vue";
import TheHeader from "./layouts/TheHeader.vue";
export default {
	components: { TheFooter, TheHeader },
	data() {
		return {};
	},
};
</script>
<style lang="scss">
.wrapper {
	padding: 0 15%;
	margin: 0 auto;
	min-height: calc(100vh - #{toRem(150)});
	margin-bottom: toRem(40);
}

.wrapper.wrapper__main {
	min-height: calc(100vh - #{toRem(120)});
}
</style>
