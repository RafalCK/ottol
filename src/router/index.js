import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Game from "../pages/Game.vue";
import OttolMini from "../components/games/ottol-mini/OttolMini.vue";
import OttolPlus from "../components/games/ottol-plus/OttolPlus.vue";
import RepusSzansa from "../components/games/repus-szansa/RepusSzansa.vue";
import Results from "../pages/Results.vue";
import Account from "../pages/Account.vue";

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
		meta: {
			hideSubheader: true,
		},
	},
	{
		path: "/game",
		name: "Game",
		component: Game,
	},
	{
		path: "/game/ottol-plus",
		name: "OttolPlus",
		component: OttolPlus,
	},
	{
		path: "/game/ottol-mini",
		name: "OttolMini",
		component: OttolMini,
	},
	{
		path: "/game/repus-szansa",
		name: "RepusSzansa",
		component: RepusSzansa,
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
