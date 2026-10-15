import { notFound } from "next/navigation";
import { getBlogById } from "../../services/blogs";
import Link from "next/link";
import { addLikeToBlog } from "@/app/actions/blogs";

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const blog = await getBlogById(Number(id));

    if (!blog) {
        notFound();
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">{blog.title}</h2>
            <h3 className="text-lg">Author: {blog.author}</h3>
            <Link href={blog.url} target="_blank" className="hover:underline hover:text-gray-900">
                View the blog
            </Link>
            <form action={addLikeToBlog} className="mt-3">
                <input type="hidden" name="id" value={blog.id} />
                <p className="text-sm">Likes: {blog.likes}</p>
                <button
                    type="submit"
                    className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded text-sm"
                >
                    Like (+1)
                </button>
            </form>
        </div>
    );
};

export default BlogPage;
