import { notFound } from "next/navigation";
import { getBlogById } from "../../services/blogs";
import Link from "next/link";

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const blog = getBlogById(Number(id));

    if (!blog) {
        notFound();
    }

    return (
        <div>
            <h2>{blog.title}</h2>
            <h3>{blog.author}</h3>
            <p>{blog.likes}</p>
            <Link href={blog.url} target="_blank">
                View the blog
            </Link>
        </div>
    );
};

export default BlogPage;
