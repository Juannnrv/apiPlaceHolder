import { addAlbum } from "./module/album.js";
import { addPost } from "./module/posts.js";
import { addUser, getUser } from "./module/user.js";
import { addComment } from "./module/comments.js"; 
import { addPhoto } from "./module/photos.js";

let albumId = parseInt(prompt("Please enter the Album Id"));
let title = prompt("Please give the title ");
let url = prompt("Please give the url ");
let thumbnailUrl = prompt("Please enter the thumbnailUrl");

console.table(await addPhoto ({

  "albumId": albumId,
  "title": title,
  "url": url,
  "thumbnailUrl": thumbnailUrl
  
}))
