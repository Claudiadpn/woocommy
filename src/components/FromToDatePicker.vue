<template>
	<v-container>
		<v-card class="pa-5 ma-5" color="#CE9C9D" dark>
		<v-row>
			<v-col cols="6" md="6">
				<v-menu v-model="fromDateMenu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y max-width="290px" min-width="290px">
					<template v-slot:activator="{ on }">
						<v-text-field label="Du"  readonly :value="fromDateDisp" v-on="on"></v-text-field>
					</template>
					<v-date-picker color="#CE9C9D" locale="fr" v-model="fromDateVal" no-title @input="fromDateMenu = false"></v-date-picker>
				</v-menu>
			</v-col>
			<v-col cols="6" md="6">
				<v-menu v-model="toDateMenu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y max-width="290px" min-width="290px">
					<template v-slot:activator="{ on }">
						<v-text-field label="Jusqu'au"  readonly :value="toDateDisp" v-on="on"></v-text-field>
					</template>
					<v-date-picker color="#CE9C9D"  locale="fr" v-model="toDateVal" no-title @input="toDateMenu = false"></v-date-picker>
				</v-menu>
			</v-col>
		</v-row>
	</v-card>
	</v-container>
</template>
<script>
import {getISOMonthPeriodFromDate} from "../helpers/date";

export default {
    name: "FromToDatePicker",
	props: {
        defaultValues: Boolean
	},
    data: function () {
        return {
            toDateMenu: false,
            fromDateMenu: false,
            toDateVal: null,
            fromDateVal: null,
        };
    },
    computed: {
        fromDateDisp() {
            return this.fromDateVal;
        },
        toDateDisp() {
            return this.toDateVal;
        },
    },
    watch: {
        toDateVal(newToDateVal) {
            this.$emit("updateData", {start: this.fromDateVal, end: newToDateVal});
        },
        fromDateVal(newFromDateVal) {
            this.$emit("updateData", {start: newFromDateVal, end: this.toDateVal});
        }
    },
	created() {
        if (this.defaultValues) {
            let now = new Date();
            let isoPeriod = getISOMonthPeriodFromDate(now);
            this.fromDateVal = isoPeriod.start.slice(0, 10);
            this.toDateVal = isoPeriod.end.slice(0, 10);
		}
	}
}
</script>

<style>
	.v-date-picker-table .v-btn.v-btn--active {
		color: #CE9C9D;
	}
</style>