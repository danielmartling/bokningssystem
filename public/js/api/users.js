async function getAllUsers() {
    try {
        const response = await fetch('/api/users');
        if (!response.ok) throw new Error("Request failed");
        const users = await response.json();
        return users;
    } catch (err) {
        console.error(err);
    }
}




export {
    getAllUsers
}