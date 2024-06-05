import { getUser } from "./user.js" 

// GET
export const getPost = async({postId}) => {

    let res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)

    if (!res.ok) {
        return { status: 404, message: "Post doesn't exist" };
    }

    let data = await res.json();
    return data;

}

// VALIDAR DATOS
const validatePost = async({userId, title, body}) => {

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
    if (typeof body !== "string" || body === undefined) {
        return { status: 406, message: "Invalid data format: body must be a string." };
    }

} 


// POST
export const addPost = async(arg) => {

    let val = await validatePost(arg);
    if (val) {
        return val;
    }

    const config = {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(arg)
    }
    let res = await fetch ("https://jsonplaceholder.typicode.com/posts", config);
    let data = await res.json();
    return data;

}