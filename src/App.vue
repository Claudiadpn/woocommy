<template>
	<v-app>
		<FlashMessage style="z-index: 1000" :position="'right top'"/>
		<WoocommyMenu app></WoocommyMenu>
		<v-main>
			<v-overlay :value="loaderIsActive"></v-overlay>
			<v-progress-circular
					v-if="loaderIsActive"
					id="loader"
					:size="100"
					:width="10"
					color="gray"
					indeterminate
			></v-progress-circular>
			<v-container fluid>
				<router-view></router-view>
			</v-container>
		</v-main>
		<WoocommyFooter app></WoocommyFooter>
	</v-app>
</template>

<style lang="scss">
	@import url('https://fonts.googleapis.com/css?family=Roboto');

	#app {
		font-family: Roboto, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}

	#loader {
		position:fixed;
		z-index:1000;
		top:25%;
		margin:auto;
	}

</style>

<script>
	import WoocommyMenu from '@/components/WoocommyMenu.vue'
	import WoocommyFooter from '@/components/WoocommyFooter.vue'

	export default {
		name: 'App',
		components: {
			WoocommyMenu,
			WoocommyFooter
		},
        computed: {
            loaderIsActive () { return this.$store.state.loader.isActive },
        },
	}
</script>
