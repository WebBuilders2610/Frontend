import { NeonatalProfile } from './neonatal-profile.entity.js';

/**
 * ParentProfile Entity (Aggregate Root)
 * Represents the user and manages their associated babies.
 *
 * @class ParentProfile
 */
export class ParentProfile {
    /**
     * @param {Object} params
     * @param {string|null} [params.id=null]
     * @param {string} [params.fullName='']
     * @param {string} [params.email='']
     * @param {string} [params.password='']
     * @param {Array} [params.babies=[]] - List of baby profiles or raw data.
     */
    constructor({
                    id = null,
                    fullName = '',
                    email = '',
                    password = '',
                    babies = []
                }) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.password = password;

        // Mapeamos los datos de entrada a instancias reales de la entidad NeonatalProfile
        this.babies = Array.isArray(babies)
            ? babies.map(baby => baby instanceof NeonatalProfile ? baby : new NeonatalProfile(baby))
            : [];
    }

    /**
     * Adds a new baby profile to the parent's account.
     * @param {NeonatalProfile} baby
     */
    addBaby(baby) {
        if (!(baby instanceof NeonatalProfile)) {
            throw new Error("Invalid object: Must be an instance of NeonatalProfile");
        }

        if (!baby.isValid()) {
            throw new Error("Incomplete baby profile information.");
        }

        this.babies.push(baby);
    }

    /**
     * Basic email format validation.
     * @returns {boolean}
     */
    hasValidEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(this.email);
    }
}