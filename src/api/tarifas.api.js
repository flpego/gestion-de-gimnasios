import Swal from "sweetalert2";


const getTarifas = async () => {
    const res = await fetch("http://localhost:3000/tarifas");
    const data = await res.json();
    console.log(data)
    return data;
}

const getTarifaById = async (id) => {
    const res = await fetch(`http://localhost:3000/tarifas/${id}`);
    const data = await res.json();
    console.log(data);
    return data;
}

const registrarTarifa = async (tarifa) => {
    const res = await fetch("http://localhost:3000/tarifas/", {
        method: "POST",
        body: JSON.stringify(tarifa),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
    });
    const data = await res.json();
    console.log(data);
    return data;
}
//funcion para eliminar DELETE
const deleteTarifa = async (id) => {
    const res = await fetch(`http://localhost:3000/tarifas/${id}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    });
    Swal.fire({
        title: "Tarifa eliminada de la base de datos",
        icon: "error",
        timer: 1500,
    })
    console.log(res)
    return res;
}



export default {
    getTarifas,
    getTarifaById,
    registrarTarifa,
    deleteTarifa
}