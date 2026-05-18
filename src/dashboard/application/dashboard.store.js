import { defineStore } from 'pinia'
import { DashboardApi } from '../infrastructure/dashboard-api.js'
import { HealthSummaryAssembler } from '../infrastructure/health-summary.assembler.js'
import { DashboardChartAssembler } from '../infrastructure/dashboard-chart.assembler.js'

export const useDashboardStore = defineStore('dashboard', {
    state: () => ({
        summaries: [],
        charts: [], 
        loading: false,
        selectedNeonate: null,
    }),
    actions: {
        async fetchSummaries() {
            this.loading = true
            try {
                const data = await DashboardApi.getSummaries()
                this.summaries = data.map(HealthSummaryAssembler.toEntity)
            } catch (error) {
                console.error('Error fetching summaries:', error)
            } finally {
                this.loading = false
            }
        },
        async selectNeonate(id) {
            this.selectedNeonate = this.summaries.find((s) => s.id === id) || null
            if (this.selectedNeonate) {
                try {
                    const chartData = await DashboardApi.getChartsByNeonateId(id)
                    this.charts = chartData.map(DashboardChartAssembler.toEntity)
                } catch (error) {
                    console.error('Error fetching charts:', error)
                    this.charts = []
                }
            }
        },
    },
})
