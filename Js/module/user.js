

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

