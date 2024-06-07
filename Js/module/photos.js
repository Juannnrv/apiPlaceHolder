import { getAlbum } from "./album.js";
import { remoto, local } from "./endopoints.js"
import { getUser } from "./user.js";

const enlace = local();

// Validaciones 
const validatePhoto = async(photo, albumId) => {
    
    const main = ["title", "url", "thumbnailUrl"];
    
    if (typeof albumId !== "number" || albumId === undefined) {
        return { status: 406, message: "Invalid data format: userId must be a number." };
    }
    let album = await getAlbum(albumId);
    if (album.status == 404) { 
        return {status: 404, message: "The Album id doesn't exist"}; 
    } 
    
    for (const input of main) {
        
        if (typeof photo[input] !== "string" || photo[input] === undefined) {
            return { status: 406, message: `Invalid data format: '${input}' must be a string.` };
        }

    }
}

// POST
export const addPhoto = async(arg) => {
    
    let val = await validatePhoto(arg, arg.albumId);
    if (val) {return val};
    
    const config = {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(arg)
    }
    
    let res = await fetch (`${enlace.photo}`, config);
    let data = await res.json();
    alert("Photo added succesfully");
    return data;

}

// GET
export const getPhoto = async(photoId) => {

    let res = await fetch(`${enlace.photo}/${photoId}`);

    if (res.status === 404) {
        return { status: 404, message: "Photo doesn't exist" };
    }

    let data = await res.json();
    return data;

}

// DELETE 
const validateDeletePhoto = async({id}) => {

    if (typeof id !== "string" || id === undefined) {
        return { status: 406, message: "Invalid data format: photoId must be a number"}
    }

}

export const deletePhoto = async(arg) => {

    let val = await validateDeletePhoto(arg);
    if (val) return val;

    let config = {

        method: "DELETE",
        headers: {"content-type": "application/json"},

    }

    let res = await fetch(`${enlace.photo}/${arg.id}`, config);
    if (res.status === 404) {
        return { status: 404, message: "The photo you want to delete doesn't exist in the data" };
    }

    let data = await res.json();
    alert("Photo deleted succesfully");
    return data;

}

// PATCH
export const updatePhoto = async(id) => {

    let photo = await getPhoto(id);
    if (photo.status === 204) return "Photo not found";

    const key = Object.keys(photo).filter(key => key !== "id");
    let opciones = key.map((key, value) => `${value + 1}. ${key}`).join("\n");

    let opc = prompt(`Available options: \n\n${opciones}\n\n  Give me the option:`);
    
    let newKey = key[opc - 1];
    if (!newKey) return "Unavailable option";

    if (newKey === "userId") {

        let userId = prompt(`Please enter the new value for ${newKey}`);
        let user = await getUser(userId);
        
        if (user === 404) {
            alert(`Error ${user.status} => User doesn't exist`)
            return;
        }
        else {
            user[newKey] = userId
        }

    }
    else {
        let newvalue = prompt(`Please enter the new value for ${newKey}`);
        photo[newKey] = newvalue
    }

    let config = {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(photo)
    }

    let res = await fetch(`${enlace.photo}/${id}`, config);
    let data = await res.json();
    alert("Photo value updated succesfully");
    return data;
}

