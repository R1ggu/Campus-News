import { cache } from "react";
import { cookies } from "next/headers";
import { decodeJwt } from "jose";

/**
 * Prüft, ob eine gültige Session existiert.
 * @returns Ein Session-Objekt mit accessToken und Benutzerdaten bei Erfolg, sonst `null`
 */
// Es wird nur geprüft, ob ein Cookie mit einem Session-accessToken existiert
// und ob dessen Inhalt decodiert werden kann.
// Dadurch kann die Antwort gecacht werden, weil diese Prüfung pro Seiten-Navigation nur einmal nötig ist.
export const verifySession = cache(async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("session")?.value;

    if (!accessToken) return null;

    const claims = decodeJwt(accessToken);
    return {
        accessToken,
        user: {
            id: claims.sub,
            email: claims.email,
            username: claims.username
        },
        //scope: claims.scope.split(" "),     // Gibt den accessToken (für API-Anfragen) und den Scope-Claim (für optimistische Auth-Prüfungen) zurück.
    };
});

/**
 * Erstellt eine Session, indem der angegebene accessToken in einem Cookie gespeichert wird.
 * @param {string} accessToken - Der Session-accessToken
 */
export async function createSession(accessToken) {
    const cookieStore = await cookies();

    // Speichert den Session-accessToken in einem "sicheren" Cookie
    cookieStore.set("session", accessToken, {
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + 60 * 60 * 1000),
        sameSite: "strict",
        path: "/",
    });
}

/**
 * Macht eine bestehende Session ungültig, indem das zugehörige Cookie entfernt wird.
 */
export async function deleteSession() {
    const cookieStore = await cookies();
    cookieStore.delete("session");
}


/**
 * Eine Hilfsfunktion, um ein JWT-Token zu decodieren.
 * @returns Das decodierte Payload-Objekt oder `null` bei einem Fehler
 */
export async function decodeJwtSelfmade(token) {
    try {
        const base64Payload = token.split('.')[1]
        const payload = atob(base64Payload)
        return JSON.parse(payload)
    } catch {
        return null
    }
}
