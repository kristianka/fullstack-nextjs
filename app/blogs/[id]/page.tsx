import { notFound } from "next/navigation";
import { getBlogById } from "../../services/blogs";
import Link from "next/link";
import { addLikeToBlog } from "@/app/actions/blogs";
import { LargeButton } from "@/app/components/LargeButton";
import { addBlogToReadingList } from "@/app/actions/readingList";
import { getBlogReadingListState } from "@/app/services/readingList";
import { auth } from "@/app/auth";

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const blog = await getBlogById(Number(id));

    if (!blog) {
        notFound();
    }

    // logged out users see the normal button, clicking it sends them to login
    const session = await auth();
    const userId = session?.user?.id;
    const inReadingList = userId ? await getBlogReadingListState(Number(userId), blog.id) : false;
    const ownBlog = blog.userId === Number(userId);

    return (
        <div className="max-w-2xl mx-auto p-6 mt-10 shadow rounded-xl" data-testid="blog-detail">
            <h2 className="text-2xl font-bold mb-2" data-testid="blog-title">
                {blog.title}
            </h2>
            <h3 className="text-lg" data-testid="blog-author">
                by {blog.author}
            </h3>
            <div className="mt-2">
                <Link
                    href={blog.url}
                    target="_blank"
                    className="hover:underline hover:text-blue-400 text-blue-600"
                >
                    {blog.url}
                </Link>
            </div>
            <form action={addLikeToBlog} className="mt-3 flex items-center gap-2">
                <input type="hidden" name="id" value={blog.id} />
                <p className="text-sm">Likes: {blog.likes}</p>
                <button
                    type="submit"
                    className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-sm"
                >
                    Like (+1)
                </button>
            </form>
            {!ownBlog && (
                <form action={addBlogToReadingList} className="mt-3 flex items-center gap-2">
                    <input type="hidden" name="id" value={blog.id} />
                    <LargeButton
                        text={inReadingList ? "In reading list" : "Add to reading list"}
                        disabled={inReadingList}
                        testId="add-to-reading-list-button"
                    />
                </form>
            )}
        </div>
    );
};

export default BlogPage;
