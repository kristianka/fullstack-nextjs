"use client";

import { useActionState } from "react";
import { createBlog } from "../../../app/actions/blogs";

export default function NewBlog() {
    const [state, formAction] = useActionState(createBlog, { error: "" });

    return (
        <div>
            <h1>Add blog</h1>
            <form action={formAction}>
                <input type="text" name="title" placeholder="Title" />
                <input type="text" name="author" placeholder="Author" />
                <input type="text" name="url" placeholder="URL" />
                <button type="submit">Add Blog</button>
                {state.error && <p style={{ color: "red" }}>{state.error}</p>}
            </form>
        </div>
    );
}
