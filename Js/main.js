import { addAlbum, deleteAlbum, getAlbum } from "./module/album.js";
import { addPost, deletePosts, getPost } from "./module/posts.js";
import { addComment, getComment, deleteComment } from "./module/comments.js"; 
import { addUser } from "./module/user.js";
import { addPhoto } from "./module/photos.js";
import { addTodos } from "./module/todos.js";

let menuAlbums = async() => {

  let menu = parseInt(prompt(`

-------- MODULES --------  

  1 - Posts 📬
  2 - Comments 📋
  3 - Albums 📚
  4 - Photos 🖼️
  5 - Users 👪

  `))
  if (menu === 1) {

    let menuPosts = parseInt(prompt(`

--------- POSTS ---------  

  1 - Add Posts 🚀
  2 - Delete Posts 🚮
  3 - Search Posts 🔍
  4 - Back to main menu

  `))
  if (menuPosts === 1) {

    let user = parseInt(prompt("Give me the user number"))
    let title = prompt("Give me the album title" )
    let body = prompt("Give me the short post description")

    console.table( await addPost({

      "userId": user,
      "title": title,
      "body": body

    }) )

  }
  else if (menuPosts === 2) {

    let postId = prompt("Indicate the Post Id you want to delete");
    console.table( await deletePosts(postId));

  }
  else if (menuPosts === 3) {

    let postId = prompt("Give me the Album Id you want to search: ")
    console.table(await getPost(postId));

  }

  }
  
  // COMMENTS
  else if(menu === 2) {

    let menuComments = parseInt(prompt(`

--------- COMMENTS ---------  

  1 - Add Comments 🚀
  2 - Delete Comments 🚮
  3 - Search Comments 🔍
  4 - Back to main menu

  `))
  
  if (menuComments === 1) {

    let postId = parseInt(prompt("Please enter the Post ID "));
    let name = prompt("Please give the name ");
    let email = prompt("Please give the email ");
    let body = prompt("Please enter a short description ");

    console.table(await addComment ({

      "postId": postId,
      "name": name,
      "email": email,
      "body": body

    }))

  }
  else if (menuComments === 2) {

    let CommentId = prompt("Give me the Comment Id you want to delete: ")
    console.table(await deleteComment(CommentId));

  }
  else if (menuComments === 3) {
    
    let CommentId = prompt("Give me the Comment Id you want to search: ")
    console.table(await getComment(CommentId));

  }

  }



  // ALBUMS
  else if(menu === 3) {

    let menuAlbum = parseInt(prompt(`

--------- ALBUMS ---------  

  1 - Add Album 🚀
  2 - Delete Album 🚮
  3 - Search ALbum 🔍
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