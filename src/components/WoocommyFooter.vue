<template>
	<v-card height="100px">
		<v-footer absolute :padless=true>
			<v-card flat tile width="100%" class="black lighten-1 text-center">
				<v-card-text class="white--text">
					<strong>{{ new Date().getFullYear() }} — WOOCOMMY — Made with <v-icon color="red">mdi-cards-heart</v-icon> by Xpressive</strong>
				</v-card-text>
			</v-card>
		</v-footer>
	</v-card>
</template>

<script>
	export default {
		name: "WoocommyFooter"
	}
</script>
