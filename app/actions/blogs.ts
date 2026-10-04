"use server";

import { redirect } from "next/navigation";
import { addBlog } from "../services/blogs";
import { revalidatePath } from "next/cache";

export const createBlog = async (formData: FormData) => {
    // there should be validation here in a real app
    const blog = {
        title: formData.get("title") as string,
        author: formData.get("author") as string,
        url: formData.get("url") as string,
        likes: 0
    };
    addBlog({ title: blog.title, author: blog.author, url: blog.url, likes: blog.likes }); // we could pass blog obj too
    revalidatePath("/blogs");
    redirect("/blogs");
};
