/**
 * NeonatalProfile Entity
 * Represents the newborn's health data and physical characteristics.
 *
 * @class NeonatalProfile
 */
export class NeonatalProfile {
    /**
     * @param {Object} params - Entity attributes.
     * @param {string|null} [params.id=null]
     * @param {string} [params.firstName='']
     * @param {string} [params.lastName='']
     * @param {string|Date|null} [params.birthDate=null]
     * @param {number} [params.weight=0] - Weight in kg.
     * @param {number} [params.height=0] - Height in cm.
     * @param {string} [params.birthType=''] - e.g., 'Vaginal', 'Cesárea'.
     * @param {string} [params.bloodType=''] - e.g., 'O+', 'A-'.
     */
    constructor({
                    id = null,
                    firstName = '',
                    lastName = '',
                    birthDate = null,
                    weight = 0,
                    height = 0,
                    birthType = '',
                    bloodType = ''
                }) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.weight = weight;
        this.height = height;
        this.birthType = birthType;
        this.bloodType = bloodType;
    }

    /**
     * Validates that the profile has the essential information.
     * @returns {boolean}
     */
    isValid() {
        return this.firstName.trim().length > 0 && this.birthDate !== null;
    }
}