async function getMe() {
    try {
        const response = await fetch('/api/me');
        if (!response.ok) throw new Error("Request failed");
        const me = await response.json();
        return me;
    } catch (err) {
        console.error(err);
    }
}

async function updateDisplayname(displayname) {
    try {
        const response = await fetch(`/api/me/updateDisplayname`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                displayname
            })
        });
        if (!response.ok) throw new Error("Update failed");
        const updated = await response.json();
        return updated;
    } catch (err) {
        console.error(err);
    }
}

async function updatePassword(oldPassword, newPassword) {
    const response = await fetch(`/api/me/updatePassword`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            oldPassword: oldPassword,
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

export {
    getMe,
    updateDisplayname,
    updatePassword
}