
function renderRoles(roles) {
    if (!roles?.length) return "<i>none</i>";
    return `
        <div class="tags">
            ${roles.map(r => `<span class="tag is-${r.role}">${r.role}</span>`).join("")}
        </div>
    `;
}

const roleConfig = {
    base: ["guest", "staff"],
    staff: [
        "program-viewer",
        "program-jour",
        "program-booker",
        "program-admin",
        "fladan"
    ],
    system: ["system-admin"]
};