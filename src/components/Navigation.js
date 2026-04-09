import styles from "./Navigation.module.css"
import Link from "next/link"
import { verifySession } from "@/lib/session"
import { logoutAction } from "@/actions/userActions"

/*
* Navigation component that provides links to different pages.
*/
export default async function Navigation() {

    const session = await verifySession()

    // Einzelner Menüpunkt in der Navigationsliste

    return (
        <div className={styles.navigation}>
            <div>
                <ul>
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/posts/create">Create</Link>
                    </li>
                    {session ? (
                        <>
                            <li>
                                <Link href="/profile">Profile</Link>
                            </li>
                            <li>
                                <Link className={styles.characterButton} onClick={logoutAction} href="/login">Logout</Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link className={styles.characterButton} href="/login">Login</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    )
};