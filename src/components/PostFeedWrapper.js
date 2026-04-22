import PostsAPI from "@/lib/api/Posts"
import PostFeed from "@/components/PostFeed"

/**
 * Holt alle Posts und gibt sie an PostFeed weiter
 */
export default async function PostFeedWrapper() {
    const posts = await PostsAPI.readAll() // Alle Posts von der API laden
    return <PostFeed posts={posts} /> // Posts als Props an PostFeed übergeben
}
