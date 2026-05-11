import axios from 'axios';

const http = axios.create({
    baseURL: 'http://localhost:3000'
});

export class CareCoordinationService {

    getCarePlans() {
        return http.get('/carePlans');
    }

    getFollowUps() {
        return http.get('/followUps');
    }

    getRecommendations() {
        return http.get('/recommendations');
    }

    getVitalSigns() {
        return http.get('/vitalSigns');
    }

    createCarePlan(carePlan) {
        return http.post('/carePlans', carePlan);
    }
}