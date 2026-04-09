"use server"

import { redirect } from "next/navigation";
import PostsAPI from "@/lib/api/Posts";
import { verifySession } from "@/lib/session";
import { getUsernameAction } from "./userActions";
import { revalidatePath } from "next/cache";

// Standardschema für alle erlaubten Formularfelder
const schema = {
    title: "",
    text: "",
    createdAt: "",
    updatedAt: "",
    userId: "",
    username: "",
}

export async function updatePost(state, formData) {
    // Erstellt ein neues Objekt mit den Standardfeldern
    const fields = { ...schema }

    // Prüft die aktuelle Session des Users
    const session = await verifySession();

    // Formulardaten in das fields-Objekt übernehmen
    // nur erlaubte Keys übernehmen
    for (const [key, value] of formData.entries()) {
        if (key in schema) {
            fields[key] = value;
        }
    }

    let id = state?.id
    try {
        // User-Daten und Änderungszeit setzen
        fields.userId = session.user.id;
        fields.username = await getUsernameAction();
        fields.updatedAt = new Date().toISOString();

        if (id) {
            // Sendet eine PUT-Anfrage, wenn eine ID im Formularstatus vorhanden ist
            await PostsAPI.update(id, fields, session.accessToken);
        } else {
            // Sendet eine POST-Anfrage, wenn keine ID vorhanden ist
            fields.createdAt = new Date().toISOString();
            const result = await PostsAPI.create(fields, session.accessToken);
            id = result.id;
        }
    } catch (error) {
        // Gibt die bisherigen Daten zurück, falls ein Fehler auftritt
        return {
            id: state?.id,
            fields,
            message: "A problem occurred saving your post. Please try again later.",
        };
    }

    // Aktualisiert alle Seiten, die Daten dieses Posts anzeigen
    revalidatePath(`/`, "page");
    revalidatePath(`/posts/${id}`);
    revalidatePath(`/posts/edit/${id}`);

    // Leitet den User auf die Detailseite des Posts weiter
    redirect(`/posts/${id}`);
}

/*
* Löscht einen Post anhand seiner ID.
*/
export async function deletePostAction(id) {
    // Prüft die aktuelle Session des Users
    const session = await verifySession();

    // Löscht den Post mit Zugriffstoken
    await PostsAPI.delete(id, session.accessToken);

    // Aktualisiert die Startseite
    revalidatePath(`/`, "page");

    // Leitet zurück auf die Startseite
    redirect(`/`);
}