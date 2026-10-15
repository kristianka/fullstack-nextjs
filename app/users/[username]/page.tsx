import Link from "next/link";
import { notFound } from "next/navigation";
import { getUserWithBlogs } from "../../services/users";

const UserPage = async ({ params }: { params: Promise<{ username: string }> }) => {
    const { username } = await params;
    const user = await getUserWithBlogs(username);

    if (!user) {
        notFound();
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-3">{user.name}</h2>
            <p>Username: {user.username}</p>

            <h3 className="text-xl font-bold mt-10">Blogs</h3>
            <ul className="mt-3">
                {user.blogs.map((blog) => (
                    <li key={blog.id} className="my-1">
                        <Link href={`/blogs/${blog.id}`} className="text-blue-600 hover:underline">
                            {blog.title} ({blog.author})
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserPage;
