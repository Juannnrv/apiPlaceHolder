
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


export const addUser = async (arg) => {
    let val = validateUsers(arg);
    if (val) { return val; }
    
    const config = {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(arg)
    }
    let res = await fetch("https://jsonplaceholder.typicode.com/users", config);
    let data = await res.json();
    return data;
}

export const getUser = async (arg) => {
    // Validamos el argumento usando la función validateUsers 
    let val = validateUsers(arg);
    // Si la validación devuelve un error, lo retornamos
    if (val) return val;
    
    if (res.status === 404) {
        return { status: 404, message: "User not found" };
    }
}


