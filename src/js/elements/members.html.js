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
const totalMembers = document.querySelector("[data-total-membresias]");
const buscarMiembroForm = document.querySelector("[data-buscar]");
const searchInput = document.querySelector("#seacrh");
const fechaHoy = document.querySelector("[data-fecha-actual]")


export default {
    membersTable,
    modalAddMemberDiv,
    addNewMemberButton,
    formAddMember,
    inputUserName,
    inputTelephone,
    inputDni,
    iconCloseModal,
    totalMembers,
    buscarMiembroForm,
    searchInput,
    fechaHoy
}