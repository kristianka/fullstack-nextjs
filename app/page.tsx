import Link from "next/link";

export default function Home() {
    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-3xl">Fullstackopen Next.js</h1>
            <Link
                href={"https://github.com/kristianka/fullstack-nextjs"}
                target="_blank"
                className="hover:underline mt-3"
            >
                GitHub
            </Link>
        </div>
    );
}
