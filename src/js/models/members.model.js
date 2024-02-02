import { v4 as generarId } from "uuid";
export class Member {
    constructor(name, telefono, dni) {
        this.id = generarId();
        this.name = name;
        this.telefono = telefono;
        this.dni = dni;
    };

}
