import PostForm from "@/components/PostForm";
import PostsAPI from "@/lib/api/Posts";
import { redirect } from "next/navigation";
import { verifySession } from "@/lib/session";

/*
* Edit a post by id.
*/
export default async function EditPostPage({ params }) {

    const session = await verifySession()
    if (!session) redirect("/login")

    const { id } = await params;
    const post = await PostsAPI.getPostById(id);

    return post && (
        <div>
            <h1>Edit your post</h1>
            <PostForm id={id} title={post.title} text={post.text} />
        </div>
    );
}