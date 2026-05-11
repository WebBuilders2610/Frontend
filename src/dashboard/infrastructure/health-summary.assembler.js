import { HealthSummary } from '../domain/health-summary.entity.js'

export class HealthSummaryAssembler {
    static toEntity(resource) {
        if (!resource) return null
        return new HealthSummary({
            babyId: resource.babyId,
            averageTemperature: resource.avgTemp,
            averageOxygen: resource.avgO2,
            alertsCount: resource.criticalAlertsCount,
            lastUpdate: new Date(resource.timestamp),
        })
    }
}
