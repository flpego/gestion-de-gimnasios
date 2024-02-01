import moment from "moment";
export class Pagos {
    //json-server agrega un id en las solicitudes POST
    constructor() {
        this.pagos = [];
    }

    registrarPago(memberId, memberName, tarifaName, tarifaPrice, days) {
        const nuevoPago = { memberId, memberName, tarifaName, tarifaPrice };
        const startDate = this.calculateDateStart();
        const endDate = this.calculateDateEnd(days);
        
        nuevoPago.start = startDate;
        nuevoPago.end = endDate;

        this.pagos.push(nuevoPago)
        return nuevoPago;
    }
    calculateDateStart(){
        const startDate = moment(new Date(), "DD/MM/YYYY");
        return startDate.format("DD/MM/YYYY");
    }
    calculateDateEnd(days) {
        const endDate = moment(new Date()).add(days, "days");
        return endDate.format("DD/MM/YYYY");
    }
 
}