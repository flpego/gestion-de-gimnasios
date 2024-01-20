import "../scss/main.scss";
import membersApi from "../api/miembros.api.js";

import loginHtml from "./elements/login.html.js";
import loginManagers from "./managers/login.manager";
import membersManager from "./managers/members.manager.js";
import membersHtml from "./elements/members.html..js";
import tarifasManager from "./managers/tarifas.manager.js";

export const app = () => {

    membersApi.getMembers();

    //validacion if para verificar si el formLogin esta presente en el DOM
    if (loginHtml.formLogin) {
        loginHtml.formLogin.onsubmit = (e) => {
            e.preventDefault();
            loginManagers.login();
        };
    };
    // validacio  para que las funciones se ejecute solo en este path
    if (window.location.pathname.includes("/src/pages/miembros.html")) {

        membersManager.editMemberFunction;

    };

    if(window.location.pathname.includes("/src/pages/registrar-membresias.html")) {
        tarifasManager.addNewTarifa()
    }

    if (window.location.pathname.includes("src/pages/admin-dashboard.html")) {


    }

}








