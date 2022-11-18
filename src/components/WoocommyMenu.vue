<template>
	<v-card>
		<v-app-bar>
			<v-app-bar-nav-icon class="display-mobile" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
			<img class="pl-5 pr-5" src="../assets/woocommy_logo.png">
			<v-toolbar-title class="bold">Bonjour {{this.username}} !</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-container class="display-desktop" v-if="loggedIn">
				<v-btn rounded outlined color="red" class="menu-btn ma-3 float-right" @click="logoutAction()">Se déconnecter</v-btn>
				<v-btn class="menu-btn ma-3 float-right" to="/reports">Statistiques</v-btn>
				<v-btn class="menu-btn ma-3 float-right" to="/orders">Commandes</v-btn>
			</v-container>
		</v-app-bar>
		<v-navigation-drawer :z-index="10000" v-model="drawer" fixed>
			<v-spacer class="ma-10"></v-spacer>
			<v-list v-if="loggedIn">
				<v-list-item><v-btn class="menu-btn ma-3" to="/reports">Statistiques</v-btn></v-list-item>
				<v-list-item><v-btn class="menu-btn ma-3" to="/orders">Commandes</v-btn></v-list-item>
				<v-list-item><v-btn class="menu-btn ma-3" @click="logoutAction()">Se déconnecter</v-btn></v-list-item>
			</v-list>
		</v-navigation-drawer>
	</v-card>
</template>

<script>
	import {mapActions} from "vuex";

    export default {
		name: 'WoocommyMenu',
		data: () => ({
			drawer: false
		}),
        computed: {
			username() { return this.$store.state.security.user !== null && this.$store.state.security.user.data ? this.$store.state.security.user.data.display_name : ''},
            loggedIn () { return this.$store.state.security.user !== null },
            reportsToCompare () { return this.$store.state.reports.toCompare }
        },
        methods: {
            ...mapActions({
                logout: 'security/logout',
            }),
			logoutAction() {
				this.logout();
			}
        }
	}
</script>

<style>
	.display-desktop {
		display:block;
	}
	.display-mobile {
		display:none;
	}
	@media (max-width: 1200px) {
		.display-desktop {
			display:none;
		}
		.display-mobile {
			display:initial;
		}
	}
	.menu-btn {
		margin-bottom:10px;
	}
</style>
