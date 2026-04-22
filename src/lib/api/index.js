const BASE_URL = "http://localhost:3001";

//"fetch()" sendet eine HTTP-Anfrage vom Front-End an das Back-End.

 
// Basis-URL des Backends
async function handleResponse(response) {
    if (!response.ok) {
        const error = new Error("Request failed with status " + response.status); // Fehlerobjekt mit Statuscode
        error.response = response; // Originale Antwort mitgeben
        throw error; // Fehler an Aufrufer weitergeben
    }
    return response.json();
}


//  (CRUD)
 
/* GET */
export async function getJSON(url, accessToken = null) {
    const options = {
        method: "GET", // Daten lesen
        headers: {
            "content-type": "application/json", // Datenformat JSON
        },
    };
 
    if (accessToken) {
        options.headers["Authorization"] = `Bearer ${accessToken}`; // Token fuer geschuetzte Anfrage
    }
 
    const response = await fetch(url, options); // Request ans Backend senden
    return handleResponse(response);
}
 
/* POST */
export async function postJSON(url, body = {}, accessToken = null) {
    const options = {
        method: "POST", // Neue Daten erstellen
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(body), // Request-Body in JSON umwandeln
    };
 
    if (accessToken) {
        options.headers["Authorization"] = `Bearer ${accessToken}`; // Token mitsenden
    }
 
    const response = await fetch(url, options); // Request ans Backend senden
    return handleResponse(response);
}
 
/* PUT */
export async function putJSON(url, body = {}, accessToken = null) {
    const options = {
        method: "PUT", // Bestehende Daten aktualisieren
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(body), // Neue Daten als JSON mitsenden
    };
 
    if (accessToken) {
        options.headers["Authorization"] = `Bearer ${accessToken}`; // Token mitsenden
    }
    const response = await fetch(url, options); // Request ans Backen);    
}
 
/* DELETE */
export async function deleteJSON(url, accessToken = null) {
    const options = {
        method: "DELETE", // Daten loeschen
        headers: {
            "content-type": "application/json",
        },
    };
 
    if (accessToken) {
        options.headers["Authorization"] = `Bearer ${accessToken}`; // Token mitsenden
    }
 
    const response = await fetch(url, options); // Request ans Backend senden
    return handleResponse(response);
}
 
export { BASE_URL };