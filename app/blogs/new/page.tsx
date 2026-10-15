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
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Add blog</h2>
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
                        className="border rounded-xl px-5"
                    />
                    {state.errors.title && <p style={{ color: "red" }}>{state.errors.title}</p>}
                </div>
                <div>
                    <input
                        type="text"
                        name="author"
                        placeholder="Author"
                        defaultValue={state.values.author}
                        className="border rounded-xl px-5"
                    />
                    {state.errors.author && <p style={{ color: "red" }}>{state.errors.author}</p>}
                </div>
                <div>
                    <input
                        type="text"
                        name="url"
                        placeholder="URL"
                        defaultValue={state.values.url}
                        className="border rounded-xl px-5"
                    />
                    {state.errors.url && <p style={{ color: "red" }}>{state.errors.url}</p>}
                </div>
                <button
                    type="submit"
                    className="border rounded-xl bg-gray-100 hover:bg-gray-200 px-5"
                >
                    Add Blog
                </button>
            </form>
        </div>
    );
}
