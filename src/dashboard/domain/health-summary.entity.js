export class HealthSummary {
    constructor({ babyId, averageTemperature, averageOxygen, alertsCount, lastUpdate }) {
        this.babyId = babyId
        this.averageTemperature = averageTemperature
        this.averageOxygen = averageOxygen
        this.alertsCount = alertsCount
        this.lastUpdate = lastUpdate
    }

    hasCriticalAlerts() {
        return this.alertsCount > 0
    }

    isTemperatureNormal() {
        return this.averageTemperature >= 36.5 && this.averageTemperature <= 37.5
    }
}
