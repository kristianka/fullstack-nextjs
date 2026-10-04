import { desc, eq, ilike } from "drizzle-orm";
import { db } from "../../db";
import { blogs } from "../../db/schema";

// makes code more typesafe
interface Blog {
    id: number;
    title: string;
    author: string;
    url: string;
    likes: number;
}

export const getBlogs = async (search?: string) => {
    if (search) {
        return await db.query.blogs.findMany({
            where: ilike(blogs.title, search),
            orderBy: desc(blogs.likes)
        });
    }

    return await db.query.blogs.findMany({
        orderBy: desc(blogs.likes)
    });
};

export const getBlogById = async (id: number) => {
    const blog = await db.query.blogs.findFirst({
        where: eq(blogs.id, id)
    });

    return blog;
};

// no need to retype, just omit id. You could also use Pick if the type evolves
export const addBlog = async ({ title, author, url, likes }: Omit<Blog, "id">) => {
    await db.insert(blogs).values({ title, author, url, likes: 0 });
};

export const likeBlog = async (id: number) => {
    const blog = await getBlogById(id);

    if (!blog) {
        console.log("blog not found");
        return null;
    }

    const res = await db
        .update(blogs)
        .set({ likes: blog.likes + 1 })
        .where(eq(blogs.id, id));

    return res;
};
