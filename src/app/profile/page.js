import UsersApi from "@/lib/api/Users";
import { verifySession } from "@/lib/session";
import { redirect } from "next/navigation";
import styles from "@/app/profile/profile.module.css";

export default async function Profile() {

    const session = await verifySession()
    if (!session) redirect("/login")

    const data = await UsersApi.read(session.user.id, session.accessToken)

    return (
    <div className={styles.wrapper}>
        <div className={styles.card}>
            <h1 className={styles.title}>Profile</h1>
            <p className={styles.text}>Username: {data.username}</p>
            <p className={styles.text}>Email: {data.email}</p>
            <p className={styles.text}>UserID: {data.id}</p>
        </div>
    </div>
);
}