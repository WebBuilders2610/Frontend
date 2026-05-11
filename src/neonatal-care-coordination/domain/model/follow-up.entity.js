export class FollowUp {
    constructor(
        id = 0,
        carePlanId = 0,
        followUpDate = '',
        followUpType = '',
        status = '',
        observations = '',
        assignedSpecialist = ''
    ) {
        this.id = id;
        this.carePlanId = carePlanId;
        this.followUpDate = followUpDate;
        this.followUpType = followUpType;
        this.status = status;
        this.observations = observations;
        this.assignedSpecialist = assignedSpecialist;
    }
}