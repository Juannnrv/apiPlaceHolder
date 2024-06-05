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