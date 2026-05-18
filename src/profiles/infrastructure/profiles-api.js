import httpClient from '../../shared/infrastructure/base-api.js'
export class ProfileApi{
    static async createNeonate(data){
        const response = await httpClient.post('/neonates',dataa)
        return response.data
    }
}