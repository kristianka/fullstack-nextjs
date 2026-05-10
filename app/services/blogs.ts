// makes code more typesafe
interface Blog {
    id: number;
    title: string;
    author: string;
    url: string;
    likes: number;
}

const blogs: Blog[] = [
    { id: 1, title: "Note 1", author: "Kristian", url: "https://github.com/kristianka", likes: 67 },
    {
        id: 2,
        title: "Another note",
        author: "Eren",
        url: "https://github.com/kristianka",
        likes: 0
    },
    { id: 3, title: "Animation", author: "Frieren", url: "https://github.com/kristianka", likes: 3 }
];

let nextId = 4;

export const getBlogs = () => {
    return blogs;
};

// no need to retype, just omit id. You could also use Pick if the type evolves
export const addBlog = ({ title, author, url, likes }: Omit<Blog, "id">) => {
    blogs.push({ id: nextId++, title, author, url, likes });
};
