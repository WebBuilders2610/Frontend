import { HealthSummary } from '../domain/health-summary.entity.js'

export class HealthSummaryAssembler {
    static toEntity(resource) {
        return new HealthSummary({
            id: resource.id,
            neonateName: resource.neonateName,
            age: resource.age,
            status: resource.status,
            weight: resource.weight,
            lastUpdate: resource.lastUpdate,
            heartRate: resource.heartRate,
            respiratoryRate: resource.respiratoryRate,
            oxygenSaturation: resource.oxygenSaturation,
            temperature: resource.temperature,
        })
    }
}
