import { getUser } from "./user.js"; 


// Validamos los datos
const validateAlbum = async({ userId, title }) => {

    if (typeof userId !== "number" || userId === undefined) {
        return { status: 406, message: "Invalid data format: userId must be a number." };
    }   
    let user = await getUser({ userId });
    if (user.status === 404) { 
        return { status: 200, message: "The User doesn't exist" };
    }
    if (typeof title !== "string" || title === undefined) {
        return { status: 406, message: "Invalid data format: title must be a string." }; 
    }
    return null;

}

// POST Album 
export const addAlbum = async ({ userId, title }) => {
    let val = await validateAlbum({ userId, title });
    if (val) return val;

    let config = {
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ userId, title }) 
    };

    let res = await fetch("http://172.16.101.146:5802/albums", config);
    let data = await res.json();
    data.status = 201;
    return data;
}

// GET
export const getAlbum = async(albumId) => {

    let res = await fetch(`http://172.16.101.146:5802/albums/${albumId}`)

    if (res.status === 404) {
        return { status: 404, message: "Album doesn't exist" };
    }

    let data = await res.json();
    return data;

}

// PUT
export const updateAlbum = async (id) => {
    
    // Verificar la existencia del álbum con el ID proporcionado
    let album = await getAlbum(id);
    
    // Si el álbum no se encuentra, devolver un mensaje
    if (album.status == 204) return "Álbum not found";
    
    // Crear una lista de opciones disponibles para modificar
    const keys = Object.keys(album).filter(key => key !== 'id');
    let opciones = keys.map((key, value) => `${value + 1}. ${key}`).join('\n');
    
    // Pedir al usuario que elija una opción para modificar
    let opc = prompt(`Available options: \n${opciones}\n Give me the option:`);
    
    let newKey = keys[opc - 1];
    // Si la opción no es válida, devolver un mensaje
    if (!newKey) return "Unavailable option";
    
    // Si el usuario selecciona cambiar el userId
    if (newKey === 'userId') {
        // Pedir al usuario el nuevo valor para userId
        let newUserId = prompt(`Please enter a new value for ${newKey}`);
        
        // Validar si el nuevo userId existe en los datos de usuario
        let user = await getUser(newUserId);
        
        // Si el usuario no existe, mostrar un mensaje de error
        if (user.status === 404) {
            alert("The User doesn't exist");
        }
    }

    // Pedir al usuario que ingrese el nuevo valor para la llave seleccionada
    let newvalue = prompt(`Please enter a new value for ${newKey}`);
    // Actualizar el valor del álbum seleccionado
    album[newKey] = newvalue;

    // Configuración para la solicitud PUT
    let config = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(album)
    };
    
    // Realizar la solicitud PUT para actualizar el álbum
    let res = await fetch(`https://53977d67df4867e88ad92ace77f41d81.serveo.net/albums/${id}`, config);
    let data = await res.json();
    alert("Album value updated succesfully")
    return data;
};




// DELETE 
const validateDeleteAlbum = async({id}) => {

    if (typeof id !== "string" || id === undefined) {
        return { status: 406, message: "Invalid data format: AlbumId must be a number"}
    }

}

export const deleteAlbum = async(arg) => {

    let val = await validateDeleteAlbum(arg);
    if (val) return val;

    let config = {

        method: "DELETE",
        headers: {"content-type": "application/json"},

    }

    let res = await fetch(`http://172.16.101.146:5802/albums/${arg.id}`, config);
    if (res.status === 404) {
        return { status: 404, message: "The Album you want to delete doesn't exist in the data" };
    }

    let data = await res.json();
    data.status = 202
    data.message = `The album ${arg.id} was deleted successfully`
    return data;

}



