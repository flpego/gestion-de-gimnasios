const formRegisterUser = document.querySelector("[data-register-user]");
const inputUserName = document.querySelector("#username");
const privilegios = document.querySelector("[data-register-select]")
const btnRegisterUser = document.querySelector("[data-register-user-btn]");
const userTable = document.querySelector("[data-users-table-body]")
//password
const password = document.querySelector("[data-input-password]");
const password2 = document.querySelector("[data-input-password2]");

export default {
    formRegisterUser,
    inputUserName,
    privilegios,
    btnRegisterUser,
    userTable,
    password,
    password2
}