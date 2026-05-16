import { createPinia } from 'pinia'

/**
 * Shared Pinia store instance used as the centralised state management hub
 * for all bounded-context application service stores.
 *
 * @type {import('pinia').Pinia}
 */
const pinia = createPinia()

export default pinia
