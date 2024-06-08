import { getPost } from "./posts.js"
import { remoto, local } from "./endopoints.js"

const enlace = local();

// GET
export const getComment = async(commentId) => {

    let res = await fetch(`${enlace.comment}/${commentId}`)

    if (!res.ok) {
        return { status: 404, message: "Comment doesn't exist" };
    }

    let data = await res.json();
    return data;

}

// VALIDAR
const validateComments = async(comment, postId) => {
    const main = [ "name", "body", "email"];

    if (typeof postId !== "number" || isNaN(postId)) {
        return { status: 406, message: "Invalid data format: postId must be a number." };
    }
    let post = await getPost( postId );
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

    let res = await fetch (`${enlace.comment}`, config);
    let data = await res.json();
    alert("Comment added succesfully");
    return data;

}

// DELETE
const validateDeleteComment = async(commentId) => {
    
    if (typeof commentId !== "string" || commentId === undefined) { 
        return { status: 406, message: "Invalid data format: commentId must be a string" };
    }
}

export const deleteComment = async(commentId) => {
    let val = await validateDeleteComment(commentId);
    if (val) return val;

    let config = {
        method: "DELETE",
        headers: {"Content-Type": "application/json"}
    };

    let res = await fetch(`${enlace.comment}/${commentId}`, config);
    if (res.status === 404) {
        return {status: 404, message: "The Comment you want to delete isn't registered in the data" };
    }
    
    let data = await res.json();
    alert("Comment deleted successfully");
    return data;
}


// PATCH 
export const updateComment = async(id) => {
    let comment = await getComment(id);

    if (comment.status === 404) {
        alert(`Error ${comment.status} => Comment not found`);
        return;
    } 
    else {
        const key = Object.keys(comment).filter(key => key !== "id");
        let opciones = key.map((key, value) => `${value + 1}. ${key}`).join("\n");
    
        let opc = prompt(`Available options: \n\n${opciones}\n\nGive me the option:`);

        let newKey = key[opc - 1];
        if (!newKey) return "Unavailable option";

        let newValue = prompt(`Please enter a new value for ${newKey}`);

        if (newKey === "postId") {
            let post = await getPost(newValue);

            if (post.status === 404) {
                alert(`${post.status} => The Post doesn't exist`);
                return;
            } else {
                comment[newKey] = newValue;
            }
        } else {
            comment[newKey] = newValue;
        }

        let config = {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(comment)
        };

        let res = await fetch(`${enlace.comment}/${id}`, config);

        if (!res.ok) {
            alert(`Error ${res.status} => Failed to update comment`);
            return;
        }

        let data = await res.json();
        alert("Comment value updated successfully");
        return data;
    }
};
