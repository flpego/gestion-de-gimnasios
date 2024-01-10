

export class Member {
    constructor(name, telefono, dni, tipo) {
        this.id = this.generarId()
        this.name = name;
        this.telefono = telefono;
        this.dni = dni;
        this.state = true;
        this.start = this.formaterDate(new Date());
        this.end = this.calculateDateEnd(tipo);
        this.tipo = tipo;
    }

    generarId() {
        const id =  Date.now().toString(36);
        return id;
    }

    formaterDate(date) {
        
        const dateYear = date.getFullYear();
        const dateMonth = date.getMonth() +1;
        const dateD = date.getDate();

        return `${dateD}/${dateMonth}/${dateYear}`

    }
    calculateDateEnd(tipo) {
        const endDate = new Date();
        if(tipo == "Mensual") {
            endDate.setDate(endDate.getDate() + 30); // Agrega 30 días
        } else if(tipo == "Bimestral"){
            endDate.setDate(endDate.getDate() + 60); // Agrega 30 días
        }

        return this.formaterDate(endDate);

    }
}
