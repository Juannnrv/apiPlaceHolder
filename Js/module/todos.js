import { getUser } from "./user.js";

// Validar 
const validateTodos = async ({ title, completed, userId }) => {

    if (typeof userId !== "number" || userId === undefined) {
        return { status: 406, message: "Invalid data format: userId must be a number." };
    }   
    let user = await getUser({ userId });
    if (user.status === 404) { 
        return { status: 200, message: "The User doesn't exist" };
    }
    if (typeof title !== "string" || title === undefined) {
        return { status: 406, message: "Invalid data format: title must be a string." };
    }
    if (typeof completed !== "boolean" || completed === undefined) {
        return { status: 406, message: "Invalid data format: completed must be a boolean." };
    }
    return null;

}

//POST
export const addTodos = async ({ title, completed, userId }) => {
    let val = await validateTodos({ title, completed, userId });  
    if (val) { return val; }

    const config = {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ title, completed, userId })  
    }

    let res = await fetch("https://jsonplaceholder.typicode.com/todos", config);
    let data = await res.json();
    return data;
}