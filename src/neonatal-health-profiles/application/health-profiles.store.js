import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { HealthProfilesApi } from "../infrastructure/health-profiles.api.js";
import { NeonatalProfileAssembler } from "../infrastructure/neonatal-profile.assembler.js";
import { ParentProfileAssembler } from "../infrastructure/parent-profile.assembler.js";

const healthProfilesApi = new HealthProfilesApi();

/**
 * Application service store for the `Neonatal Health Profiles` bounded context.
 * Coordinates parent and baby profile use cases for SIRAN.
 */
export const useHealthProfilesStore = defineStore('healthProfiles', () => {

    // --- State ---
    const currentParent = ref(null);
    const babyProfiles = ref([]);
    const errors = ref([]);
    const parentLoaded = ref(false);
    const babiesLoaded = ref(false);

    // --- Getters (Computed) ---
    const babiesCount = computed(() => babiesLoaded.value ? babyProfiles.value.length : 0);
    const hasParentAccount = computed(() => currentParent.value !== null);

    // --- Actions: Parent Operations ---

    /**
     * Loads the parent profile from infrastructure.
     * @param {string|number} id - Parent identifier.
     */
    function fetchParent(id) {
        healthProfilesApi.getParentById(id).then(response => {
            currentParent.value = ParentProfileAssembler.toEntityFromResponse(response);
            parentLoaded.value = true;
        }).catch(error => {
            errors.value.push(error);
        });
    }

    /**
     * Creates a new parent account.
     * @param {ParentProfile} parent - Parent entity to persist.
     */
    function createParent(parent) {
        healthProfilesApi.createParent(parent).then(response => {
            currentParent.value = ParentProfileAssembler.toEntityFromResponse(response);
            parentLoaded.value = true;
        }).catch(error => {
            errors.value.push(error);
        });
    }

    // --- Actions: Neonatal Profile Operations ---

    /**
     * Loads all neonatal profiles from the API.
     */
    function fetchNeonatalProfiles() {
        healthProfilesApi.getNeonatalProfiles().then(response => {
            babyProfiles.value = NeonatalProfileAssembler.toEntitiesFromResponse(response);
            babiesLoaded.value = true;
        }).catch(error => {
            errors.value.push(error);
        });
    }

    /**
     * Finds a baby by identifier in the local state.
     */
    function getBabyById(id) {
        return babyProfiles.value.find(baby => baby.id == id);
    }

    /**
     * Persists a new baby profile and updates the list.
     * @param {NeonatalProfile} baby - Baby entity.
     */
    function addNeonatalProfile(baby) {
        healthProfilesApi.createNeonatalProfile(baby).then(response => {
            const newBaby = NeonatalProfileAssembler.toEntityFromResource(response.data);
            babyProfiles.value.push(newBaby);
        }).catch(error => {
            errors.value.push(error);
        });
    }

    /**
     * Updates an existing neonatal profile.
     */
    function updateNeonatalProfile(baby) {
        healthProfilesApi.updateNeonatalProfile(baby.id, baby).then(response => {
            const updatedBaby = NeonatalProfileAssembler.toEntityFromResource(response.data);
            const index = babyProfiles.value.findIndex(b => b.id === updatedBaby.id);
            if (index !== -1) babyProfiles.value[index] = updatedBaby;
        }).catch(error => {
            errors.value.push(error);
        });
    }

    /**
     * Deletes a neonatal profile.
     */
    function deleteNeonatalProfile(baby) {
        healthProfilesApi.deleteNeonatalProfile(baby.id).then(() => {
            const index = babyProfiles.value.findIndex(b => b.id === baby.id);
            if (index !== -1) babyProfiles.value.splice(index, 1);
        }).catch(error => {
            errors.value.push(error);
        });
    }

    return {
        // State
        currentParent,
        babyProfiles,
        errors,
        parentLoaded,
        babiesLoaded,
        // Getters
        babiesCount,
        hasParentAccount,
        // Actions
        fetchParent,
        createParent,
        fetchNeonatalProfiles,
        getBabyById,
        addNeonatalProfile,
        updateNeonatalProfile,
        deleteNeonatalProfile
    }
});