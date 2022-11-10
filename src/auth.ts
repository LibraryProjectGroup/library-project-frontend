import BACKENDURL from "./backendUrl";
const SESSION_SECRET_KEY = "session-secret";
const SESSION_END_KEY = "session-length";
const SESSION_LENGTH = 60 * 60 * 24 * 7;

async function authFetch(
    path: RequestInfo | URL,
    options?: RequestInit | undefined
) {
    if (!options) options = {};
    options.headers = {
        ...options.headers,
        Authorization: `Bearer ${window.localStorage.getItem(
            SESSION_SECRET_KEY
        )}`
    };
    let res = await fetch(`${BACKENDURL}${path}`, options);
    if(res.status == 401) {
        window.localStorage.removeItem(SESSION_SECRET_KEY);
        window.localStorage.removeItem(SESSION_END_KEY);
    }
    return await res.json();
}

function setSession(secret: string) {
    window.localStorage.setItem(SESSION_SECRET_KEY, secret);
    window.localStorage.setItem(
        SESSION_END_KEY,
        (new Date().getSeconds() + SESSION_LENGTH).toString()
    );
}

function endSession() {
    authFetch("/auth/logout", {
        method: "POST"
    });
    window.localStorage.removeItem(SESSION_SECRET_KEY);
}

function isAuthenticated() {
    return (
        window.localStorage.getItem(SESSION_SECRET_KEY) !== null &&
        Number(window.localStorage.getItem(SESSION_END_KEY)) >
            new Date().getSeconds()
    );
}

export { authFetch, setSession, endSession, isAuthenticated };
