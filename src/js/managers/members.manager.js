import miembrosApi from "../../api/miembros.api";
import membersHtml from "../elements/members.html.js";
import { Member } from "../models/members.model";
import Swal from "sweetalert2";

import manejarPagos from "./manejarPagos.manager.js"
import moment from "moment";

//funcion para manejar fecha global del sistema
const fechaHoy = () => {
    const fechaHoy = moment().format("DD/MM/YYYY");;
    membersHtml.fechaHoy.innerHTML = `
    <span>Fecha del sistema: ${fechaHoy}</span>
    `
}
//funcion para aniadir nuevo miembro
const addNewMember = async () => {
    const newMember = new Member(
        membersHtml.inputUserName.value,
        membersHtml.inputTelephone.value,
        membersHtml.inputDni.value,
    );

    miembrosApi.registerNewMember(newMember)
    Swal.fire({
        title: `${membersHtml.inputUserName.value} agregado con exito`,
        icon: "success",
        timer: 2000,
    });
    //renderiza la tabla despues de aniadir el nuevo miembro
    renderMembers();
};

const getMembers = async() => {
    const membersDB = await miembrosApi.getMembers();
    return membersDB;
}


const renderMembers = async () => {
    membersHtml.membersTable.innerHTML = "";

    const allMembers = await getMembers();
    
    allMembers.forEach((member) => {
        const tr = document.createElement("tr");
        tr.setAttribute('data-id', member.id);
        tr.innerHTML = `
                <td>${member.name}</td>
                <td>${member.telefono}</td>
                <td>${member.dni}</td>
                <td class="estado-${member.state}" >${member.state ? "Activo" : "Falta de pago"}</td>
                <td>${member.start ? member.start : "Falta de pago"}</td>
                <td>${member.end ? member.end : "Falta de pago"}</td>
                <td>${member.tipo ? member.tipo : "Falta de pago"}</td>
                <td>
                    <button class="edit-button">Edit</button>
                    /
                    <button class="delete-button">Eliminar</button>
                    /
                    <button class="pagar-button">Registrar Pago</button>
                </td>
        `;
        membersHtml.membersTable.appendChild(tr);
    });
};


const membersFiltrados = async (memberFilter) => {
    membersHtml.membersTable.innerHTML = "";

    const allMembers = await getMembers();

    const filtrados = allMembers.filter((member) => {
        return member.name.toLowerCase().includes(memberFilter.toLowerCase());
    });

    filtrados.forEach((member) => {
        const tr = document.createElement("tr");
        tr.setAttribute('data-id', member.id);
        tr.innerHTML = `
            <td>${member.name}</td>
            <td>${member.telefono}</td>
            <td>${member.dni}</td>
            <td class="estado-${member.state}" >${member.state ? "Activo" : "Falta de pago"}</td>
            <td>${member.start ? member.start : "Falta de pago"}</td>
            <td>${member.end ? member.end : "Falta de pago"}</td>
            <td>${member.tipo ? member.tipo : "Falta de pago"}</td>
            <td>
                <button class="edit-button">Edit</button>
                /
                <button class="delete-button">Eliminar</button>
                /
                <button class="pagar-button">Registrar Pago</button>
            </td>
        `;
        membersHtml.membersTable.appendChild(tr);
    });
};



//if para verificar que los elementos de html esten presentes en el dom
if (membersHtml.addNewMemberButton) {
    membersHtml.addNewMemberButton.addEventListener("click", () => {
        membersHtml.modalAddMemberDiv.classList.add("show");
    });
};


//funcion para editar
const editar = async (memberId) => {
    let memberToEdit = await miembrosApi.getMemberById(memberId);

    Swal.fire({
        title: 'Editar Miembro',
        html: ` <div class="modal-sweetAlert">
                <label>Nombre:</label>
                <input id="inputUserName" class="swal2-input" value="${memberToEdit.name}" placeholder="Nombre">
                <label>DNI:</label>
                <input id="inputDni" class="swal2-input" value="${memberToEdit.dni}" placeholder="DNI">
                
                <label>Telefono:</label>
                <input id="inputTelephone" class="swal2-input" value="${memberToEdit.telefono}" placeholder="Telefono">
                
                </div>
            `,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: async () => {
            const nameValue = Swal.getPopup().querySelector('#inputUserName').value;
            const dniValue = Swal.getPopup().querySelector('#inputDni').value;
            const telephoneValue = Swal.getPopup().querySelector('#inputTelephone').value;
            const miembroEditado = {
                name: nameValue,
                dni: dniValue,
                telefono: telephoneValue,
                start: memberToEdit.start,
                state: true,
                end: memberToEdit.end,
            };
            await miembrosApi.editMember(memberId, miembroEditado);
            renderMembers();
        }
    });
};

//  funcion para manejar el evento click de editaro/ eliminar/ pagar
const editODeleteMemberFunction = async (event) => {

    const target = event.target;
    //  obtener el id del miembro con dataset.id
    const memberId = target.closest("tr").dataset.id;
    //funcion para editar
    if (target.classList.contains("edit-button")) {
        await editar(memberId);
    };
    //funcion borarr
    if (target.classList.contains("delete-button")) {
        await miembrosApi.deleteMember(memberId);
        renderMembers();
    };
    //funcion para pagar
    if (target.classList.contains("pagar-button")) {
        console.log(memberId);
        //llamamos a la funcion pagar del archivo registrarPago
        manejarPagos.pagar(memberId);
        renderMembers();
    }
};
// captura la tabla y detetcta donde se hizo click en la tabla
const membersTable = document.getElementById("membersTable");
if (membersTable) {
    membersTable.addEventListener("click", editODeleteMemberFunction);
    membersHtml.buscarMiembroForm.addEventListener("submit", (e) => {
        e.preventDefault();
        renderMembers(searchInput.value);
    });
    membersHtml.searchInput.addEventListener("input", () => {
        const member = membersHtml.searchInput.value;
        membersFiltrados(member);
    });
}

// abrir y cerrar modal de agregar nuevos miembros
if (membersHtml.modalAddMemberDiv) {
    window.addEventListener("click", (e) => {
        if (e.target == membersHtml.modalAddMemberDiv) {
            membersHtml.modalAddMemberDiv.classList.remove("show");
        };

    });
    membersHtml.iconCloseModal.addEventListener("click", () => {
        membersHtml.modalAddMemberDiv.classList.remove("show");
    });

    //funcion submit
    membersHtml.formAddMember.addEventListener("submit", (e) => {
        e.preventDefault();
        membersHtml.modalAddMemberDiv.classList.remove("show");
        addNewMember();
        membersHtml.formAddMember.reset(); //limpia losinputs
    });

    renderMembers();
};


const all = await getMembers();
const allMembersLength = await all.length;
export default { editODeleteMemberFunction, renderMembers, fechaHoy, allMembersLength };