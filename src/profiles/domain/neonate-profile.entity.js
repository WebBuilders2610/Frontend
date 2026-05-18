export class NeonateProfile{
    constructor({id,nombre,apellidos,edad,peso,talla,tipoParto,grupoSanguineo}){
        this.id=id
        this.nombre=nombre
        this.apellidos=apellidos
        this.edad=edad
        this.peso=peso
        this.talla=talla
        this.tipoParto=tipoParto
        this.grupoSanguineo=grupoSanguineo
    }
    getFullName(){
        return this.nombre+' '+this.apellidos
    }
}


