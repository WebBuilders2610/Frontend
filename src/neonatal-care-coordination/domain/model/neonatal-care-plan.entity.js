export class NeonatalCarePlan {
    constructor(
        id = 0,
        neonatalName = '',
        riskLevel = '',
        status = '',
        priorityLevel = '',
        monitoringFrequency = '',
        createdDate = '',
        lastReviewDate = '',
        nextFollowUpDate = '',
        assignedPediatrician = ''
    ) {
        this.id = id;
        this.neonateName = neonatalName;
        this.riskLevel = riskLevel;
        this.status = status;
        this.priorityLevel = priorityLevel;
        this.monitoringFrequency = monitoringFrequency;
        this.createdDate = createdDate;
        this.lastReviewDate = lastReviewDate;
        this.nextFollowUpDate = nextFollowUpDate;
        this.assignedPediatrician = assignedPediatrician;
    }
}