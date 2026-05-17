import { User } from '../domain/user.entity.js'

export class SignInAssembler {
    static toEntity(resource) {
        return new User({
            id: resource.id,
            fullName: resource.fullName,
            email: resource.email,
            role: resource.role,
        })
    }
}
