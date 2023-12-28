

export class Member {
    static id = 1;
    constructor(name, telefono, dni, tipo) {
        this.id = Member.id++;
        this.name = name;
        this.telefono = telefono;
        this.dni = dni;
        this.state = false;
        this.start = this.formaterDate();
        this.end = this.calculateDateEnd();
        this.tipo = tipo;
    }

    formaterDate(date, dateYear, dateMonth, dateD) {
        date = new Date();
        dateYear = date.getFullYear();
        dateMonth = date.getMonth();
        dateD = date.getDate();

        return `${dateD}/${dateMonth}/${dateYear}`

    }
    calculateDateEnd() {

        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 30); // Agrega 30 días
        return this.formaterDate(endDate);

    }
}
