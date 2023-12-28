
import loginHtml from "../elements/login.html";

const login = () => {
    let userValue = loginHtml.user.value;
    let passwordValue = loginHtml.password.value;
    if (userValue === "admin" && passwordValue === "1234") {
        window.location.href = "/src/pages/admin-dashboard.html"
        console.log("Iniciaste sesion");
    } else {
        alert("Usuario y/o contrasenia incorrectos");
    }
}

export default {
    login,
}

