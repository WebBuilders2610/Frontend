export class User {
    constructor({ id, fullName, email, role }) {
        this.id = id
        this.fullName = fullName
        this.email = email
        this.role = role // 'PARENT' o 'NEONATOLOGIST'
    }

    isDoctor() {
        return this.role === 'NEONATOLOGIST'
    }
}
