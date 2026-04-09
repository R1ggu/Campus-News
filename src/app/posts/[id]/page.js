import PostsAPI from "@/lib/api/Posts";
import styles from "./DetailPost.module.css"
import PostFunctions from "@/components/PostFunctions";
import { verifySession } from "@/lib/session";
/*
* Zeigt die Details eines einzelnen Posts an
*/
export default async function PostDetailsPage({ params }) {
    const { id } = await params; // ID aus den params holen
    const post = await PostsAPI.getPostById(id); // Gewählten Post laden
    const session = await verifySession(); // Prüfen ob ein User eingeloggt ist

    return (
        <div className={styles['detail-container-styling']}>
            <div>
                <h2>{post.title}</h2>
                <p className={styles['author']}> from {post.username} @ {post.createdAt}</p> {/* Autor und Erstellungsdatum */}
                <p>{post.text}</p> {/* Inhalt des Posts */}
            </div>
            <div>
                <PostFunctions
                    id={post.id}
                    showEdit={!!session} // Edit nur wenn eingeloggt
                    showDelete={!!session} // Delete nur wenn eingeloggt
                />
            </div>
        </div>
    )
}