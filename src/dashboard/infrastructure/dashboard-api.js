import httpClient from '../../shared/infrastructure/base-api.js'

export class DashboardApi {
    static async getHealthSummary(babyId) {
        const response = await httpClient.get(`/health-summaries?babyId=${babyId}`)

        return response.data[0] || null
    }
}
