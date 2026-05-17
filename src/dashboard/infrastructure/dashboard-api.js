import httpClient from '../../shared/infrastructure/base-api.js'

export class DashboardApi {
    static async getSummaries() {
        const response = await httpClient.get('/health-summaries')
        return response.data
    }
}
