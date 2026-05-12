import { ParentProfile } from "../domain/models/parent-profile.entity.js";

/**
 * Maps Parent Profile infrastructure resources into domain entities.
 *
 * @class ParentProfileAssembler
 */
export class ParentProfileAssembler {
    /**
     * Converts a raw parent resource payload into a ParentProfile entity.
     * @param {Object} resource
     * @returns {ParentProfile}
     */
    static toEntityFromResource(resource) {
        return new ParentProfile({ ...resource });
    }

    /**
     * Parses an HTTP response for parent data.
     * @param {import('axios').AxiosResponse} response
     * @returns {ParentProfile|null}
     */
    static toEntityFromResponse(response) {
        if (![200, 201].includes(response.status)) {
            console.error(`${response.status} ${response.statusText}`);
            return null;
        }
        return this.toEntityFromResource(response.data);
    }
}