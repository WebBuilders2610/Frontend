import { DashboardChart } from '../domain/dashboard-chart.entity.js'

export class DashboardChartAssembler {
    static toEntity(resource) {
        return new DashboardChart({
            id: resource.id,
            neonateId: resource.neonateId,
            parameterName: resource.parameterName,
            labels: resource.labels,
            dataPoints: resource.dataPoints,
        })
    }
}
