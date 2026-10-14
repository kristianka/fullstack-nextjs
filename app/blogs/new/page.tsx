"use client";

import { useActionState } from "react";
import { createBlog } from "../../../app/actions/blogs";

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
        }
    });

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
