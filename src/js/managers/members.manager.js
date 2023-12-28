import membersHtml from "../elements/members.html.";

const renderMembers = (data) => {
    const tableRowsHtml = data.map((item) => {
        return `
        <tr ${item.id}>
            <td>${item.name}</td>
            <td>${item.telefono}</td>
            <td>${item.dni}</td>
            <td class="estado-${item.state}" >${item.state}</td>
            <td>${item.inicioMembresia}</td>
            <td>${item.finMembresia}</td>
            <td>${item.tipoMembresia}</td>
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

export default { renderMembers }