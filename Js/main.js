import { addAlbum } from "./module/album.js";
import { addPost } from "./module/posts.js";
import { addUser } from "./module/user.js";
import { addComment } from "./module/comments.js"; 
import { addPhoto } from "./module/photos.js";
import { addTodos } from "./module/todos.js";

let userId = parseInt(prompt("Please enter the User Id"));
let title = prompt("Please give the title ");
let completedInput = prompt("Please give the completed status (true/false)");

let completed = (completedInput.toLowerCase() === 'true');

console.table(await addTodos ({

  "userId": userId,
  "title": title,
  "completed": completed

}))
