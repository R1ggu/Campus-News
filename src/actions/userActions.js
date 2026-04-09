"use server"

import { z } from "zod"
import UsersApi from "@/lib/api/Users"
import { createSession, verifySession, deleteSession } from "@/lib/session"
import { redirect } from "next/navigation"
import { refresh } from "next/cache"

// Schema für Login
const schema = z.object({
    email: z.string().trim().email("Please complete your email address"),
    password: z.string().trim(),
})

// Schema für Register
const registerSchema = z.object({
    username: z.string().trim().min(1, "Please enter a username"),
    email: z.string().trim().email("Please complete your email address"),
    password: z.string().trim().min(1, "Please enter a password"),
    confirmPassword: z.string().trim().min(1, "Please confirm your password"),
})

/**
* Login function
*/
export async function loginAction(state, formData) {
    const data = Object.fromEntries(formData) // Formulardaten als Objekt speichern
    const fields = schema.safeParse(data) // Login-Daten validieren

    // Passwort nicht an den Client zurückgeben
    delete data.password

    if (!fields.success) {
        return {
            url: state?.url,
            data,
            //flatten = verschachtelte Arrays zusammen (Library).
            errors: fields.error.flatten().fieldErrors, // Validierungsfehler pro Feld
        }
    }

    try {
        const result = await UsersApi.login(fields.data) // Login über API prüfen
        await createSession(result.accessToken) // Session nach Login erstellen
    } catch (error) {
        return {
            url: state?.url,
            data,
            message:
                error.status === 400
                    ? "The email address or password you entered is invalid. Please try again."
                    : "A problem occurred with your login. Please try again later.",
        }
    }

    redirect(state?.url ?? "/profile") // Nach Login weiterleiten
}

/**
* Register function
*/
export async function registerAction(state, formData) {
    const data = Object.fromEntries(formData) // Formulardaten als Objekt speichern
    const fields = registerSchema.safeParse(data) // Register-Daten validieren

    // Passwort-Daten nicht an den Client zurückgeben
    delete data.password
    delete data.confirmPassword

    if (!fields.success) {
        return {
            data,
            // flatten macht aus jedem zeichen in einem 2D Objekt ein einzelnes Zeichen in einer Liste.
            errors: fields.error.flatten().fieldErrors, // Validierungsfehler pro Feld
        }
    }

    // Prüfen ob beide Passwörter gleich sind
    if (fields.data.password !== fields.data.confirmPassword) {
        return {
            data,
            message: "The passwords do not match.",
        }
    }

    //Füllt die Daten vom Registrieren direckt ins Login ein.
    try {
        const result = await UsersApi.register({
            username: fields.data.username,
            email: fields.data.email,
            password: fields.data.password,
        })

        await createSession(result.accessToken) // Nach Registrierung direkt einloggen
    } catch (error) {
        return {
            data,
            message:
                error.status === 400
                    ? "Registration failed. Please check your data."
                    : "A problem occurred with your registration. Please try again later.",
        }
    }

    redirect("/profile") // Nach Registrierung weiterleiten
}

/**
* A server action that handles user logouts.
*/
export async function logoutAction() {
    await deleteSession() // Session löschen = Logout
    refresh();
}

/**
* Get username of the logged in user
*/
export async function getUsernameAction() {
    const session = await verifySession() // Aktive Session prüfen
    const userId = session.user.id // ID des eingeloggten Users holen

    try {
        const data = await UsersApi.read(userId, session.accessToken) // Benutzerdaten laden
        return data.username
    } catch (error) {
        return { message: "A problem occurred with your account. Please try later" }
    }
}

/**
* Get username of user per id
*/
export async function getUsernamePerIdAction(id) {
    const session = await verifySession() // Session für geschützten Zugriff prüfen

    try {
        const data = await UsersApi.read(id, session.accessToken) // Benutzer anhand der ID laden
        return data.username
    } catch (error) {
        return { message: "A problem occurred while reading the username." }
    }
}