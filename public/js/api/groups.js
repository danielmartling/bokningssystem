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

async function getGroupsByDay(day) {
    try {
        const response = await fetch(`/api/groups/byday/${day}`);
        if (!response.ok) throw new Error("Request failed");
        const groups = await response.json();
        return groups;
    } catch (err) {
        console.error(err);
    }
}




export {
    getAllGroups, getGroupsByDay
}