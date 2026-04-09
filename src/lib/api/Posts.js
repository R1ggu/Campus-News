import { BASE_URL, getJSON, postJSON, putJSON, deleteJSON } from "."

const URL = `${BASE_URL}/posts`

/*
* API für alle Post-Funktionen (CRUD)
*/
const PostsAPI = {
    readAll() {
        return getJSON(`${URL}?_sort=-createdAt`) // Alle Posts laden, neueste zuerst
    },
    getPostById(id) {
        return getJSON(`${URL}/${id}`) // Einzelnen Post per ID laden
    },
    create(post, accessToken) {
        return postJSON(URL, post, accessToken) // Neuen Post erstellen
    },

    update(id, post, accessToken) {
        return putJSON(`${URL}/${id}`, post, accessToken) // Bestehenden Post bearbeiten
    },

    delete(id, accessToken) {
        try {
            return deleteJSON(`${URL}/${id}`, accessToken) // Post per ID löschen
        } catch (error) {
            console.error("Error deleting post:", error)
            return null
        }
    }
}
export default PostsAPI