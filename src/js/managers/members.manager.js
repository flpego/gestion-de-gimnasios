import { data } from "../data/members-data";
import membersHtml from "../elements/members.html.";
import { Member } from "../models/members.model";

const renderMembers = (data) => {
    const tableRowsHtml = data.map((item) => {
        return `
        <tr id="${item.id}">
            <td>${item.name}</td>
            <td>${item.telefono}</td>
            <td>${item.dni}</td>
            <td class="estado-${item.state}" >${item.state}</td>
            <td>${item.start}</td>
            <td>${item.end}</td>
            <td>${item.tipo}</td>
            <td>
            <button>
                <i class="fa-solid fa-pen-to-square"></i>
            </button>
            </td>
        </tr>
        `
    });
    membersHtml.membersTable.innerHTML = tableRowsHtml.join('');
}



const addNewMember = () => {

    const newMember = new Member(
        membersHtml.inputUserName.value,
        membersHtml.inputTelephone.value,
        membersHtml.inputDni.value
    )
    data.push(newMember)
    console.log(newMember);

    renderMembers(data)
}


//logica para manejar la ventana modal
if (membersHtml.addNewMemberButton) {
    membersHtml.addNewMemberButton.addEventListener("click", () => {
        membersHtml.modalAddMemberDiv.classList.add("show");
    });
}
if (membersHtml.modalAddMemberDiv) {

    window.addEventListener("click", function (event) {
        if (event.target == membersHtml.modalAddMemberDiv) {
            membersHtml.modalAddMemberDiv.classList.remove("show");
        }
    });

    membersHtml.formAddMember.addEventListener("submit", (e) => {
        e.preventDefault();
        addNewMember();

    })
}

export default { renderMembers }