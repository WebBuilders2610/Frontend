import { NeonateProfile } from "../domain/neonate-profile.entity";

export class NeonateProfileAssembler{
    static toEntity(resource){
        return new NeonateProfile{
            id: resource.id,
            id: resource.nombre,
            id: resource.apellidos,
            id: resource.edad,
            id: resource.peso,
            id: resource.talla,
            id: resource.tipoParto,
            id: resource.grupoSanguineo,
        }
    }
}