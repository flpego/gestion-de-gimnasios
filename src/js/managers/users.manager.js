import { User } from "../models/users.model"
import usersHtml from "../elements/users.html"
import usersApi from "../../api/users.api"
import Swal from "sweetalert2";

const renderUsers = async () => {
    const userList = await usersApi.getUsers();
    usersHtml.userTable.innerHTML = ""
    userList.forEach((user) => {
        const userTr = document.createElement("tr");
        userTr.innerHTML = `
        <td>${user.name}</td>
        <td>${user.privilegios}</td>        
        `
        usersHtml.userTable.appendChild(userTr)
    })
}
if (usersHtml.privilegios) {
    usersHtml.privilegios.addEventListener("change", () => {
        const valorSeleccionado = usersHtml.privilegios.value;
        console.log(valorSeleccionado);
    });
}



const registerUser = async () => {
    const valorSeleccionado = usersHtml.privilegios.value;
    if (valorSeleccionado && usersHtml.password.value === usersHtml.password2.value) {
        const newUser = new User(
            usersHtml.inputUserName.value,
            usersHtml.password.value,
            valorSeleccionado
        );
        await usersApi.registerUser(newUser);
        await renderUsers();

        console.log(newUser);
    } else {
        Swal.fire({
            title: "Las contraseñas no coinciden",
            timer: 1500,
        });
        usersHtml.formRegisterUser.reset();
    }

}
if (usersHtml.btnRegisterUser) {
    usersHtml.btnRegisterUser.addEventListener("click", (e) => {
        e.preventDefault();
        registerUser();
        usersHtml.formRegisterUser.reset();
    });
}

export default {
    renderUsers
}