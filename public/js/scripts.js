function burgerButton(self) {
    const $self = document.getElementById(self)
    const target = "navMenu";
    const $target = document.getElementById(target);

    $self.classList.toggle('is-active');
    $target.classList.toggle('is-active');
}

function initHTML() {

    $("#notification-container").load("/templates/notifications.html", function () {
        const message = new URLSearchParams(window.location.search).get("message");
        if (message == "login") {
            showSuccess("You are logged in!");
        } else if (message == "newuser") {
            showSuccess("New user created!");
        };
    });

    $("#common-footer").load("/templates/footer.html");

    $("#common-staff-navbar").load("/templates/nav_staff.html", function () {
        usernameDisplay = document.getElementById("username-display");
        if (usernameDisplay) {
            // fetch('/api/me')
            //     .then(res => {
            //         if (!res.ok) throw new Error("Not logged in");
            //         return res.json();
            //     })
            //     .then(user => {
            //         usernameDisplay.innerHTML = `<span class="iconify navbar-icon" data-icon="mdi-user"></span>&nbsp;Me: <i>${user.displayname}</i>`;
            //     })
            //     .catch(err => {
            //         console.error(err);
            //     });
        }

        if (window.innerWidth <= 1024) {
            document.querySelectorAll('.dropdown-caret').forEach(function (caret) {
                caret.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    var parent = caret.closest('.has-dropdown');
                    if (parent) {
                        parent.classList.toggle('is-active');
                    }
                });
            });

            document.addEventListener('click', function (e) {
                const navMenu = document.getElementById('navMenu');
                const burger = document.getElementById('navbar-burger');

                if (navMenu && navMenu.classList.contains('is-active') &&
                    !e.target.closest('#navMenu') &&
                    !e.target.closest('#navbar-burger')) {

                    navMenu.classList.remove('is-active');
                    if (burger) {
                        burger.classList.remove('is-active');
                    }

                    document.querySelectorAll('.has-dropdown.is-active').forEach(function (dropdown) {
                        dropdown.classList.remove('is-active');
                    });
                }
            });
        }
    });

    $("#common-guest-navbar").load("/templates/nav_guest.html", function () {
        groupDisplay = document.getElementById("group-display");
        if (groupDisplay) {
            fetch('/api/me')
                .then(res => {
                    if (!res.ok) throw new Error("Not logged in");
                    return res.json();
                })
                .then(user => {
                    groupDisplay.innerHTML = `<span class="iconify" data-icon="mdi-user"></span>&nbsp;${user.username}: <i>${user.displayname}</i>`;
                })
                .catch(err => {
                    console.error(err);
                });
        }
    });
}

function logout() {
    fetch('/api/logout', { method: 'POST', credentials: 'include' })
        .then(res => {
            if (!res.ok) throw new Error('Logout failed');
            return res.json();
        })
        .then(() => {
            window.location.href = '/login.html?message=logout';
        }).catch(err => {
            console.error(err);
            window.location.href = '/login.html?message=logout';
        });
}

function showWarning(message) {
    const box = document.getElementById('warning-box');
    const msg = document.getElementById('warning-message');
    msg.innerHTML = message;
    box.classList.remove('is-hidden');
}

function hideWarning() {
    document.getElementById('warning-box').classList.add('is-hidden');
}

function showSuccess(message) {
    const box = document.getElementById('success-box');
    const msg = document.getElementById('success-message');
    box.classList.remove('is-hidden');
    msg.innerHTML = message;
}

function hideSuccess() {
    document.getElementById('success-box').classList.add('is-hidden');
}

function showMessage(message) {
    const box = document.getElementById('message-box');
    const msg = document.getElementById('message-message');
    msg.innerHTML = message;
    box.classList.remove('is-hidden');
}

function hideMessage() {
    document.getElementById('message-box').classList.add('is-hidden');
}

function debounce(func, delay = 300) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
    };
}
