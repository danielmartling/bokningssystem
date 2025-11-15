async function getAllGroups() {
    try {
        const response = await fetch('/api/groups');
        if (!response.ok) throw new Error("Request failed");
        const groups = await response.json();
        return groups;
    } catch (err) {
        console.error(err);
    }
}