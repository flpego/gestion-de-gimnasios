import Swal from "sweetalert2"
import { Pagos } from "../models/pagos.model";
import tarifasApi from "../../api/tarifas.api";
import miembrosApi from "../../api/miembros.api";

const pagar = async(memberId) => { 

    let member = await miembrosApi.getMemberById(memberId);
    console.log(member)
    const tarifasBD = await tarifasApi.getTarifas();
    const tarifasData = await tarifasBD;
    console.log(tarifasData);

   const renderTarifas = await tarifasData.map((tarifa) => {
        return  `
        <option value="${tarifa.price}">${tarifa.title} - Precio: $${tarifa.price}</option>
    `
    });

    Swal.fire({
        title: "Registrar Pago",
        html: `
        <p>Registrar pago para: ${member.name}</p>
        <select name="" id="membresiaTipo">
            ${renderTarifas}
        </select>
        `,
        showCancelButton: true,
        preConfirm: async() => {
            const membresiaTipoValue = Swal.getPopup().querySelector("#membresiaTipo").value
            console.log(membresiaTipoValue)
            const pagos = new Pagos();
            pagos.registrarPago(memberId, tarifasData.price)
        }
    });
 };

 export default {pagar}