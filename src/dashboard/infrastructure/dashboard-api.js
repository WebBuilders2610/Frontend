import httpClient from '../../shared/infrastructure/base-api.js'

export class DashboardApi {
    static async getHealthSummary(babyId) {
        const response = await httpClient.get(`/health-summaries?babyId=${babyId}`)
        return response.data[0] || null
    }

    static async getAllHealthSummaries() {
        const response = await httpClient.get('/health-summaries')
        return response.data || []
    }

    static async getChartMetrics() {
        const response = await httpClient.get('/chart-metrics')
        return response.data
    }
}
