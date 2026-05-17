import httpClient from '../../shared/infrastructure/base-api.js'

export class IamApi {
    static async signIn(command) {
       const response = await httpClient.get(`/users?email=${command.email}&password=${command.password}`)
        const users = response.data

        if (users.length === 0) {
            throw new Error('Correo o contraseña incorrectos')
        }

        const user = users[0]

        return {
            user: user,
            token: `fake-jwt-token-for-${user.id}`,
        }
    }
}
