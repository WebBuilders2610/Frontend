import { defineStore } from 'pinia'
import { ProfilesApi } from '../infrastructure/profiles-api.js'

export const useProfileStore = defineStore('profiles', {
    state: () => ({
        loading: false,
    }),

    actions: {
        async addNeonate(neonateData) {
            this.loading = true

            try {
                const newNeonate = await ProfilesApi.createNeonate(neonateData)

                console.log('Bebé guardado con éxito:', newNeonate)

                return newNeonate 
            } catch (error) {
                console.error('Error al guardar el bebé:', error)
                throw error
            } finally {
               
                this.loading = false
            }
        },
    },
})
