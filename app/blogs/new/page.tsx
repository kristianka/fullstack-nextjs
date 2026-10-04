import { createBlog } from "../../../app/actions/blogs";

export default function NewBlog() {
    return (
        <div>
            <h1>Add blog</h1>
            <form action={createBlog}>
                <input type="text" name="title" placeholder="Title" />
                <input type="text" name="author" placeholder="Author" />
                <input type="text" name="url" placeholder="URL" />
                <button type="submit">Add Blog</button>
            </form>
        </div>
    );
}
