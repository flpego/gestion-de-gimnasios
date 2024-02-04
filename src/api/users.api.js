const getUsers = async () => {
    const res = await fetch("http://localhost:3000/users");
    const data = await res.json();
    return data;
};

const registerUser = async (user) => {
    const res = await fetch("http://localhost:3000/users" , {
        method: "POST",
        body:  JSON.stringify(user),
        headers:{
            "Content-type": "application/json; charset=UTF-8"
        },
    });
    const data = await res.json();
    console.log(data);
    return data;
}

export default {
    getUsers,
    registerUser,
}