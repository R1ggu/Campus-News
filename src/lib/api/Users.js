import { BASE_URL, postJSON, getJSON } from "."

const URL = BASE_URL

/*
 * API für Login, Registrierung und Benutzerdaten
 */

const UsersApi = {
    login(user) {
        return postJSON(`${URL}/login`, user) // Login-Anfrage senden
    },

    register(user) {
        return postJSON(`${URL}/register`, user) // Registrierungs-Anfrage senden
    },

    read(id, accessToken) {
        return getJSON(`${URL}/users/${id}`, accessToken) // Benutzerdaten per ID laden
    }
}

export default UsersApi