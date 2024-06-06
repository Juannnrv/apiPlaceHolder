import { getAlbum } from "./album.js";

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
    
    let res = await fetch ("http://172.16.101.146:5803/photos", config);
    let data = await res.json();
    return data;

}

// GET
export const getPhoto = async(photoId) => {

    let res = await fetch(`http://172.16.101.146:5803/photos/${photoId}`);

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

    let res = await fetch(`http://172.16.101.146:5803/photos/${arg.id}`, config);
    if (res.status === 404) {
        return { status: 404, message: "The photo you want to delete doesn't exist in the data" };
    }

    let data = await res.json();
    data.status = 202
    data.message = `The photo ${arg.id} was deleted successfully`
    return data;

}
