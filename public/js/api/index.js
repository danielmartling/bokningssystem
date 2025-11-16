/*
 * /public/js/api/index.js
 *
 * Collection of functions for API calls.
 * 
 * How to use:
 * - Include in html header:
 *      <script type="module" src="/js/api/index.js"></script>
 * - For example, do:
 *      group = await api.getGroupByBookingNumber(bookingNumber);
 * 
 */

// import * as groups from "./groups.js";



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


window.api = {
    getAllGroups
};
