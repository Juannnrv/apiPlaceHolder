import { addAlbum } from "./module/album.js";
import { addPost } from "./module/posts.js";

let user = parseInt(prompt("Give me the user number"))
let title = prompt("Give me the album title" )
let body = prompt("Give me the short post description")


console.table(await addPost ({

    "userId": user,
    "title": title,

}))

