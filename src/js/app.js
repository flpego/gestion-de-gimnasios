import "../scss/main.scss";
import membersApi from "../api/miembros.api.js";

import loginHtml from "./elements/login.html.js";
import loginManagers from "./managers/login.manager";
import membersManager from "./managers/members.manager.js";
import tarifasManager from "./managers/tarifas.manager.js";
import renderPagosManager from "./managers/renderPagos.manager.js";


export const app = () => {


    membersApi.getMembers();

    //validacion if para verificar si el formLogin esta presente en el DOM
    if (loginHtml.formLogin) {
        const autenticacionToken = localStorage.getItem("loginOn");
        console.log(autenticacionToken);
        if (autenticacionToken) {
            window.location.href = "/src/pages/admin-dashboard.html";
        }
        loginHtml.formLogin.onsubmit = (e) => {
            e.preventDefault();
            loginManagers.login();
        };
    };
    // validacio  para que las funciones se ejecute solo en este path
    if (window.location.pathname.includes("/src/pages/miembros.html")) {

        membersManager.editODeleteMemberFunction;
        membersManager.fechaHoy()
    };

    if(window.location.pathname.includes("/src/pages/registrar-membresias.html")) {
       tarifasManager.renderTarifas();
    }

    if (window.location.pathname.includes("src/pages/admin-dashboard.html")) {
        
    }

    if (loginManagers.logOutBtn) {
        loginManagers.logOutBtn.addEventListener("click", () => loginManagers.logOut());
    }
    renderPagosManager.renderPagos()
}








