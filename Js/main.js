import { addAlbum, getAllAlbums } from "./module/album.js";
import { addPost } from "./module/posts.js";

let user = parseInt(prompt("Give me the user number"))
let title = prompt("Give me the album title" )


console.table(await addAlbum ({

    "userId": user,
    "title": title,

}))

