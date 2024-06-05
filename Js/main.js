import { addAlbum } from "./module/album.js";
import { addPost } from "./module/posts.js";
import { addUser, getUser } from "./module/user.js";
import { addComment } from "./module/comments.js"; 

let postId = parseInt(prompt("Please enter the Post ID "));
let name = prompt("Please give the name ");
let email = prompt("Please give the email ");
let body = prompt("Please entere a short description ");

console.table(await addComment ({

  "postId": postId,
  "name": name,
  "email": email,
  "body": body

}))
