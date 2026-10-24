import { db } from "@/db";
import { readingList } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export const addToReadingList = async (userId: number, blogId: number) => {
    await db.insert(readingList).values({
        blogId,
        userId,
        read: false
    });
};

// true if the blog is already on the user's reading list
export const getBlogReadingListState = async (userId: number, blogId: number) => {
    const res = await db.query.readingList.findFirst({
        where: and(eq(readingList.userId, userId), eq(readingList.blogId, blogId))
    });

    return res !== undefined; // does entry exist
};

export const markAsDone = async (userId: number, blogId: number) => {
    const res = await db
        .update(readingList)
        .set({ read: true })
        .where(and(eq(readingList.blogId, Number(blogId)), eq(readingList.userId, userId)));

    return res;
};
