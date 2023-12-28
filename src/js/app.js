import "../scss/main.scss";
import { data } from "./data/members-data";

import loginHtml from "./elements/login.html.js";
import loginManagers from "./managers/login.manager";
import membersManager from "./managers/members.manager.js";

export const app = () => {
    if (loginHtml.formLogin) {
        loginHtml.formLogin.onsubmit = (e) => {
            e.preventDefault();
            loginManagers.login()
        }
    }
    membersManager.renderMembers(data)
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