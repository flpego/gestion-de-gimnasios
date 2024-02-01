
import loginHtml from "../elements/login.html";

const login = () => {
    let userValue = loginHtml.user.value;
    let passwordValue = loginHtml.password.value;
    let checkRememberValue = loginHtml.checkRememberme.checked;
    if (userValue === "admin" && passwordValue === "1234") {
        window.location.href = "/src/pages/admin-dashboard.html"
        console.log("Iniciaste sesion");
        const token = `${userValue+passwordValue}`
        if (checkRememberValue) {
            localStorage.setItem("loginOn", token)
        }
    } else {
        alert("Usuario y/o contrasenia incorrectos");
    }
}
if (loginHtml.formLogin) {
    loginHtml.formLogin.addEventListener("submit", (e) => {
        e.preventDefault();
        login()
    });
}

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

