import { getBlogs } from "../services/blogs";

export default function Blogs() {
    const blogs = getBlogs();
    return (
        <div>
            <h1>Blogs</h1>
            <ul>
                {blogs.map((b) => {
                    return (
                        <li key={b.id}>
                            <span style={{ fontWeight: "bold" }}>{b.title}</span>
                            <span style={{ marginLeft: "0.5rem" }}>
                                Author: {b.author} | {b.likes} likes | {b.url}
                            </span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
