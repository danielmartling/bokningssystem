async function getAllActivities() {
    try {
        const response = await fetch('/api/activities');
        if (!response.ok) throw new Error("Request failed");
        const activities = await response.json();
        return activities;
    } catch (err) {
        console.error(err);
    }
}

async function getActivitiesByCategory() {
    try {
        const response = await fetch('/api/activities/byCategory');
        if (!response.ok) throw new Error("Request failed");
        const activities = await response.json();
        return activities;
    } catch (err) {
        console.error(err);
    }
}



export {
    getAllActivities,
    getActivitiesByCategory
}