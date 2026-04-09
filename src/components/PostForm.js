"use client";

import styles from "./PostForm.module.css";
import { useActionState } from "react";
import { updatePost } from "@/actions/postActions";

export default function PostForm(props) {

    // useActionState für Formular-Status und Action
    // state = aktueller Zustand, action = Formular-Aktion, pending = lädt gerade
    const [state, action, pending] = useActionState(updatePost, {
        id: props.id, // Post-ID für Bearbeiten
        data: { title: props.title, text: props.text }, // Startwerte fürs Formular
    });

    return (
        <div className={styles['form-container-styling']}>
            <form action={action} noValidate>
                <div>
                    <label htmlFor="title">Title</label>
                    <input id="title" name="title" defaultValue={state?.data?.title} /> {/* Titel-Eingabe */}
                </div>
                <div>
                    <label htmlFor="text">Text</label>
                    <textarea id="text" name="text" defaultValue={state?.data?.text} /> {/* Text-Eingabe */}
                </div>
                <button className={"button"} disabled={pending} type="submit">
                    Post
                </button>
                {state?.message && (
                    <div>
                        <p>{state.message}</p>
                    </div>
                )}
            </form>
        </div>
    );
}