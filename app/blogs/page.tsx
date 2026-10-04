import Link from "next/link";
import { getBlogs } from "../services/blogs";
import { searchBlog } from "../actions/blogs";

const Blogs = async ({ searchParams }: { searchParams: Promise<{ search?: string }> }) => {
    const { search } = await searchParams;
    const blogs = await getBlogs(search);

    return (
        <div>
            <h1>Blogs</h1>
            <form action={searchBlog}>
                <input type="text" name="title" />
                <button type="submit">Search</button>
            </form>

            <ul>
                {blogs.map((b) => {
                    return (
                        <li key={b.id}>
                            <Link href={`/blogs/${b.id}`}>
                                <span style={{ fontWeight: "bold" }}>{b.title}</span>
                                <span style={{ marginLeft: "0.5rem" }}>
                                    Author: {b.author} | {b.likes} likes | {b.url}
                                </span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Blogs;
