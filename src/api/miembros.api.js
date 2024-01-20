import Swal from "sweetalert2";


//obtener miembros GET
const getMembers = async () => {
    const res = await fetch("http://localhost:3000/miembros");
    const data = await res.json();
    console.log(data)
    return data;
}
//obtener un miembro por ID GET
const getMemberById = async (id) => {
    const res = await fetch(`http://localhost:3000/miembros/${id}`);
    const data = await res.json();
    console.log(data)
    return data;
};

//registrar un miembro POST
const registerNewMember = async (member) => {
    const res = await fetch(`http://localhost:3000/miembros/`, {
        method: "POST",
        body: JSON.stringify(member),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },

    });
    const data = await res.json();
    console.log(data)
    return data;
};

//editar info de un miembro PUT

const editMember = async(id ,member) => {
    const res = await fetch(`http://localhost:3000/miembros/${id}`, {
        method: "PUT",
        body: JSON.stringify(member),
        headers: {
            "Content-type" : "application/json; charset=UTF-8"
        }
        
    });
    const data = await res.json();
    console.log(data)
    return data;
}

//eliminar un miebro de la base DELETE

const deleteMember = async(id) => {
    const res = await fetch(`http://localhost:3000/miembros/${id}`, {
        method: "DELETE",
        headers: {
            "Content-type" : "application/json; charset=UTF-8"
        }
        
    });
    Swal.fire({
        title: "Miembro eliminado de la base de datos",
        icon: "error",
        timer: 1500,
    })
    console.log(res)
    return res;
}



export default {
    getMembers,
    getMemberById,
    registerNewMember,
    editMember,
    deleteMember
}