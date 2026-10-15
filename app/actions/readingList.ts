"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "../auth";
import { addToReadingList, getBlogReadingListState } from "../services/readingList";

export const addBlogToReadingList = async (formData: FormData) => {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
        redirect("/login");
    }

    // there should be proper validation here in a real app
    const blogId = Number(formData.get("id"));

    // don't add the same blog twice
    const alreadyInList = await getBlogReadingListState(Number(userId), blogId);
    if (alreadyInList) {
        return;
    }

    await addToReadingList(Number(userId), blogId);
    revalidatePath(`/me`);
    revalidatePath(`/blogs/${blogId}`);
};
