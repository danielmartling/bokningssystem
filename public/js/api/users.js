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

async function changePassword(userId, newPassword) {
    const response = await fetch(`/api/users/changePassword`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId: userId,
            newPassword: newPassword
        })
    });
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to update password!");
    }
    if (response.status === 204) return { success: true };
    return await response.json();
}

async function updateUser(
    id,
    {
        username,
        displayname,
        active,
        roles
    }
) {
    const response = await fetch(`/api/users/updateUser`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId: id,
            username: username,
            displayname: displayname,
            active: active,
            roles: roles ? roles.map(r => typeof r === "string" ? r : r.role) : []
        })
    });
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to update user!");
    }
    if (response.status === 204) return { success: true };
    return await response.json();
}


export {
    getAllUsers,
    changePassword,
    updateUser
}