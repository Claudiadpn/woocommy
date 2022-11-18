<template>
	<v-container id="reports-widget-container" v-if="typeof this.data.net_sales !== 'undefined' && (!this.comparaison || typeof this.dataToCompare.net_sales !== 'undefined')">
		<v-card v-for="widget in this.getWidgetsData()" :key="widget.label" class="reports-widgets ma-auto ml-5 " :style="'background-color:' + widget.background">
			<v-card-title class="reports-card-title">
				{{widget.label}}
			</v-card-title>
			<v-card-text class="text-h5">
				{{widget.value}}
				<v-chip v-if="null !== widget.comparaison" class="ma-2" small :color="widget.comparaisonColor">{{ widget.comparaison }}</v-chip>
			</v-card-text>
		</v-card>
	</v-container>
</template>
<script>
export default {
    name: "ReportsWidget",
    props: {
		data: Object,
		dataToCompare: Object,
		comparaison: Boolean
	},
    methods: {
        getWidgetsData() {
            var principalData = this.dataToCompare ?? this.data;
            return [
                {
                    background: "#EBF6FA",
                    label: "Ventes Nettes",
                    value: principalData.net_sales + ' €',
                    comparaison:  this.dataToCompare ? (this.dataToCompare.net_sales - this.data.net_sales) + ' €' : null,
                    comparaisonColor: this.dataToCompare && (this.dataToCompare.net_sales - this.data.net_sales) > 0 ? "green" : "red"
                },
                {
                    background: "#D9E6EC",
                    label: "Commandes",
                    value: principalData.total_orders,
                    comparaison:  this.dataToCompare ? (this.dataToCompare.total_orders - this.data.total_orders) : null,
                    comparaisonColor: this.dataToCompare && (this.dataToCompare.total_orders - this.data.total_orders) > 0 ? "green" : "red"
                },
                {
                    background: "#EEE8E8",
                    label: "Nombres de créations vendues",
                    value: principalData.total_items,
                    comparaison:  this.dataToCompare ? (this.dataToCompare.total_items - this.data.total_items) : null,
                    comparaisonColor: this.dataToCompare && (this.dataToCompare.total_items - this.data.total_items) > 0 ? "green" : "red"
                },
                {
                    background: "#DEE9EB",
                    label: "Montant des frais de livraisons",
                    value: principalData.total_shipping + ' €',
                    comparaison:  this.dataToCompare ? (this.dataToCompare.total_shipping - this.data.total_shipping) + ' €' : null,
                    comparaisonColor: this.dataToCompare && (this.dataToCompare.total_shipping - this.data.total_shipping) > 0 ? "green" : "red"                },
                {
                    background: "#F0EDE8",
                    label: "Total (ventes+livraison)",
                    value: principalData.total_sales + ' €',
                    comparaison:  this.dataToCompare ? (this.dataToCompare.total_sales - this.data.total_sales) + ' €' : null,
                    comparaisonColor: this.dataToCompare && (this.dataToCompare.total_sales - this.data.total_sales) > 0 ? "green" : "red"                }
            ]
        },
    }
}
</script>

<style>
	#reports-widget-container {
		display:flex;
		flex-direction: row;
	}
	.reports-widgets{
		width:20%;
	}
	.reports-card-title {
		font-size:0.8em;
	}
	@media (max-width: 1200px) {
		#reports-widget-container {
			display:flex;
			flex-direction: column;
		}
		.reports-widgets{
			width:90%;
		}
		.reports-card-title {
			font-size:1em;
		}
	}
</style>