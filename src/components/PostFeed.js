"use client"

import Post from "./Post"
import { useState } from "react"
import styles from "./PostFeed.module.css"

/**
 * Zeigt alle Posts an und filtert sie über die Suche
 */
export default function PostFeed({ posts = [] }) {
    const [searchTerm, setSearchTerm] = useState("") // Speichert den Suchbegriff

    const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) // Filtert nach Titel
    )

    return (
        <>
            <center>
                <input
                    type="text"
                    placeholder="  Suche..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} // Aktualisiert die Sucheingabe
                    className={styles.searchbox}
                />
            </center>
            <div className={styles.flexbox}>
                {filteredPosts.map((post) => (
                    <Post key={post.id} post={post} /> // Gibt jeden gefilterten Post aus
                ))}
                {filteredPosts.length === 0 && (
                    <p className="text-gray-500 mt-4">Keine Posts gefunden.</p>
                )}
            </div>
        </>
    )
}
