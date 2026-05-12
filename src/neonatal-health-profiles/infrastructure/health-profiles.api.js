import { BaseApi } from "../../shared/infrastructure/base-api.js";
import { BaseEndpoint } from "../../shared/infrastructure/base-endpoint.js";

const parentsEndpointPath = import.meta.env.VITE_PARENTS_ENDPOINT_PATH;
const neonatalEndpointPath = import.meta.env.VITE_NEONATAL_PROFILES_ENDPOINT_PATH;

/**
 * Infrastructure gateway for the Neonatal Health Profiles bounded-context.
 * Handles CRUD for parents and babies.
 *
 * @class HealthProfilesApi
 * @extends BaseApi
 */
export class HealthProfilesApi extends BaseApi {
    #parentsEndpoint;
    #neonatalEndpoint;

    constructor() {
        super();
        this.#parentsEndpoint = new BaseEndpoint(this, parentsEndpointPath);
        this.#neonatalEndpoint = new BaseEndpoint(this, neonatalEndpointPath);
    }

    // --- Parent Operations ---
    getParentById(id) {
        return this.#parentsEndpoint.getById(id);
    }

    createParent(resource) {
        return this.#parentsEndpoint.create(resource);
    }

    // --- Neonatal Profile Operations ---
    getNeonatalProfiles() {
        return this.#neonatalEndpoint.getAll();
    }

    getNeonatalProfileById(id) {
        return this.#neonatalEndpoint.getById(id);
    }

    createNeonatalProfile(resource) {
        return this.#neonatalEndpoint.create(resource);
    }

    updateNeonatalProfile(resource) {
        return this.#neonatalEndpoint.update(resource.id, resource);
    }

    deleteNeonatalProfile(id) {
        return this.#neonatalEndpoint.delete(id);
    }
}