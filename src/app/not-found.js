import styles from "./not-found.module.css";
import Image from "next/image";

export default function NotFound() {
    return (
        <div className={styles.wrapper}>
            <img
                src="/not-found 404.png"
                alt="404 Seite nicht gefunden"
                className={styles.image}
            />

            <p className={styles.subtitle}>Page Not Found, try later again</p>
        </div>
    );
}