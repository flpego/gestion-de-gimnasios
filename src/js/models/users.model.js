import { v4 as generarId } from "uuid";
export class User {
    constructor(name, password, privilegios) {
        this.id = generarId();
        this.name = name;
        this.password = password;
        this.privilegios = privilegios;
    }
}