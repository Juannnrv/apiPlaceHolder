import { getPost } from "./posts.js"


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