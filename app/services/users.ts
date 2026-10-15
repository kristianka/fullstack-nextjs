import { eq } from "drizzle-orm";
import { db } from "../../db";
import { blogs, users } from "../../db/schema";
import { auth } from "../auth";
import { notFound, redirect } from "next/navigation";

export const getUsers = async () => {
    return db.query.users.findMany();
};

export const getUserById = async (id: number) => {
    return db.query.users.findFirst({
        where: eq(users.id, id)
    });
};

export const getBlogsByUserId = async (userId: number) => {
    return db.query.blogs.findMany({
        where: eq(blogs.userId, userId)
    });
};

export const getUserWithBlogs = async (username: string) => {
    return db.query.users.findFirst({
        where: eq(users.username, username),
        with: { blogs: true }
    });
};

export const getMe = async () => {
    // get user with auth, dont trust just passing id
    const session = await auth();
    if (!session?.user?.id) {
        redirect("/login");
    }

    const user = await db.query.users.findFirst({
        where: eq(users.id, Number(session.user.id))
    });

    if (!user) {
        notFound();
    }

    return user;
};
