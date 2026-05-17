import { defineStore } from 'pinia'
import { DashboardApi } from '../infrastructure/dashboard-api.js'
import { HealthSummaryAssembler } from '../infrastructure/health-summary.assembler.js'

export const useDashboardStore = defineStore('dashboard', {
    state: () => ({
        summaries: [],
        loading: false,
        selectedNeonate: null,
    }),
    getters: {
        criticalCases: (state) => state.summaries.filter((summary) => summary.isCritical()),
    },
    actions: {
        async fetchSummaries() {
            this.loading = true
            try {
                const data = await DashboardApi.getSummaries()
                this.summaries = data.map(HealthSummaryAssembler.toEntity)
            } catch (error) {
                console.error('Error fetching dashboard summaries:', error)
            } finally {
                this.loading = false
            }
        },
        selectNeonate(id) {
            this.selectedNeonate = this.summaries.find((s) => s.id === id) || null
        },
    },
})
