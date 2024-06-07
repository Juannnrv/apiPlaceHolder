import { getUser } from "./user.js" 

// GET
export const getPost = async(postId) => {

    let res = await fetch(`http://172.16.101.146:5800/posts/${postId}`)

    if (res.status === 404) {
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
    let res = await fetch ("http://172.16.101.146:5800/posts", config);
    let data = await res.json();
    return data;

}

// DELETE
const validateDeletePosts = async({id}) => {

    if (typeof id !== "string" || id  === undefined) { 
        return { status: 406, message: "Invalid data format: postId must be a string" };
    }

}

export const deletePost = async (arg) => {

    let val = await validateDeletePosts(arg);
    if (val) return val;

    let config = {

        method: "DELETE",
        headers: { "Content-Type": "application/json" }

    }

    let res = await fetch(`http://172.16.101.146:5800/posts/${arg.id}`, config);
    if (res.status === 404) {
        return { status: 404, message: "The Post you want to delete isn't registered in the data" };
    }

    let data = await res.json();
    data.status = 202;
    data.message = `The Post ${arg.id} was deleted successfully from the database`;
    return data;

}

// PUT 
export const updatePost = async(id) => {

    let post = await getPost(id);
    if (post.status == 204) return "Post not found";

    const key = Object.keys(post).filter(key => key !== "id");
    let opciones = key.map((key, value) => `${value + 1}. ${key}`).join("\n");

    let opc = prompt(`Available options: \n${opciones}\n Give me the option:`);
    
    let newKey = key[opc - 1];
    if (!newKey) return "Unavailable option";

    if (newKey === "userId") {

        let newUserId = prompt(`Please enter a new value for ${newKey}`);
        let user = await getUser(newUserId);

        if (user.status === 404) {
            alert("The User doesn't exist")
        }

    }

    let newvalue = prompt(`Please enter a new value for ${newKey}`);
    post[newKey] = newvalue;

    let config = {

        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(post)

    }

    let res = await fetch(`http://172.16.101.146:5800/posts/${id}`, config);
    let data = await res.json();
    alert("Post value updated succesfully");
    return data;
}
