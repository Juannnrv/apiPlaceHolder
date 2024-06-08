import { addAlbum, deleteAlbum, getAlbum, updateAlbum } from "./module/album.js";
import { addPost, deletePost, getPost, updatePost } from "./module/posts.js";
import { addComment, getComment, deleteComment, updateComment } from "./module/comments.js"; 
import { addPhoto, deletePhoto, getPhoto, updatePhoto } from "./module/photos.js";
import { addUser, deleteUser, getUser, updateUser } from "./module/user.js";

let continuar = true;

const menu = async () => {
    let menu = parseInt(prompt(`
-------- MODULES --------  
    1 - Posts 📬
    2 - Comments 📋
    3 - Albums 📚
    4 - Photos 🖼️
    5 - Users 👪
    6 - Exit 👋
    `));

    if (menu === 1) {
        await handlePosts();
    } else if (menu === 2) {
        await handleComments();
    } else if (menu === 3) {
        await handleAlbums();
    } else if (menu === 4) {
        await handlePhotos();
    } else if (menu === 5) {
        await handleUsers();
    } else if (menu === 6) {
        continuar = false;
    } else {
        console.log("Invalid option. Please select a valid option.");
    }
};

const handlePosts = async () => {
    let menuPosts = parseInt(prompt(`
--------- POSTS ---------  
    1 - Add Posts 🚀
    2 - Delete Posts 🚮
    3 - Search Posts 🔍
    4 - Update Posts ✅
    5 - Back to main menu
    `));

    if (menuPosts === 1) {
        let user = parseInt(prompt("Give me the user number"));
        let title = prompt("Give me the album title");
        let body = prompt("Give me the short post description");
        console.table(await addPost({ "userId": user, "title": title, "body": body }));
    } else if (menuPosts === 2) {
        let postId = prompt("Give me the Post Id you want to delete: ");
        console.table(await deletePost({ id: postId }));
    } else if (menuPosts === 3) {
        let postId = prompt("Give me the Post Id you want to search: ");
        console.table(await getPost(postId));
    } else if (menuPosts === 4) {
        let id = prompt("Give me the Post Id you want to update.");
        await updatePost(id);
    } else if (menuPosts === 5) {
        return; 
    } else {
        console.log("Invalid option. Please select a valid option.");
    }
};

const handleComments = async () => {
    let menuComments = parseInt(prompt(`
--------- COMMENTS ---------  
    1 - Add Comments 🚀
    2 - Delete Comments 🚮
    3 - Search Comments 🔍
    4 - Update Comments ✅
    5 - Back to main menu
    `));

    if (menuComments === 1) {
        let postId = parseInt(prompt("Please enter the Post ID "));
        let name = prompt("Please give the name ");
        let email = prompt("Please give the email ");
        let body = prompt("Please enter a short description ");
        console.table(await addComment({ "postId": postId, "name": name, "email": email, "body": body }));
    } else if (menuComments === 2) {
        let commentId = prompt("Give me the Comment Id you want to delete: ");
        console.table(await deleteComment( commentId ));
    } else if (menuComments === 3) {
        let commentId = prompt("Give me the Comment Id you want to search: ");
        console.table(await getComment(commentId));
    } else if (menuComments === 4) {
        let id = prompt("Give the Comment Id you want to update: ");
        await updateComment(id);
    } else if (menuComments === 5) {
        return; 
    } else {
        console.log("Invalid option. Please select a valid option.");
    }
};

const handleAlbums = async () => {
    let menuAlbum = parseInt(prompt(`
--------- ALBUMS ---------  
    1 - Add Album 🚀
    2 - Delete Album 🚮
    3 - Search Album 🔍
    4 - Update Album ✅
    5 - Back to main menu
    `));

    if (menuAlbum === 1) {
        let user = parseInt(prompt("Give me the user number"));
        let title = prompt("Give me the album title");
        console.table(await addAlbum({ "userId": user, "title": title }));
    } else if (menuAlbum === 2) {
        let albumId = prompt("Give me the Album Id you want to delete: ");
        console.table(await deleteAlbum({ id: albumId }));
    } else if (menuAlbum === 3) {
        let albumId = prompt("Give me the Album Id you want to search: ");
        console.table(await getAlbum(albumId));
    } else if (menuAlbum === 4) {
        let id = prompt("Give me the Album Id you want to update.");
        await updateAlbum(id);
    } else if (menuAlbum === 5) {
        return; 
    } else {
        console.log("Invalid option. Please select a valid option.");
    }
};

const handlePhotos = async () => {
    let menuPhotos = parseInt(prompt(`
--------- PHOTOS ---------  
    1 - Add Photos 🚀
    2 - Delete Photos 🚮
    3 - Search Photos 🔍
    4 - Update Photos ✅
    5 - Back to main menu
    `));

    if (menuPhotos === 1) {
        let albumId = parseInt(prompt("Please enter the Album Id"));
        let title = prompt("Please give the title ");
        let url = prompt("Please give the url ");
        let thumbnailUrl = prompt("Please enter the thumbnailUrl");
        console.table(await addPhoto({ "albumId": albumId, "title": title, "url": url, "thumbnailUrl": thumbnailUrl }));
    } else if (menuPhotos === 2) {
        let photoId = prompt("Give me the Photo Id you want to delete: ");
        console.table(await deletePhoto({ id: photoId }));
    } else if (menuPhotos === 3) {
        let photoId = prompt("Give me the Photo Id you want to search: ");
        console.table(await getPhoto(photoId));
    } else if (menuPhotos === 4) {
        let id = prompt("Give me the Photo Id you want to update ");
        await updatePhoto(id);
    } else if (menuPhotos === 5) {
        return; 
    } else {
        console.log("Invalid option. Please select a valid option.");
    }
};

const handleUsers = async () => {
    let menuUsers = parseInt(prompt(`
--------- USERS ---------  
    1 - Add Users 🚀
    2 - Delete Users 🚮
    3 - Search Users 🔍
    4 - Update Users ✅
    5 - Back to main menu
    `));

    if (menuUsers === 1) {
        let name = prompt("Please enter the name ");
        let username = prompt("Please give the user name ");
        let email = prompt("Please give the email ");
        let street = prompt("Please give the street name ");
        let suite = prompt("Please enter the suite number ");
        let city = prompt("Please give the city name ");
        let zipcode = prompt("Please enter the zipcode ");
        let lat = prompt("Please give the latitude ");
        let lng = prompt("Please enter the longitude ");
        let phone = prompt("Please give the phone number ");
        let website = prompt("Please enter the website URL ");
        let namecompany = prompt("Please enter the company name ");
        let catchPhrase = prompt("Please give the catch phrase ");
        let bs = prompt("Please enter the business strategy ");

        console.table(await addUser({
            "name": name,
            "username": username,
            "email": email,
            "address": {
                "street": street,
                "suite": suite,
                "city": city,
                "zipcode": zipcode,
                "geo": { 
                    "lat": lat, 
                    "lng": lng 
                }
            },
            "phone": phone,
            "website": website,
            "company": { 
                "name": namecompany, 
                "catchPhrase": catchPhrase, 
                "bs": bs 
            }
        }));
    } else if (menuUsers === 2) {
        let userId = prompt("Give me the User Id you want to delete: ");
        console.table(await deleteUser({ id: userId }));
    } else if (menuUsers === 3) {
        let userId = prompt("Give me the User Id you want to search: ");
        console.table(await getUser(userId));
    } else if (menuUsers === 4) {
        let id = prompt("Give me the User Id you want to update: ");
        await updateUser(id);
    } else if (menuUsers === 5) {
        return; 
    } else {
        console.log("Invalid option. Please select a valid option.");
    }
};

(async () => {
    while (continuar) {
        await menu();
    }
})();
