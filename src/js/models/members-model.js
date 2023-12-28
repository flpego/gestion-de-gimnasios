

class Member {
    static id = 1;
    constructor(name, telefono, dni,  inicio, fin, tipo) {
        this.id = Member.id++ ;
        this.name = name;
        this.telefono = telefono;
        this.dni = dni;
        this.state = false;
        this.start = new Date(start);
        this.end = new Date (end);
        this.tipo = tipo;
    }
}
