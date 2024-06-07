

// VALIDACIONES
const validateUsers = (user) => {
    const main = ['name', 'username', 'email', 'phone', 'website'];
    const addres = ['street', 'suite', 'city', 'zipcode'];
    const geo = ['lat', 'lng'];
    const company = ['name', 'catchPhrase', 'bs'];

    for (const field of main) { 
        if (typeof user[field] !== 'string' || user[field] === undefined) {
            return { status: 406, message: `Invalid data format: '${field}' must be a string.` };
        }
    }

    // Addres
    if (typeof user.address !== 'object' || user.address === undefined) {
        return { status: 406, message: "Invalid data format: 'address' must be an object." };
    }
    for (const field of addres) {
        if (typeof user.address[field] !== 'string' || user.address[field] === undefined) {
            return { status: 406, message: `Invalid data format: 'address.${field}' must be a string.` };
        }
    }

    // Geo dentro de Addres
    if (typeof user.address.geo !== 'object' || user.address.geo === undefined) {
        return { status: 406, message: "Invalid data format: 'geo' must be an object." };
    }
    for (const field of geo) {
        if (typeof user.address.geo[field] !== 'string' || user.address.geo[field] === undefined) {
            return { status: 406, message: `Invalid data format: 'geo.${field}' must be a string.` };
        }
    }

    // Company
    if (typeof user.company !== 'object' || user.company === undefined) {
        return { status: 406, message: "Invalid data format: 'company' must be an object." };
    }
    for (const field of company) {
        if (typeof user.company[field] !== 'string' || user.company[field] === undefined) {
            return { status: 406, message: `Invalid data format: 'company.${field}' must be a string.` };
        }
    }

    // Si todo está bien, devolvemos null indicando que no hay errores
    return null;
}

// POST
export const addUser = async (arg) => {
    let val = validateUsers(arg);
    if (val) { return val; }

    const config = {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(arg)
    }
    let res = await fetch("http://172.16.101.146:5804/users", config);
    let data = await res.json();
    return data;
}

// GET 
export const getUser = async (userId) => {

        
    let res = await fetch(`http://172.16.101.146:5804/users/${userId}`);
    
    if (res.status === 404) {
        return { status: 404, message: "User not found" };
    }

    let data = await res.json();
    return data;
}

// DELETE
export const validateDeleteUser = async({id}) => {

    if (typeof id !== "string" || id === undefined) {
        return { status: 406, message: "Invalid data format: 'Userid' must be a string"}
    }
    
}

export const deleteUser = async (arg) => {
    
    alert(typeof arg)
    let val = await validateDeleteUser(arg);
    if (val) { return val; }

    let config = {

        method: "DELETE",
        headers: { "content-type": "application/json" }

    }

    let res = await fetch(`http://172.16.101.146:5804/users/${arg.id}`, config)
    if (res.status === 404) {
        return { status: 404, message: "User not found" };
    }

    let data = await res.json()
    data.status = 202
    data.message = `The User ${arg.id} was deleted successfully`
    return data;
}

// PUT
export const updateUser = async (id) => {
    
        // Obtener el usuario por ID
        let user = await getUser(id);

        // Verificar si el usuario no existe
        if (user.status == 204) return "User not found";

        // Para que se vea mas bonito en el prompt, que no aparezaca (addres.street => street)
        const optionMap = {
            "name": "name",
            "username": "username",
            "email": "email",
            "street": "address.street",
            "suite": "address.suite",
            "city": "address.city",
            "zipcode": "address.zipcode",
            "lat": "address.geo.lat",
            "lng": "address.geo.lng",
            "phone": "phone",
            "website": "website",
            "company name": "company.name",
            "catch phrase": "company.catchPhrase",
            "bs": "company.bs"
        };

        const options = Object.keys(optionMap); // Traer todas las keys de optionMap

        // Generar el mensaje de opciones
        let opciones = options.map((key, value) => `${value + 1}. ${key}`).join("\n"); // value + 1 es para imprimir formato numerico como 1. name etc... y al frente la key

        // Pedir al usuario que seleccione una opción
        let opc = prompt(`Available options: \n${opciones}\n \n Give me the option:`);

        // Validar la opción seleccionada
        let selectedKey = options[opc - 1]; // obtener el indice del array restando 1 para que si elije 1 sea 0 
        if (!selectedKey) return "Unavailable option";

        // Pedir al usuario el nuevo valor
        let newValue = prompt(`Please enter a new value for ${selectedKey}`);

        // Función para establecer el nuevo valor en la propiedad anidada
        const setNestedValue = (object, path, value) => {

            // 1. Dividir la ruta en partes usando split
            const keys = path.split('.'); // Ejemplo: "address.geo.lat" -> ["address", "geo", "lat"]
            let currentObject = object;
        
            // 3. Recorre todas las partes de la ruta excepto la última
            while (keys.length > 1) {
                const key = keys.shift(); // 3.1. Toma el primer indice del array y lo elmina, por ejemplo eliminaria addres
        
                // 3.2. Si la clave no existe, crea un objeto vacío
                if (!currentObject[key]) {
                    currentObject[key] = {};
                }
        
                // 3.3. Profundiza en el objeto
                currentObject = currentObject[key];
            }
        
            // 4. Establece el nuevo valor en la última clave de la ruta
            const finalKey = keys[0]; // al haber sido elminado por shift el primer elemento, por ejemplo ["addres", "street"] solo queda => [street]
            currentObject[finalKey] = value;
        };

        // Actualizar el valor seleccionado usando el mapeo
        setNestedValue(user, optionMap[selectedKey], newValue);

        // Configurar la solicitud PUT
        let config = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        };

        // Enviar la solicitud PUT
        let res = await fetch(`http://172.16.101.146:5804/users/${id}`, config);
        let data = await res.json();

        // Notificar al usuario
        alert("User value updated successfully");
        return data;
};


