import membersHtml from "../elements/members.html.";
import { Member } from "../models/members.model";
import Swal from "sweetalert2";

let allMembers = JSON.parse(localStorage.getItem("data")) || [];
const totalMembersNumber = allMembers.length;

const addNewMember = () => {
    const newMember = new Member(
        membersHtml.inputUserName.value,
        membersHtml.inputTelephone.value,
        membersHtml.inputDni.value,
        membersHtml.membresiaType.value
    );

    console.log(allMembers);
    console.log(newMember);
    Swal.fire({
        title: "Miembro agregado con exito",
        icon: "success",
        timer: 2000,
    })
    saveMemberLocalStorage(newMember);
    actividadReciente()
};
// logica para gurdar en lcoalStorage
const saveMemberLocalStorage = (newMember) => {
    allMembers.push(newMember);
    localStorage.setItem("data", JSON.stringify(allMembers));
    renderMembers(allMembers);
}


const renderMembers = () => {
    const tableRowsHtml = allMembers.map((item) => {
        return `
        <tr data-id="${item.id}">
            <td>${item.name}</td>
            <td>${item.telefono}</td>
            <td>${item.dni}</td>
            <td class="estado-${item.state}" >${item.state ? "Activo" : "Vencido"}</td>
            <td>${item.start}</td>
            <td>${item.end}</td>
            <td>${item.tipo}</td>
            <td>
                <button class="edit-button">Edit</button>
            </td>
        </tr>
        `
    });

    membersHtml.membersTable.innerHTML = tableRowsHtml.join('');
}

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

    renderMembers(allMembers);

};


const capturarId = () => {
    const membersTable = document.getElementById("membersTable"); // capturar el id de la tabla
    membersTable.addEventListener("click", (event) => {

        if (event.target.classList.contains("edit-button")) {
            const memberId = event.target.closest("tr").dataset.id; //obtener el dataatribute con dataset
            console.log("Clic miembro con id:", memberId);
            //funcion para editar
            const editar = (memberId) => {
                const memberToEdit = allMembers.find(member => member.id === memberId);


                console.log(memberToEdit);
                membersHtml.inputUserName.value = memberToEdit.name;
                membersHtml.inputDni.value = memberToEdit.dni;
                membersHtml.inputTelephone.value = memberToEdit.telefono;

            };
            editar(memberId);
        }
    });
}

const actividadReciente = () => {



    const miembrosRecientes = allMembers.slice(0, 5);

    const totalNombresUl = document.createElement("ul");

    miembrosRecientes.forEach((item) => {
        let listaNombresLi = document.createElement("li");
        listaNombresLi.innerHTML = `${item.name} agregado el ${item.start}`;
        listaNombresLi.classList.add("flex-center")
        totalNombresUl.appendChild(listaNombresLi);
    });
    membersHtml.agregadosRecientemente.appendChild(totalNombresUl);
}


export default { renderMembers, capturarId, actividadReciente, totalMembersNumber };

// const searchMember = () => {
//     const inputValue = membersHtml.filterInput.value.toLowerCase();

//     const filteredMembers = allMembers.filter(member => member.name.includes(inputValue));
//     return filteredMembers;
// }

// if (membersHtml.filterInput) {
//     membersHtml.formBuscar.addEventListener("submit", (e) => {
//         e.preventDefault();
//         renderMembers ( searchMember())

//     })
// }

