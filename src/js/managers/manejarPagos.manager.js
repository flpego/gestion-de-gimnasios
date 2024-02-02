import tarifasApi from "../../api/tarifas.api";
import miembrosApi from "../../api/miembros.api";
import { Pagos } from "../models/pagos.model";
import pagosApi from "../../api/pagos.api";
import membersManager from "./members.manager";
import Swal from "sweetalert2";

//obtiene las tarifas
const tarifasBD = await tarifasApi.getTarifas();
const tarifasData = await tarifasBD;
//renderiza las tarifas para registrar pagos
const renderTarifas = async () => {
  const tarifasBD = await tarifasApi.getTarifas();
  const tarifasData = await tarifasBD;

  const tarifasCards = tarifasData.map((tarifa) => {
    const tarifasCardDiv = document.createElement("div");
    tarifasCardDiv.classList.add("tarifas-card");
    tarifasCardDiv.classList.add("flex-center");
    tarifasCardDiv.setAttribute("id", tarifa.id);
    tarifasCardDiv.innerHTML = `
       <h4>Tarifa: ${tarifa.title}</h4>
       <p>Precio: $${tarifa.price}</p>
       <p>Duracion: ${tarifa.days} dias</p>
       <button data-tarifa-id="${tarifa.id}" class="btn-generar-pago">Add</button>

       `;
    return tarifasCardDiv;
  });
  return tarifasCards;
}

//funcion que maneja la logica de pagos
const pagar = async (memberId) => {
  //modal para registrar pago
  const pagarModalDiv = document.createElement("div");
  pagarModalDiv.classList.add("modal-container");
  pagarModalDiv.classList.add("flex-center");

  //a partir del memberId obtiene y relaciona la logica de pago con el member
  const member = await miembrosApi.getMemberById(memberId);

  const memberCard = document.createElement("div");

  memberCard.innerHTML += `
  <i class="fa-regular fa-circle-xmark config-close-icon flex-center"></i>
  <h4>Registrar pago para:</h4>
  <p>Nombre: ${member.name}</p>
  <p>DNI: ${member.dni}</p>
  `;
  pagarModalDiv.appendChild(memberCard);


  const tarifasCards = await renderTarifas();
  tarifasCards.forEach((tarifaCard) => {
    pagarModalDiv.appendChild(tarifaCard);
  });

  //maneja el evento click del usuario
  pagarModalDiv.addEventListener("click", async (event) => {
    const btnCerrarModal = event.target.closest(".config-close-icon"); // obtiene la clase donde se hizo click
    if (btnCerrarModal) {
      document.body.removeChild(pagarModalDiv); //cierra el modal
    };

    const btnGenerarPago = event.target.closest(".btn-generar-pago");
    if (btnGenerarPago) {
      const tarifaId = btnGenerarPago.getAttribute("data-tarifa-id");
      console.log(tarifaId);
      //buscamos la tarifa correspondiente con find y el id capturado id
      const tarifa = tarifasData.find((tarifa) => tarifa.id == tarifaId)
      //instanciamos const pagos para acceder al metodo resgitrarPago de la class Pagos
      const pagos = new Pagos();
      const datosDePago = pagos.registrarPago(member.id, member.name, tarifa.title, parseInt(tarifa.price), tarifa.days);
      const end = pagos.calculateDateEnd(tarifa.days);


      console.log(datosDePago.start, tarifa.days);
      console.log(datosDePago);
      // solicitud POST  
      await pagosApi.registrarUnPago(datosDePago);
      const datosMember = {
        name: member.name,
        dni: member.dni,
        telefono: member.telefono,
        start: datosDePago.start,
        end: end,
        state: true,
        tipo: tarifa.title
      }
      await miembrosApi.editMember(memberId, datosMember);
      await membersManager.renderMembers(datosMember);
      Swal.fire({
        title: "Pago registrado",
        timer: 1000
      });
      document.body.removeChild(pagarModalDiv);
    }
  });
  document.body.appendChild(pagarModalDiv);

};




export default { pagar }