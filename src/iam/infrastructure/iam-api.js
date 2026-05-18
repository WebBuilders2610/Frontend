import httpClient from '../../shared/infrastructure/base-api.js'

export class IamApi {
    static async signIn(command) {
        try {
            // 1. Pedimos a MockAPI que busque SOLO por email
            const response = await httpClient.get(`/users?email=${command.email}`)
            const users = response.data

            // 2. Si no hay usuarios con ese email, MockAPI suele devolver []
            if (!users || users.length === 0) {
                throw new Error('Correo o contraseña incorrectos')
            }

            const user = users[0]

            // 3. Validamos la contraseña nosotros mismos en el frontend
            if (user.password !== command.password) {
                throw new Error('Correo o contraseña incorrectos')
            }

            // 4. Si todo está bien, retornamos el usuario
            return {
                user: user,
                token: `fake-jwt-token-for-${user.id}`,
            }
        } catch (error) {
            // 5. Si MockAPI lanza un 404 (porque no encontró el email), lo atrapamos y lanzamos un mensaje amigable
            if (error.response && error.response.status === 404) {
                throw new Error('Correo o contraseña incorrectos')
            }
            // Si es otro error (ej. sin internet), lo dejamos pasar
            throw error
        }
    }
}
