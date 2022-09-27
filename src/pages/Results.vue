<template>
	<h1>Twoje <span class="decoration">Wyniki</span></h1>
	<div class="table-wrapper">
		<table class="table table-striped table-bordered">
			<thead>
				<tr>
					<th>L.p</th>
					<th>Gra</th>
					<th>Wybrane opcje</th>
					<th>Wylosowane opcje</th>
					<th>Wygrane opcje</th>
					<th>Stawka zakładu</th>
					<th>Wygrana</th>
					<th>Stan konta</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(result, index) in results" :key="index">
					<td>{{ index + 1 }}</td>
					<td>{{ result.gameName }}</td>
					<td>{{ result.choosen }}</td>
					<td>{{ result.random }}</td>
					<td>{{ result.winner }}</td>
					<td>{{ result.betValue }}</td>
					<td>{{ result.credits === NaN ? "0" : result.credits }}</td>
					<td>{{ result.saldo }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
export default {
	name: "Results",
	components: {},
	setup() {
		const store = useStore();

		const results = computed(() => store.getters.doneResults);

		return {
			results,
		};
	},
};
</script>

<style lang="scss" scoped>
h1 {
	text-align: center;
	margin-bottom: toRem(50);
}

.table-wrapper {
	overflow-x: auto;
}

table {
	width: 100%;
	border-collapse: collapse;

	td,
	th {
		border: 1px solid #ddd;
		padding: 8px;
	}

	tr:nth-child(even) {
		background-color: #f2f2f2;
	}

	th {
		padding-top: 12px;
		padding-bottom: 12px;
		text-align: left;
		background-color: $color-additional;
		color: white;
	}
}

@media (max-width: 576px) {
	h1 {
		font-size: toRem(34);
	}

	table {
		font-size: toRem(14);
	}
}
</style>
