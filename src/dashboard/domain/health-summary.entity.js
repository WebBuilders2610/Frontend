export class HealthSummary {
    constructor({
        id,
        neonateName,
        age,
        status,
        weight,
        lastUpdate,
        heartRate,
        respiratoryRate,
        oxygenSaturation,
        temperature,
    }) {
        this.id = id
        this.neonateName = neonateName
        this.age = age
        this.status = status // ej: 'Normal', 'Alerta'
        this.weight = weight
        this.lastUpdate = lastUpdate
        this.heartRate = heartRate
        this.respiratoryRate = respiratoryRate
        this.oxygenSaturation = oxygenSaturation
        this.temperature = temperature
    }

    // Método de negocio de ejemplo: evaluar si el neonato está en riesgo crítico
    isCritical() {
        return this.status.toLowerCase() === 'alerta'
    }
}
