import Image from "next/image";
import styles from "./page.module.css";
import PostFeedWrapper from "@/components/PostFeedWrapper";
import Loading from "@/components/Loading";
import { Suspense } from "react";

/** 
 * Home page (index page) component of the Campus News application.
*/
export default function Home() {
    return (
        <>
            <div className={styles.heading}>
                <h1>Campus News</h1>
            </div>

            <Suspense fallback={<Loading></Loading>}>
                <PostFeedWrapper />
            </Suspense>
        </>
    )
}
