<template>
	<v-container class="orders">
		<ConfirmDialog ref="confirm"></ConfirmDialog>
		<v-dialog v-model="noteDialog" width="500">
			<v-card v-if="notes">
				<v-card-title class="text-h5 grey lighten-2">
					Historique des notes
				</v-card-title>
				<v-card-text v-for="note in notes" :key="note.id">
						<v-container v-if="note.customer_note">
							{{ note.date_created| moment}} : <span v-html="note.note"></span> <br>
						</v-container>
				</v-card-text>
				<v-divider></v-divider>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="primary" text @click="noteDialog = false">Fermer</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<FromToDatePicker :defaultValues="true" @updateData="updateOrders"></FromToDatePicker>
		<v-card class="orders-card ma-3" v-if="orders" width="100%">
			<v-simple-table dense >
				<template v-slot:default>
					<thead>
						<tr>
							<th width="5%" class="text-center">Numéro de commande</th>
							<th width="10%" class="text-center">Date de création</th>
							<th width="10%" class="text-center">Adresse de livraison</th>
							<th width="15%" class="text-center">Note du client</th>
							<th width="10%" class="text-center">Prix</th>
							<th width="15%" class="text-center">Commande</th>
							<th width="15%" class="text-center">Notes</th>
							<th width="15%" class="text-center">Nouvelles Notes</th>
							<th width="10%" class="text-center">Marquer la commande comme terminée</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="order in orders" :key="order.id" :style="order.status == 'completed' ? 'background-color:#d1d1d1': ''">
							<td>{{ order.id }}</td>
							<td>{{ order.date_created| moment}}</td>
							<td>
								<b>Livraison: {{ "Mondial Relay (obligatoire pour le format A3 en France et Belgique)" === order.shipping_lines[0].method_title ? "Mondial Relay" : order.shipping_lines[0].method_title}}</b><br>
								{{order.shipping.first_name}} {{order.shipping.last_name}} <br>
								<span v-if="order.shipping.company">{{order.shipping.company}} <br></span>
								<span v-if="order.shipping.adresse_1">{{order.shipping.adresse_1}} <br></span>
								<span v-if="order.shipping.adresse_2">{{order.shipping.adresse_2}} <br></span>
								<span v-if="order.shipping.postcode || order.shipping.city">{{order.shipping.postcode}} {{order.shipping.city}}<br></span>
								<span v-if="order.shipping.state || order.shipping.country">{{order.shipping.state}} {{order.shipping.country}}<br></span>
							</td>
							<td>
								{{order.customer_note}}
							</td>
							<td>
								Sous-total: {{ order.total - order.shipping_total}} €<br>
								Livraison: {{ order.shipping_total }} €<br>
								Total: {{ order.total }} €<br>
							</td>
							<td>
								<v-container v-for="line in order.line_items" :key="line.id">
									<span>{{line.quantity}} x {{line.parent_name ? line.parent_name : line.name}} ({{line.total}} €)</span>
									<span v-for="meta in line.meta_data" :key="meta.id">
										<span style="color:#80ADBC; text-transform:capitalize" v-if="meta.key !='_reduced_stock'"><br>{{meta.key}} : {{meta.value}}</span>
									</span>
								</v-container>
							</td>
							<td>
								<v-btn small @click="seeNotes(order.id)">Historique les notes</v-btn>
							</td>
							<td>
								<v-textarea @change="changeNote(order.id, $event)" label="Nouvelle note"></v-textarea>
								<v-btn class="mb-5" small @click="addNote(order.id)">Envoyer</v-btn>
							</td>
							<td>
								<v-btn @click="setCompleted(order)" v-if="order.status != 'completed'" color="success" fab x-small dark>
									<v-icon>mdi-check</v-icon>
								</v-btn>
								<span v-if="order.status == 'completed'">
									<v-icon>mdi-check-underline</v-icon> terminée
								</span>
							</td>
						</tr>
					</tbody>
				</template>
			</v-simple-table>
		</v-card>
		<v-container>
			<v-row justify="center">
				<v-col  cols="8">
					<v-container class="max-width">
						<v-pagination color="#DFD8AB" :total-visible="7" @input="next" v-model="page" class="my-4" :length="paginationData.pages"></v-pagination>
					</v-container>
				</v-col>
			</v-row>
		</v-container>
	</v-container>
</template>
<script>
	import { mapActions } from "vuex";
	import { getISOMonthPeriodFromDate } from "../helpers/date";
	import ConfirmDialog from "../components/ConfirmDialog";
    const moment = require('moment')
	import FromToDatePicker from "../components/FromToDatePicker";

	export default {
		name: "OrdersView",
		components: {ConfirmDialog, FromToDatePicker},
		data: () => ({
			page: 1,
            newNotes: [],
            noteDialog:false
        }),
		computed: {
            orders () { return this.$store.state.orders.items },
            notes () { return this.$store.state.notes.all },
            paginationData () { return this.$store.state.orders.pagination }
		},
		methods: {
			...mapActions({
				getOrders: 'orders/getPaginatedByDate',
				createNote: 'orders/createNote',
                getNotes: 'notes/getNotes',
                updateOrder: 'orders/updateOrder'
			}),
            moment: function () {
                return moment();
            },
            next (page) {
				this.page = page;
                this.getOrders({period: {start: this.fromDateVal, end: this.toDateVal}, page: page});
            },
			seeNotes(id) {
                this.getNotes(id)
				this.noteDialog = true
            },
            changeNote(id, value) {
				this.newNotes[id] = value
			},
            async addNote(id) {
				if (await this.$refs.confirm.open("Envoyer une note par mail au client", "Voulez-vous vraiment envoyer cette note au client? <br> Note: " + this.newNotes[id])) {
					this.createNote({id: id, note: {note: this.newNotes[id], customer_note: true}})
				}
			},
            async setCompleted(order) {
                if (await this.$refs.confirm.open("Clore cette commande", "Voulez-vous vraiment noter cette commande comme terminée?")) {
                    order.status = 'completed';
                    this.updateOrder({id: order.id, status: 'completed'})
                }
			},
			updateOrders(data) {
                this.fromDateVal = data.start
                this.toDateVal = data.end
				data = {period: data, page: 1}
				this.getOrders(data);
            }
		},
        filters: {
            moment: function (date) {
                return moment(date).format('Do-MM-YYYY');
            }
        },
		created() {
			let now = new Date();
			let isoPeriod = getISOMonthPeriodFromDate(now);
			this.fromDateVal = isoPeriod.start.slice(0, 10);
			this.toDateVal = isoPeriod.end.slice(0, 10);
			this.getOrders({period: isoPeriod, page: 1});
		}
	}
</script>
<style>
	.orders-card tbody tr:nth-of-type(odd) {
		background-color: rgba(250, 243, 235, 0.51);
	}
</style>
