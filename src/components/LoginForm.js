"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { loginAction } from "@/actions/userActions";
import styles from "./LoginForm.module.css";

export default function LoginForm() {
    // z. B. redirect aus der URL holen
    const searchParams = useSearchParams();

    // state = Fehler / Meldungen / alte Werte
    // action = wird beim Formular ausgeführt
    // pending = Formular wird gerade gesendet
    const [state, action, pending] = useActionState(loginAction, {
        // redirect-URL speichern, falls vorhanden
        url: searchParams.get("redirect") ?? undefined,
    });

    return (
        // Container für das Formular
        <div className={styles["form-container-styling"]}>
            {/* Formular ruft action auf, Browser-Validierung ist aus */}
            <form action={action} noValidate>
                <h1 className={styles.title}>Login</h1>

                <div>
                    {/* Beschriftung E-Mail */}
                    <label htmlFor="email">Email address</label>

                    {/* E-Mail Eingabe, alter Wert bleibt bei Fehler erhalten */}
                    <input id="email" name="email" type="email" defaultValue={state?.data?.email} />

                    {/* Fehler bei E-Mail anzeigen */}
                    {state?.errors?.email && <p>{state.errors.email}</p>}
                </div>

                <div>
                    {/* Beschriftung Passwort */}
                    <label htmlFor="password">Password</label>

                    {/* Passwort Eingabe */}
                    <input id="password" name="password" type="password" />

                    {/* Fehler bei Passwort anzeigen */}
                    {state?.errors?.password && <p>{state.errors.password}</p>}
                </div>

                {/* Allgemeine Meldung anzeigen */}
                {state?.message && <p>{state.message}</p>}

                {/* Login-Button, gesperrt während senden */}
                <button className="button" disabled={pending} type="submit">
                    Log In
                </button>

                <p>
                    Noch keinen Account? <Link className={styles.link} href="/register">Jetzt registrieren</Link>
                </p>
            </form>
        </div>
    );
}