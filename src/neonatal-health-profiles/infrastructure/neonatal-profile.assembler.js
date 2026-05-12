import { NeonatalProfile } from "../domain/models/neonatal-profile.entity.js";

/**
 * Maps Neonatal Profile infrastructure resources into domain entities and vice versa.
 *
 * @class NeonatalProfileAssembler
 */
export class NeonatalProfileAssembler {
    /**
     * Converts a raw neonatal resource payload into a NeonatalProfile entity.
     * @param {Object} resource
     * @returns {NeonatalProfile}
     */
    static toEntityFromResource(resource) {
        return new NeonatalProfile({ ...resource });
    }

    /**
     * Parses an HTTP response and maps it into a collection of entities.
     * @param {import('axios').AxiosResponse} response
     * @returns {NeonatalProfile[]}
     */
    static toEntitiesFromResponse(response) {
        if (response.status !== 200) {
            console.error(`${response.status} ${response.statusText}`);
            return [];
        }
        let resources = response.data instanceof Array
            ? response.data
            : response.data['neonatal_profiles'] || [];
        return resources.map(resource => this.toEntityFromResource(resource));
    }
}