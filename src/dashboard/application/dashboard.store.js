import { defineStore } from 'pinia'
import { DashboardApi } from '../infrastructure/dashboard-api.js'
import { HealthSummaryAssembler } from '../infrastructure/health-summary.assembler.js'
// Importa el assembler del gráfico si decidiste implementar esa parte
import { DashboardChartAssembler } from '../infrastructure/dashboard-chart.assembler.js'

export const useDashboardStore = defineStore('dashboard', {
    state: () => ({
        healthSummary: null, // Para la vista de detalle de un solo neonato
        healthSummaries: [], // Para la tabla resumen del dashboard principal
        chartMetrics: null, // Para el gráfico de tendencias generales
        isLoading: false,
        error: null,
    }),

    actions: {
        // 1. Obtiene el detalle de un neonato específico (vista /dashboard/summary/:babyId)
        async fetchHealthSummary(babyId) {
            this.isLoading = true
            this.error = null
            try {
                const data = await DashboardApi.getHealthSummary(babyId)
                if (data) {
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

        // 2. Obtiene la lista completa de neonatos (vista principal /dashboard)
        async fetchAllHealthSummaries() {
            this.isLoading = true
            this.error = null
            try {
                const data = await DashboardApi.getAllHealthSummaries()
                // Transformamos cada DTO que viene de la API a nuestra entidad de dominio
                this.healthSummaries = data.map((item) => HealthSummaryAssembler.toEntity(item))
            } catch (error) {
                console.error('Detalle del error:', error)
                this.error = 'Error al obtener la lista de neonatos.'
            } finally {
                this.isLoading = false
            }
        },

        // 3. Obtiene las métricas para Chart.js (vista principal /dashboard)
        async fetchChartMetrics() {
            this.isLoading = true
            this.error = null
            try {
                const data = await DashboardApi.getChartMetrics()
                if (data && data.length > 0) {
                    this.chartMetrics = DashboardChartAssembler.toEntity(data)
                } else {
                    this.error = 'No hay métricas disponibles para el gráfico.'
                }
            } catch (error) {
                console.error('Detalle del error:', error)
                this.error = 'Error al obtener datos del gráfico desde MockAPI.'
            } finally {
                this.isLoading = false
            }
        },
    },
})
