

const registrarUnPago = async (datosDePago) => {
    const res = await fetch("http://localhost:3000/pagos/", {
        method: "POST",
        body: JSON.stringify(datosDePago),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
    });
    const data = await res.json();
    console.log(data);
    return data;
}

export default { registrarUnPago }