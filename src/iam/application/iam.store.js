import { defineStore } from 'pinia'
import { IamApi } from '../infrastructure/iam-api.js'
import { SignInAssembler } from '../infrastructure/sign-in.assembler.js'
import { SignInCommand } from '../domain/sign-in.command.js'

export const useIamStore = defineStore('iam', {
    state: () => ({
        currentUser: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
    }),

    actions: {
        async signIn(email, password) {
            this.isLoading = true
            this.error = null

            try {
                const command = new SignInCommand({ email, password })

                const { user, token } = await IamApi.signIn(command)

                localStorage.setItem('token', token)

                this.currentUser = SignInAssembler.toEntity(user)
                this.isAuthenticated = true
            } catch (err) {
                this.error = err.message || 'Error al iniciar sesión'
                this.isAuthenticated = false
                throw err 
            } finally {
                this.isLoading = false
            }
        },

        logout() {
            this.currentUser = null
            this.isAuthenticated = false
            this.error = null
            localStorage.removeItem('token')
        },
    },
})
