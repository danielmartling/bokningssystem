async function getProgramDay(day) {
    try {
        const response = await fetch(`/api/programday/byday/${day}`);
        if (!response.ok) throw new Error("Request failed");
        const programDay = await response.json();
        return programDay;
    } catch (err) {
        console.error(err);
    }
}

async function saveProgramDay(day, title, message) {
    try {
        const response = await fetch(`/api/programday/byday/${day}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                message
            })
        });
        if (!response.ok) throw new Error("Update failed");
        const updated = await response.json();
        return updated;
    } catch (err) {
        console.error(err);
    }
}




export {
    getProgramDay, saveProgramDay
}