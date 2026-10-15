import Link from "next/link";
import { getBlogs } from "../services/blogs";
import { searchBlog } from "../actions/blogs";

const Blogs = async ({ searchParams }: { searchParams: Promise<{ search?: string }> }) => {
    const { search } = await searchParams;
    const blogs = await getBlogs(search);

    return (
        <div className="max-w-2xl mx-auto p-6 mt-10 shadow rounded-xl">
            <h1 className="text-2xl font-bold mb-4">Blogs</h1>
            <form action={searchBlog}>
                <input type="text" name="title" className="border rounded-xl px-5" />
                <button type="submit" className="border rounded-xl ml-3 px-5">
                    Search
                </button>
            </form>

            <div className="mt-8">
                <ul className="space-y-2">
                    {blogs.map((b) => {
                        return (
                            <li key={b.id}>
                                <Link
                                    href={`/blogs/${b.id}`}
                                    className="text-blue-600 hover:underline"
                                >
                                    <span className="font-bold"> {b.title}</span>
                                    <span className="ml-3">
                                        Author: {b.author} | {b.likes} likes | {b.url}
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default Blogs;
