import axios from 'axios'
import { API_BASE_URL } from './base-endpoint.js'

const httpClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

export default httpClient
