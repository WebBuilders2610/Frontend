import { defineStore } from 'pinia';
import { CareCoordinationService } from '../infrastructure/api/care-coordination.api';

const apiService = new CareCoordinationService();

export const useCareCoordinationStore = defineStore('careCoordination', {

    state: () => ({
        carePlans: [],
        followUps: [],
        recommendations: [],
        vitalSigns: [],
        loading: false
    }),

    actions: {

        async fetchCarePlans() {
            this.loading = true;

            try {
                const response = await apiService.getCarePlans();
                this.carePlans = response.data;
            } catch (error) {
                console.error('Error fetching care plans:', error);
            } finally {
                this.loading = false;
            }
        },

        async fetchFollowUps() {
            try {
                const response = await apiService.getFollowUps();
                this.followUps = response.data;
            } catch (error) {
                console.error('Error fetching follow-ups:', error);
            }
        },

        async fetchRecommendations() {
            try {
                const response = await apiService.getRecommendations();
                this.recommendations = response.data;
            } catch (error) {
                console.error('Error fetching recommendations:', error);
            }
        },

        async fetchVitalSigns() {

            try {

                const response =
                    await apiService.getVitalSigns();

                this.vitalSigns = response.data;

            } catch (error) {

                console.error(
                    'Error fetching vital signs:',
                    error
                );
            }
        },

        async createCarePlan(carePlan) {

            try {

                const response =
                    await apiService.createCarePlan(carePlan);

                this.carePlans.push(response.data);

            } catch (error) {

                console.error(
                    'Error creating care plan:',
                    error
                );
            }
        }
    }
});