import Navigation from "./Navigation";
import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css"

/*
* Header component that displays the logo and navigation menu.
*/
export default function Header() {
    return (
        <header className={styles['header']}>
            <div className={styles['header_image']}>
                <Link href="/">
                    <Image
                        src="/logo_campnews.png"
                        alt="logo picture"
                        width={60}
                        height={60}
                    />
                </Link>
            </div>
            <Navigation />
        </header>
    );
}