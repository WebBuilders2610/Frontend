export class CareRecommendation {
    constructor(
        id = 0,
        carePlanId = 0,
        recommendation = '',
        urgencyLevel = '',
        generatedBy = '',
        generatedDate = '',
        status = ''
    ) {
        this.id = id;
        this.carePlanId = carePlanId;
        this.recommendation = recommendation;
        this.urgencyLevel = urgencyLevel;
        this.generatedBy = generatedBy;
        this.generatedDate = generatedDate;
        this.status = status;
    }
}