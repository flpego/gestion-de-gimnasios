
import pagosApi from "../../api/pagos.api";

if (window.location.pathname.includes("src/pages/pagos.html")) {

}

const pagosSection = document.querySelector("[data-pagos-section]");

const renderPagos = async () => {
    const pagos = await pagosApi.getPagos();
    console.log(pagos);

    let total = [];

    pagos.forEach((pagoCard) => {

        total.push(parseInt(pagoCard.tarifaPrice))

        const pagosDiv = document.createElement("div");
        pagosDiv.innerHTML = `
        <h4>${pagoCard.memberName}</h4>
        <p>Tipo: ${pagoCard.tarifaName}</p>
        <p>Pago: ${pagoCard.tarifaPrice}</p>
        `
        pagosSection.appendChild(pagosDiv);
    });
    
    console.log(total);

    const suma = total.reduce((a, b)=> a + b)
    console.log(suma)
};






export default { renderPagos }