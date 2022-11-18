<template>
	<div class="reports">
		<ConfirmDialog ref="confirm"></ConfirmDialog>
		<FromToDatePicker :defaultValues="true" @updateData="updateReports"></FromToDatePicker>
		<v-container>
			<ReportsWidget :comparaison=false :data="this.reports"></ReportsWidget>
		</v-container>
		<v-app-bar-title class="ma-5 text-h5">Période à comparer</v-app-bar-title>
		<FromToDatePicker :defaultValues="false" @updateData="updateTeportsToCompare"></FromToDatePicker>
		<v-container v-if="reportsToCompare">
			<ReportsWidget :comparaison=true :dataToCompare="this.reportsToCompare" :data="this.reports"></ReportsWidget>
		</v-container>
	</div>
</template>
<script>
	import { mapActions } from "vuex";
    import { getISOMonthPeriodFromDate } from "../helpers/date";
    import ConfirmDialog from "../components/ConfirmDialog";
    import FromToDatePicker from "../components/FromToDatePicker";
	import ReportsWidget from "../components/ReportsWidget";

    export default {
        name: "ReportsView",
        components: {ConfirmDialog, FromToDatePicker, ReportsWidget},
        computed: {
            reports () { return this.$store.state.reports.all },
            reportsToCompare () { return this.$store.state.reports.toCompare }
        },
        methods: {
            ...mapActions({
                getReports: 'reports/getAllByDate',
                getReportsToCompare: 'reports/getAllByDateToCompare',
            }),
            updateReports(data) {
                this.getReports(data);
            },
            updateTeportsToCompare(data) {
                if (data.start && data.end) {
                    this.getReportsToCompare(data);
                }
            }
        },
        created() {
            let now = new Date();
            let isoPeriod = getISOMonthPeriodFromDate(now);
            this.fromDateVal = isoPeriod.start.slice(0, 10);
            this.toDateVal = isoPeriod.end.slice(0, 10);
            this.getReports({start: this.fromDateVal, end: this.toDateVal});
        }
    }
</script>
<style>

</style>
