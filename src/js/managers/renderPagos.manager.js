import moment from "moment";
import pagosApi from "../../api/pagos.api";


//funcion para renderizar pagos
const renderPagos = async () => {

    const meses = moment.months(); //obtenemos todos los meses
    const fechaSelect = document.querySelector("#fechaSelect");
    const todosOption = document.createElement("option");
    todosOption.textContent = "Todos los pagos";
    fechaSelect.append(todosOption);
    //agregamos los meses al select
    meses.forEach((mes) => {
        const mesOption = document.createElement("option");
        mesOption.textContent = mes;
        fechaSelect.append(mesOption);
    });

    const filtrarPagosBtn = document.querySelector("[data-filtrar-pagos]");
    filtrarPagosBtn.addEventListener("click", () => {
        renderPagos();
    });


    const pagosSection = document.querySelector("[data-pagos-section]");
    const tableBodyPagos = document.querySelector("#tbody");

    pagosSection.innerHTML = "";//evitar doble render
    tableBodyPagos.innerHTML = "";//evitar doble render

    const mesSeleccionado = fechaSelect.value;
    const pagos = await pagosApi.getPagos(); //obtiene todos los pagos desde la api

    let totalVacio = [];
    let pagosFiltrados = [];

    if (mesSeleccionado === "Todos los pagos") {
        pagosFiltrados = pagos;
    } else {
        pagosFiltrados = pagos.filter((pagoCard) => {
            const pagoMes = moment(pagoCard.start, "DD/MM/YYYY").format("MMMM");
            return pagoMes === mesSeleccionado;
        });
    }

    pagosFiltrados.forEach((pagoCard) => {
        totalVacio.push(parseInt(pagoCard.tarifaPrice)); // llena el arr con las tarifas pagadas

        const pagosDiv = document.createElement("div");
        pagosDiv.className = "pagos-card";
        pagosDiv.innerHTML = `
            <h4>Usuario: ${pagoCard.memberName}</h4>
            <p>Tipo: ${pagoCard.tarifaName}</p>
            <p>Pago: $ ${pagoCard.tarifaPrice} - el dia ${pagoCard.start}</p>
        `;

        pagosSection.appendChild(pagosDiv);
    });
    const sumarTotal = () => {
        if (totalVacio.length > 1) {
            const totalSumado = totalVacio.reduce((a, b) => a + b);//suma todos los pagos y devuelve el total
            return totalSumado
        }
        else {
            return "No hay pagos registrados"
        }
    }
    //renderiza los pagos en la tabla
    tableBodyPagos.innerHTML = `
        <tr>
            <td>${pagosFiltrados.length == 0 ? "No hay pagos registrados" : pagosFiltrados.length}</td>
            <td>${sumarTotal()}</td>
        </tr>
    `;

    const tablePagos = document.querySelector("[data-table-pagos]");
    tablePagos.appendChild(tableBodyPagos);
};

export default { renderPagos };
