import { v4 as generarId } from "uuid";

export class Tarifas {
    constructor(title, price) {
        this.id = generarId();
        this.title = title;
        this.price = price;
    };
}
