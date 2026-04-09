import Link from 'next/link';
import styles from './Post.module.css';
import Image from "next/image";


//Post-Karte mit den Daten der Karte

export default function Post({ post }) {
    return (
        <div className={styles.post}>
            <Link href={`/posts/${post.id}`}>
                <Image
                    src="/news-icon.png"
                    alt="news icon"
                    width={50}
                    height={50}
                />
            </Link>

            <Link className={styles.postLink} href={`/posts/${post.id}`}>
                <Image
                    src="/external-link.png"
                    alt="link icon"
                    className={styles.linkIcon}
                    width={20}
                    height={20}
                />
            </Link>

            <h3 className={styles.postTitle}>{post.title}</h3>
            <p className={styles.postAuthor}>By {post.username}</p>
            <p>{post.text}</p>

            <Link className={styles.postLink} href={`/posts/${post.id}`}>
                Read More
            </Link>
        </div>
    );
}