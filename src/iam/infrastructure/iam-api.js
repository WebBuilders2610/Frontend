import httpClient from '../../shared/infrastructure/base-api.js'

export class IamApi {
    static async signIn(command) {
        try {
            const response = await httpClient.get(`/users?email=${command.email}`)
            const users = response.data

            if (!users || users.length === 0) {
                throw new Error('email or password incorrect')
            }

            const user = users[0]

            if (user.password !== command.password) {
                throw new Error('email or password incorrect')
            }

            return {
                user: user,
                token: `fake-jwt-token-for-${user.id}`,
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                throw new Error('email not found')
            }
            throw error
        }
    }
}
