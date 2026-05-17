import { useIamStore } from "../application/iam.store"

export const authenticationGuard = (to, from, next) => {
    const iamStore = useIamStore()

    if (to.meta.requiresAuth && !iamStore.isAuthenticated) {
        next('/sign-in') 
    } else {
        next() 
    }
}
