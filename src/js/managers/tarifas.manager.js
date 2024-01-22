import tarifasHtml from "../elements/tarifas.html.js"
import tarifasApi from "../../api/tarifas.api.js"
import { Tarifas } from "../models/tarifas.model.js"
import Swal from "sweetalert2"

//agregar nueva tarifa
const addNewTarifa = async () => {
    const tarifa = new Tarifas(
        tarifasHtml.inputRegMemb.value,
        tarifasHtml.inputRegPrice.value
    );

    try {
        //enviar tarifas al server
        await tarifasApi.registrarTarifa(tarifa);
        console.log(tarifa);
        Swal.fire({
            title: "Tarifa registrada con exito"
        });
        //renderizar la lista de tarifas despues de agregarla
        renderTarifas();
    } catch (error) {
        console.error("Error al registrar la tarifa:", error);
        Swal.fire({
            title: "Error",
            text: "Hubo un error al registrar la tarifa. Por favor, intentalo de nuevo.",
            icon: "error"
        });
    }
}

const renderTarifas = async() => { 
    const tarifasBd = await tarifasApi.getTarifas();
    const tarifasData = await tarifasBd;
    console.log(tarifasData);

    tarifasHtml.tarifasDivContainer.innerHTML = "";


    tarifasData.forEach((tarifa) => {
       const tarifasCardDiv = document.createElement("div");
       tarifasCardDiv.classList.add("tarifas-card");
       tarifasCardDiv.setAttribute("id", tarifa.id)
       tarifasCardDiv.innerHTML = `
       <h4>Tarifa: ${tarifa.title}</h4>
       <p>Precio: $${tarifa.price}</p>
       <button data-tarifa-id="${tarifa.id}" class="delete-button">Eliminar</button>
       `;

    
        tarifasHtml.tarifasDivContainer.appendChild(tarifasCardDiv);
        const deleteTarifaBTN = document.querySelector(`[data-tarifa-id="${tarifa.id}"]`);

        deleteTarifaBTN.addEventListener("click", deleteTarifa)
    });


 }

 const deleteTarifa = async(event) => { 
    const tarifaId = await event.target.getAttribute("data-tarifa-id");
    console.log(tarifaId);
    await tarifasApi.deleteTarifa(tarifaId);
    await renderTarifas();
  }

if (tarifasHtml.formRegMemb) {

    tarifasHtml.formRegMemb.addEventListener("submit", async(e) => {
    console.log(tarifasHtml.inputRegMemb.value);
    e.preventDefault();
    await addNewTarifa();
    tarifasHtml.formRegMemb.reset();
    });
}




export default {
    renderTarifas
}


