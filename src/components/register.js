"use client";

import Link from "next/link";
import { useActionState } from "react";
import { registerAction } from "@/actions/userActions";
import styles from "./register.module.css";

export default function Register() {

    // state enthält Fehler, Meldungen und alte Eingaben
    // action wird beim Absenden des Formulars ausgeführt
    // pending ist true, solange das Formular gesendet wird
    const [state, action, pending] = useActionState(registerAction, {});

    return (
        // Äusserer Container mit CSS aus register.module.css
        <div className={styles["form-container-styling"]}>
            {/* Formular ruft beim Absenden registerAction aus userActions.js auf */}
            <form action={action} noValidate>
                <h1 className={styles.title}>Registrieren</h1>

                <div>
                    <label htmlFor="username">Username</label>

                    {/* Username-Eingabe
                       defaultValue übernimmt den alten Wert aus state,
                       falls die Registrierung fehlschlägt */}
                    <input
                        id="username"
                        name="username"
                        type="text"
                        defaultValue={state?.data?.username}
                        required
                    />

                    {/* Fehlermeldung aus userActions.js anzeigen */}
                    {state?.errors?.username && <p>{state.errors.username}</p>}
                </div>

                <div>
                    {/* Beschriftung für das E-Mail-Feld */}
                    <label htmlFor="email">Email address</label>

                    {/* E-Mail-Eingabe
                       alter Wert bleibt bei Fehler erhalten */}
                    <input
                        id="email"
                        name="email"
                        type="email"
                        defaultValue={state?.data?.email}
                        required
                    />

                    {/* Fehlermeldung aus userActions.js anzeigen */}
                    {state?.errors?.email && <p>{state.errors.email}</p>}
                </div>

                <div>
                    {/* Beschriftung für das Passwort-Feld */}
                    <label htmlFor="password">Password</label>

                    {/* Passwort-Eingabe */}
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                    />

                    {/* Fehlermeldung aus userActions.js anzeigen */}
                    {state?.errors?.password && <p>{state.errors.password}</p>}
                </div>

                <div>
                    <label htmlFor="confirmPassword">Confirm password</label>

                    {/* Zweites Passwort-Feld zum Vergleichen */}
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        required
                    />

                    {/* Fehlermeldung aus userActions.js anzeigen */}
                    {state?.errors?.confirmPassword && <p>{state.errors.confirmPassword}</p>}
                </div>

                {/* Allgemeine Meldung aus userActions.js, z. B. wenn Passwörter nicht gleich sind */}
                {state?.message && <p>{state.message}</p>}

                {/* Button zum Absenden
                   wird deaktiviert, solange das Formular gesendet wird */}
                <button className="button" disabled={pending} type="submit">
                    Register
                </button>

                <p>
                    Bereits einen Account?{" "}
                    <Link className={styles.link} href="/login">
                        Jetzt einloggen
                    </Link>
                </p>
            </form>
        </div>
    );
}