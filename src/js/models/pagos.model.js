export class Pagos {
    constructor(){
        this.pagos = [];
    }

    registrarPago (memberId, tarifaId) {
        this.memberId = memberId;
        this.tarifaId = tarifaId;
        this.date() = new Date();
    }
}