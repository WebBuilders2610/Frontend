// src/dashboard/application/dashboard.store.js
import { defineStore } from 'pinia'
import { DashboardApi } from '../infrastructure/dashboard-api.js'
import { HealthSummaryAssembler } from '../infrastructure/health-summary.assembler.js'

export const useDashboardStore = defineStore('dashboard', {
    state: () => ({
        healthSummary: null,
        isLoading: false,
        error: null,
    }),
    actions: {
        async fetchHealthSummary(babyId) {
            this.isLoading = true
            this.error = null
            try {
                const data = await DashboardApi.getHealthSummary(babyId)
                if (data) {
                    // El assembler transforma el DTO de MockAPI a nuestra entidad de dominio [cite: 668, 670]
                    this.healthSummary = HealthSummaryAssembler.toEntity(data)
                } else {
                    this.error = 'No se encontraron datos para este neonato.'
                }
            } catch (error) {
                console.error('Detalle del error:', error)
                this.error = 'Error al obtener datos de la API.'
            } finally {
                this.isLoading = false
            }
        },
    },
})
