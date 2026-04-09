import PostForm from "@/components/PostForm";
import { redirect } from "next/navigation";
import { verifySession } from "@/lib/session";

export default async function CreatePostPage() {

    const session = await verifySession()
    if (!session) redirect("/login")

    return (
        <div>
            <h1>Create a new post</h1>
            <PostForm />
        </div>
    );
}