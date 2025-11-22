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

import * as groups from "./groups.js";
import * as programDays from "./programDays.js";
import * as users from "./users.js";




window.api = {
    ...groups,
    ...programDays,
    ...users
};
