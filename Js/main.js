import { addAlbum, deleteAlbum, getAlbum } from "./module/album.js";
import { addPost } from "./module/posts.js";
import { addUser } from "./module/user.js";
import { addComment } from "./module/comments.js"; 
import { addPhoto } from "./module/photos.js";
import { addTodos } from "./module/todos.js";

let menuAlbums = async() => {

  let menu = parseInt(prompt(`

-------- MODULES --------  

  1 - Posts
  2 - Comments
  3 - Albums
  4 - Photos
  5 - Users

  `))

  if(menu === 3) {

    let menuAlbum = parseInt(prompt(`

--------- ALBUMS ---------  

  1 - Add Album
  2 - Delete Album
  3 - Search ALbum
  4 - Back to main menu

  `))
  
  if (menuAlbum === 1) {

    let user = parseInt(prompt("Give me the user number"))
    let title = prompt("Give me the album title" )

    console.table(await addAlbum({

      "userId": user,
      "title": title

    }));

  }
  else if (menuAlbum === 2) {

    let albumId = prompt("Give me the Album Id you want to delete: ")
    console.table(await deleteAlbum(albumId));

  }
  else if (menuAlbum === 3) {
    let albumId = prompt("Give me the Album Id you want to search: ")
    console.table(await getAlbum(albumId));
  }

  }

}

menuAlbums();