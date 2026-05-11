import { DashboardChart } from '../domain/dashboard-chart.entity.js'

export class DashboardChartAssembler {
    static toEntity(resources) {
        if (!resources || !Array.isArray(resources)) return null

        const labels = resources.map((item) => item.day)
        const temperatures = resources.map((item) => item.avgTemp)
        const oxygens = resources.map((item) => item.avgO2)

        return new DashboardChart({ labels, temperatures, oxygens })
    }
}
