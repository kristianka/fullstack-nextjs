"use client";

import { useActionState, useEffect } from "react";
import { createBlog } from "../../../app/actions/blogs";
import { useNotification } from "../../components/NotificationContext";
import { useRouter } from "next/navigation";

export default function NewBlog() {
    const [state, formAction] = useActionState(createBlog, {
        errors: {
            title: "",
            author: "",
            url: ""
        },
        values: {
            title: "",
            author: "",
            url: ""
        },
        success: false
    });

    const { showNotification } = useNotification();
    const router = useRouter();

    useEffect(() => {
        console.log("state", state);
        if (state.success) {
            showNotification("blog created");
            router.push("/blogs");
        }
    }, [state, showNotification, router]);

    return (
        <div>
            <h1>Add blog</h1>
            <form
                action={formAction}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "12px"
                }}
            >
                <div>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        defaultValue={state.values.title}
                    />
                    {state.errors.title && <p style={{ color: "red" }}>{state.errors.title}</p>}
                </div>
                <div>
                    <input
                        type="text"
                        name="author"
                        placeholder="Author"
                        defaultValue={state.values.author}
                    />
                    {state.errors.author && <p style={{ color: "red" }}>{state.errors.author}</p>}
                </div>
                <div>
                    <input
                        type="text"
                        name="url"
                        placeholder="URL"
                        defaultValue={state.values.url}
                    />
                    {state.errors.url && <p style={{ color: "red" }}>{state.errors.url}</p>}
                </div>
                <button type="submit">Add Blog</button>
            </form>
        </div>
    );
}
