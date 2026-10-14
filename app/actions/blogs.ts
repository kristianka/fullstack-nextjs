"use server";

import { redirect } from "next/navigation";
import { addBlog, likeBlog } from "../services/blogs";
import { revalidatePath } from "next/cache";
import { auth } from "../auth";

export const createBlog = async (prevState: { error: string }, formData: FormData) => {
    const session = await auth();
    if (!session) {
        redirect("/login");
    }

    // there should be validation here in a real app
    const blog = {
        title: formData.get("title") as string,
        author: formData.get("author") as string,
        url: formData.get("url") as string,
        likes: 0
    };

    if (!blog.title || blog.title.length < 5) {
        return { error: "Blog title must be at least 5 characters long" };
    }

    if (!blog.author || blog.author.length < 5) {
        return { error: "Blog author must be at least 5 characters long" };
    }

    if (!blog.url || blog.url.length < 5) {
        return { error: "Blog URL must be at least 5 characters long" };
    }

    await addBlog({ title: blog.title, author: blog.author, url: blog.url, likes: blog.likes }); // we could pass blog obj too
    revalidatePath("/blogs");
    redirect("/blogs");
};

export const addLikeToBlog = async (formData: FormData) => {
    // there should be validation here in a real app
    const id = Number(formData.get("id"));
    await likeBlog(id);
    revalidatePath(`/blogs`);
    revalidatePath(`/blogs/${id}`);
};

export const searchBlog = async (formData: FormData) => {
    // there should be validation here in a real app
    const title = formData.get("title");
    redirect(`/blogs/?search=${title}`);
};
