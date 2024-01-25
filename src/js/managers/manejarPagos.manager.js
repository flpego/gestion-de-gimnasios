import Swal from "sweetalert2"
import { Pagos } from "../models/pagos.model";
import tarifasApi from "../../api/tarifas.api";
import miembrosApi from "../../api/miembros.api";
import pagosApi from "../../api/pagos.api";
import membersManager from "./members.manager";

const pagar = async (memberId) => {

    const member = await miembrosApi.getMemberById(memberId);
    const memberName = member.name;

    const tarifasBD = await tarifasApi.getTarifas();
    const tarifasData = await tarifasBD;
    console.log(tarifasData);

    const renderTarifas = await tarifasData.map((tarifa) => {
        return `
        <option data-title="${tarifa.title}" value="${tarifa.price}">${tarifa.title} - Precio: $${tarifa.price} - Dias: ${tarifa.days}</option>
    `
    });

    Swal.fire({
        title: "Registrar Pago",
        html: `
        <p>Registrar pago para: ${memberName}</p>
        <select name="" id="membresiaTipo">
            ${renderTarifas}
        </select>
        `,
        showCancelButton: true,
        preConfirm: async () => {
            //capturamos el valor del select
            const membresiaTipoValue = Swal.getPopup().querySelector("#membresiaTipo").value
            const tarifaTitle = Swal.getPopup().querySelector("#membresiaTipo option:checked").getAttribute("data-title");
            //instanciamos const pagos para acceder al metodo resgitrarPago de la class Pagos
            const pagos = new Pagos();
            const datosDePago = pagos.registrarPago(memberId, memberName, tarifaTitle, parseInt(membresiaTipoValue))
            const end = pagos.calculateDateEnd(datosDePago.start, tarifasData.days)
            console.log(datosDePago.start, tarifa.days)
            console.log(datosDePago);
            // solicitud POST 
            await pagosApi.registrarUnPago(datosDePago);
            const miembroEditado = {
                name: member.name,
                dni: member.dni,
                telefono: member.telefono,
                start: datosDePago.start,
                end: end,
                state: true,
                tipo: tarifaTitle
            }
            await miembrosApi.editMember(memberId, miembroEditado);
            membersManager.renderMembers(miembroEditado)
        }
    });

};



export default { pagar }