"use client";

import { useActionState, useEffect } from "react";
import { createBlog } from "../../../app/actions/blogs";
import { useNotification } from "../../components/NotificationContext";
import { useRouter } from "next/navigation";
import { LargeButton } from "@/app/components/LargeButton";
import { CustomLabel } from "@/app/components/CustomLabel";

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
        if (state.success) {
            showNotification("blog created");
            router.push("/blogs");
        }
    }, [state, showNotification, router]);

    return (
        <div className="max-w-2xl mx-auto p-6 mt-10 shadow rounded-xl">
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
                    <CustomLabel
                        text="Title"
                        type="text"
                        name="title"
                        placeholder="Title"
                        defaultValue={state.values.title}
                        required
                    />
                    {state.errors.title && <p style={{ color: "red" }}>{state.errors.title}</p>}
                </div>
                <div>
                    <CustomLabel
                        text="Author"
                        type="text"
                        name="author"
                        placeholder="Author"
                        defaultValue={state.values.author}
                        required
                    />
                    {state.errors.author && <p style={{ color: "red" }}>{state.errors.author}</p>}
                </div>
                <div>
                    <CustomLabel
                        text="URL"
                        type="text"
                        name="url"
                        placeholder="URL"
                        defaultValue={state.values.url}
                        required
                    />
                    {state.errors.url && <p style={{ color: "red" }}>{state.errors.url}</p>}
                </div>
                <LargeButton text="Create" type="submit" testId="create-blog-button" />
            </form>
        </div>
    );
}
