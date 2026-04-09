"use client";

import Link from "next/link";
import { deletePostAction } from "@/actions/postActions";

export default function PostFunctions(props) {

    const handleDelete = async () => {
        deletePostAction(props.id) // Löscht den Post über die ID
    }

    return (
        <div>
            <Link className="button" href="/">Back</Link>
            {props.showEdit && <Link className="button" href={`/posts/edit/${props.id}`}>Edit</Link>} {/* Edit nur anzeigen, wenn erlaubt */}
            {props.showDelete && <Link className="button" onClick={handleDelete} href={`/`}>Delete</Link>} {/* Delete nur anzeigen, wenn erlaubt */}
        </div>
    );
}