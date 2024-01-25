export class Pagos {
    //json-server agrega un id en las solicitudes POST
    constructor() {
        this.pagos = [];
    }

    registrarPago(memberId, memberName, tarifaName, tarifaPrice, days) {
        const nuevoPago = { memberId, memberName, tarifaName, tarifaPrice };
        const start = this.formaterDate(new Date());
        const end = this.calculateDateEnd(new Date(), parseInt(days));

        nuevoPago.start = start;
        nuevoPago.end = end;

        this.pagos.push(nuevoPago)
        return nuevoPago;
    }


    formaterDate(date) {

        const dateYear = date.getFullYear();
        const dateMonth = date.getMonth() + 1;
        const dateD = date.getDate();

        return `${dateD}/${dateMonth}/${dateYear}`
    };

    calculateDateEnd(startDate, days) {
        const endDate = new Date(startDate);
        endDate.setDate(startDate + days);

        return this.formaterDate(endDate);
    }
}