
import Swal from "sweetalert2";
import usersApi from "../../api/users.api";
import loginHtml from "../elements/login.html";


const login = async () => {

    const users =await usersApi.getUsers();
    const userValue = loginHtml.user.value;
    const passwordValue = loginHtml.password.value;
    const checkRememberValue = loginHtml.checkRememberme.checked;
    localStorage.setItem("userName", userValue)
    const findUser = users.find(user => user.name === userValue && user.password === passwordValue);
    console.log(findUser);
    if (findUser) {
        window.location.href = "/src/pages/admin-dashboard.html"
        const token = findUser;
        if (checkRememberValue) {
            localStorage.setItem("loginOn", token)
        }

    } else {
        Swal.fire({
            title: "Usuario y/o contrasenia incorrectos",
            icon: "error",
            timer: 1000
        });
        loginHtml.formLogin.reset();
    }
}
if (loginHtml.formLogin) {
    loginHtml.formLogin.addEventListener("submit", (e) => {
        e.preventDefault();
        login()
    });
}
//funcion para saloir
const logOut = () => {
    window.location.href = "/localhost:5173";
    localStorage.clear();
}

const logOutBtn = document.querySelector("[data-logout]");


export default {
    login,
    logOutBtn,
    logOut
}

