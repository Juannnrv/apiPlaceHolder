import { addAlbum } from "./module/album.js";
import { addPost } from "./module/posts.js";
import { addUser } from "./module/user.js";

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



console.log(await addUser ({

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

  }))
