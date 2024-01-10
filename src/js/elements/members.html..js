// constantes para capturar y mostrar los resultados
const membersTable = document.querySelector("[data-miembros-tbody]");
const modalAddMemberDiv = document.querySelector("[data-miembros-agregar-modal]");
//button add member
const addNewMemberButton = document.querySelector("[data-miembro-add-button]");

// constante para capturar los valores de los inputs y el event submit

const formAddMember = document.querySelector("[data-form-add-member]");
const inputUserName = document.querySelector("[data-input-user-name ]");
const inputTelephone = document.querySelector("[data-input-telefono]");
const inputDni = document.querySelector("[data-input-dni]");
const iconCloseModal = document.querySelector("#close-modal-icon");
const membresiaType = document.querySelector("[data-membresia-tipo]");
const totalMembers = document.querySelector("[data-total-membresias]");
const agregadosRecientemente = document.querySelector("[data-actividad-reciente]");
const filterInput = document.querySelector("[data-filtrar-miembro]");
const formBuscar = document.querySelector("[data-buscar]");

export default {
    membersTable,
    modalAddMemberDiv,
    addNewMemberButton,
    formAddMember,
    inputUserName,
    inputTelephone,
    inputDni,
    iconCloseModal,
    membresiaType,
    totalMembers,
    agregadosRecientemente,
    filterInput,
    formBuscar
}