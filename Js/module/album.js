import { getUser } from "./user.js"; 


// Validamos los datos
const validateAlbum = async({ userId, title }) => {

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
    return null;

}

// POST Album 
export const addAlbum = async ({ userId, title }) => {
    let val = await validateAlbum({ userId, title });
    if (val) return val;

    let config = {
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ userId, title }) 
    };

    let res = await fetch("http://172.16.101.146:5802/albums", config);
    let data = await res.json();
    data.status = 201;
    return data;
}

// GET
export const getAlbum = async(albumId) => {

    let res = await fetch(`http://172.16.101.146:5802/albums/${albumId}`)

    if (res.status === 404) {
        return { status: 404, message: "Album doesn't exist" };
    }

    let data = await res.json();
    return data;

}


// DELETE 
const validateDeleteAlbum = async({id}) => {

    if (typeof id !== "string" || id === undefined) {
        return { status: 406, message: "Invalid data format: AlbumId must be a number"}
    }

}

export const deleteAlbum = async(arg) => {

    let val = await validateDeleteAlbum(arg);
    if (val) return val;

    let config = {

        method: "DELETE",
        headers: {"content-type": "application/json"},

    }

    let res = await fetch(`http://172.16.101.146:5802/albums/${arg.id}`, config);
    if (res.status === 404) {
        return { status: 404, message: "The Album you want to delete doesn't exist in the data" };
    }

    let data = await res.json();
    data.status = 202
    data.message = `The album ${arg.id} was deleted successfully`
    return data;

}

