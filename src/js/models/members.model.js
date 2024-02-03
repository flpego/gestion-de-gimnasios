import { v4 as generarId } from "uuid";
export class Member {
    constructor(name, telefono, dni, avatar) {
        this.id = generarId();
        this.name = name;
        this.telefono = telefono;
        this.dni = dni;
        this.avatar = avatar

    }
}
