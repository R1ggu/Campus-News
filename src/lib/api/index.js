const BASE_URL = "http://localhost:3001";
 
// Zentrale Basis-URL für API-Aufrufe
async function handleResponse(response) {
    if (!response.ok) {
        const error = new Error("Request failed with status " + response.status); // Fehlerobjekt mit Status erstellen
        error.response = response; // Originale Response anhängen
        throw error; // Fehler weitergeben
    }
    return response.json();
}


//  (CRUD)
 
/* GET */
export async function getJSON(url, accessToken = null) {
    const options = {
        method: "GET", // Daten abrufen
        headers: {
            "content-type": "application/json", // JSON als Format
        },
    };
 
    if (accessToken) {
        options.headers["Authorization"] = `Bearer ${accessToken}`; // Token für geschützte Routen
    }
 
    const response = await fetch(url, options); // GET-Request senden
    return handleResponse(response);
}
 
/* POST */
export async function postJSON(url, body = {}, accessToken = null) {
    const options = {
        method: "POST", // Neue Daten senden
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(body), // Objekt in JSON umwandeln
    };
 
    if (accessToken) {
        options.headers["Authorization"] = `Bearer ${accessToken}`; // Token mitsenden
    }
 
    const response = await fetch(url, options); // POST-Request senden
    return handleResponse(response);
}
 
/* PUT */
export async function putJSON(url, body = {}, accessToken = null) {
    const options = {
        method: "PUT", // Bestehende Daten bearbeiten
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(body), // Neue Daten als JSON senden
    };
 
    if (accessToken) {
        options.headers["Authorization"] = `Bearer ${accessToken}`; // Token mitsenden
    }
    const response = await fetch(url, options); // PUT-Request senden
    return handleResponse(response);
}
 
/* DELETE */
export async function deleteJSON(url, accessToken = null) {
    const options = {
        method: "DELETE", // Daten löschen
        headers: {
            "content-type": "application/json",
        },
    };
 
    if (accessToken) {
        options.headers["Authorization"] = `Bearer ${accessToken}`; // Token mitsenden
    }
 
    const response = await fetch(url, options); // DELETE-Request senden
    return handleResponse(response);
}
 
export { BASE_URL };