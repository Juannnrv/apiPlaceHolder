import { getPost } from "./posts.js"

// GET
export const getComment = async(commentId) => {

    let res = await fetch(`http://172.16.101.146:5801/comments/${commentId}`)

    if (!res.ok) {
        return { status: 404, message: "Comment doesn't exist" };
    }

    let data = await res.json();
    return data;

}

// VALIDAR
const validateComments = async(comment, postId) => {
    const main = [ "name", "body", "email"];

    if (typeof postId !== "number" || postId === undefined) {
        return { status: 406, message: "Invalid data format: postId must be a number." };
    }
    let post = await getPost({ postId });
    if (post.status === 404) {
        return { status: 200, message: "The Post doesn't exist" };
    }

    for (const input of main) {
        
        if (typeof comment[input] !== "string" || comment[input] === undefined ) {
            return { status: 406, message: `Invalid data format: '${input}' must be a string.` };
        }

    }
    return null;
}

// POST 
export const addComment = async(arg) => {

    let val = await validateComments(arg, arg.postId);
    if (val) {return val};

    const config = {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(arg)
    }

    let res = await fetch ("http://172.16.101.146:5801/comments", config);
    let data = await res.json();
    return data;

}

// DELETE
const validateDeleteComment = async(commentId) => {

    if (typeof commentId !== "string" || commentId  === undefined) { 
        return { status: 406, message: "Invalid data format: commentId must be a string" };
    }
    return null;

}

export const deleteComment = async(commentId) => {

    let val = await validateDeleteComment(commentId);
    if(val) {return val};

    let config = {

        method: "DELETE",
        headers: {"Content-Type": "application/json"}
        
    };

    let res = await fetch(`http://172.16.101.146:5801/comments/${commentId}`, config);
    if (res.status === 404) {
        return {status: 404, message: "The Comment you want to delete isn't registered in the data" };
    }
    let data;
    if (res.status === 200 || res.status === 202) {
        data = await res.json();
        data.status = 202;
        data.message = `The Album ${commentId} was deleted successfully from the database`;
    }

    return data;

}

// PUT 
export const updateComment = async(id) => {

    let comment = await getComment(id);
    if (comment.status == 204) return "Comment not found";

    const key = Object.keys(comment).filter(key => key !== "id");
    let opciones = key.map((key, value) => `${value + 1}. ${key}`).join("\n");

    let opc = prompt(`Available options: \n${opciones}\n  Give me the option:`);
    
    let newKey = key[opc - 1];
    if (!newKey) return "Unavailable option";

    let newvalue = prompt(`Please enter a new value for ${newKey}`);
    comment[newKey] = newvalue;

    let config = {

        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(comment)

    }

    let res = await fetch(`http://172.16.101.146:5801/Comments/${id}`, config);
    let data = await res.json();
    alert("Comment value updated succesfully");
    return data;
}