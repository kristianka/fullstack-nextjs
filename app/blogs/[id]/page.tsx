import { notFound } from "next/navigation";
import { getBlogById } from "../../services/blogs";
import Link from "next/link";
import { addLikeToBlog } from "@/app/actions/blogs";

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const blog = getBlogById(Number(id));

    if (!blog) {
        notFound();
    }

    return (
        <div>
            <h2>{blog.title}</h2>
            <h3>Author: {blog.author}</h3>
            <p>Likes: {blog.likes}</p>
            <Link href={blog.url} target="_blank">
                View the blog
            </Link>
            <form action={addLikeToBlog}>
                <input type="hidden" name="id" value={blog.id} />
                <button type="submit">Like (+1)</button>
            </form>
        </div>
    );
};

export default BlogPage;
