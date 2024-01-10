import "../scss/main.scss";
import Swal from "sweetalert2";

import loginHtml from "./elements/login.html.js";
import membersHtml from "./elements/members.html..js";
import loginManagers from "./managers/login.manager";
import membersManager from "./managers/members.manager.js";

export const app = () => {

    if (window.location.pathname.includes("index.html")) {

        Swal.fire({
            title: "Para ingresar a la app",
            text: "Usuario: admin || Contraseña: 1234",
            icon: "success",
        })

    };


    //validacion if para verificar si el formLogin esta presente en el DOM
    if (loginHtml.formLogin) {
        loginHtml.formLogin.onsubmit = (e) => {
            e.preventDefault();
            loginManagers.login();
        };
    };
    // validacio  para que las funciones se ejecute solo en este path
    if (window.location.pathname.includes("/src/pages/miembros.html")) {

        membersManager.renderMembers();
        membersManager.capturarId();

    };

    if (window.location.pathname.includes("src/pages/admin-dashboard.html")) {
        membersHtml.totalMembers.innerHTML = `
        <ul>
            <li id="totalMembers">${membersManager.totalMembersNumber}</li>
        </ul>
        `;

        membersManager.actividadReciente();
    }

}








// <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.8.0/chart.min.js" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

// <script>
//   const ctx = document.getElementById("myChart");

//   new Chart(ctx, {
//     type: "line",
//     data: {
//       labels: ["septiembre", "octubre", "noviembre", "diciembre", "enero"],
//       datasets: [
//         {
//           label: "Cantidad de membresias por mes",
//           data: [20, 19, 30, 24, 12],
//           borderWidth: 1,
//         },
//       ],
//     },
//     options: {
//       scales: {
//         y: {
//           beginAtZero: true,
//         },
//       },
//     },
//   });
// </script>