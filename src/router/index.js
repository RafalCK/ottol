import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Game from "../pages/Game.vue";
import Results from "../pages/Results.vue";
import Account from "../pages/Account.vue";

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	{
		path: "/game",
		name: "Game",
		component: Game,
	},
	{
		path: "/results",
		name: "Results",
		component: Results,
	},
	{
		path: "/account",
		name: "Account",
		component: Account,
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
