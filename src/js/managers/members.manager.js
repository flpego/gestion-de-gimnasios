import miembrosApi from "../../api/miembros.api";
import membersHtml from "../elements/members.html.";
import { Member } from "../models/members.model";
import Swal from "sweetalert2";

const addNewMember = async () => {
    const newMember = new Member(
        membersHtml.inputUserName.value,
        membersHtml.inputTelephone.value,
        membersHtml.inputDni.value,
        membersHtml.membresiaType.value
    );

    miembrosApi.registerNewMember(newMember)
    Swal.fire({
        title: `${membersHtml.inputUserName.value} agregado con exito`,
        icon: "success",
        timer: 2000,
    });

    renderMembers();
};


const renderMembers = async () => {
    membersHtml.membersTable.innerHTML = "";

    const membersDB = await miembrosApi.getMembers();
    const allMembers = await membersDB;

    allMembers.forEach((member) => {
        const tr = document.createElement("tr");
        tr.setAttribute('data-id', member.id);
        tr.innerHTML = `
                <td>${member.name}</td>
                <td>${member.telefono}</td>
                <td>${member.dni}</td>
                <td class="estado-${member.state}" >${member.state ? "Activo" : "Vencido"}</td>
                <td>${member.start}</td>
                <td>${member.end}</td>
                <td>${member.tipo}</td>
                <td>
                    <button class="edit-button">Edit</button>
                    /
                    <button class="delete-button">Eliminar</button>
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

// abrir y cerrar modal de agregar nuevos miembros
if (membersHtml.modalAddMemberDiv) {
    window.addEventListener("click", (e) => {
        if (e.target == membersHtml.modalAddMemberDiv) {
            membersHtml.modalAddMemberDiv.classList.remove("show");
        };
        membersHtml.iconCloseModal.addEventListener("click", () => {
            membersHtml.modalAddMemberDiv.classList.remove("show");
        });
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

const editar = async (memberId) => {
    let memberToEdit = await miembrosApi.getMemberById(memberId);
    
    Swal.fire({
        title: 'Editar Miembro',
        html: ` <label>Nombre:</label>
                <input id="inputUserName" class="swal2-input" value="${memberToEdit.name}" placeholder="Nombre">
                <label>DNI:</label>
                <input id="inputDni" class="swal2-input" value="${memberToEdit.dni}" placeholder="DNI">
                <input id="inputTelephone" class="swal2-input" value="${memberToEdit.telefono}" placeholder="Teléfono">
                <input id="inputStart" class="swal2-input" value="${memberToEdit.start}" placeholder="Teléfono">
                <input id="inputEnd" class="swal2-input" value="${memberToEdit.end}" placeholder="Teléfono">
                <select name="" id="membresiaTipo">
                        <option value="Mensual">Mensual</option>
                        <option value="Mensual+cinta">Mensual+cinta</option>
                        <option value="Bimestral">Bimestral</option>
                        <option value="Bimestral+cinta">Bimestral+cinta</option>
                    </select>
            `,
        focusConfirm: false,
        preConfirm: async () => {
            const nameValue = Swal.getPopup().querySelector('#inputUserName').value;
            const dniValue = Swal.getPopup().querySelector('#inputDni').value;
            const telephoneValue = Swal.getPopup().querySelector('#inputTelephone').value;
            const startValue = Swal.getPopup().querySelector('#inputStart').value;
            const endValue = Swal.getPopup().querySelector('#inputEnd').value;
            const membresiaTipoValue = Swal.getPopup().querySelector("#membresiaTipo").value
            const miembroEditado = {
                name: nameValue,
                dni: dniValue,
                telefono: telephoneValue,
                start: startValue,
                end: endValue,
                tipo: membresiaTipoValue
            };
            await miembrosApi.editMember(memberId, miembroEditado);
            renderMembers();
        }
    });
};

const editODeleteMemberFunction = async (event) => {

    const target = event.target;
    if (target.classList.contains("edit-button")) {
        //  obtener el id del miembro con dataset.id
        const memberId = target.closest("tr").dataset.id;
        console.log("Clic en el botón de edición para el miembro con ID:", memberId);
       await editar(memberId);
    };
    if (target.classList.contains("delete-button")) {
        const memberId = target.closest("tr").dataset.id;
        console.log("Clic en el botón de edición para el miembro con ID:", memberId);
       await miembrosApi.deleteMember(memberId);
       renderMembers();
    }
};

const membersTable = document.getElementById("membersTable");
if (membersTable) {
    membersTable.addEventListener("click", editMemberFunction);
}
export default {  editODeleteMemberFunction };