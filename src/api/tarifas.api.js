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



export default {
    getTarifas,
    getTarifaById,
    registrarTarifa
}