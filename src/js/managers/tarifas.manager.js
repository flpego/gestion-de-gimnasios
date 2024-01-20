import tarifasHtml from "../elements/tarifas.html.js"
import tarifasApi from "../../api/tarifas.api.js"
import { Tarifas } from "../models/tarifas.model.js"
import Swal from "sweetalert2"

alert("hola")

const addNewTarifa = async () => {
    const tarifa = new Tarifas(
        tarifasHtml.inputRegMemb.value,
        tarifasHtml.inputRegPrice.value
    );

    try {
        await tarifasApi.registrarTarifa(tarifa);
        console.log(tarifa);
        Swal.fire({
            title: "OK?"
        });
    } catch (error) {
        console.error("Error al registrar la tarifa:", error);
        Swal.fire({
            title: "Error",
            text: "Hubo un error al registrar la tarifa. Por favor, inténtalo de nuevo.",
            icon: "error"
        });
    }
}

tarifasApi.getTarifas();
tarifasHtml.formRegMemb.addEventListener("submit", async(e) => {
    console.log(tarifasHtml.inputRegMemb.value);
    e.preventDefault();
    await addNewTarifa();
});

export default {
    addNewTarifa
}


