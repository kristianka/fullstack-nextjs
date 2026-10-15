"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const CustomLink = ({ href, text }: { href: string; text: string }) => {
    return (
        <Link href={href} className="hover:text-gray-300">
            {text}
        </Link>
    );
};

export default function NavBar() {
    const { data: session } = useSession();

    return (
        <nav className="bg-gray-800 text-white px-6 py-3 flex items-center gap-4">
            <CustomLink href="/" text="home" />
            {" | "}
            <CustomLink href="/blogs" text="blogs" />
            {" | "}
            <CustomLink href="/users" text="users" />
            <div className="ml-auto flex items-center gap-4">
                {session ? (
                    <>
                        <CustomLink href="/blogs/new" text="create new" />
                        {" | "}
                        <em className="text-gray-300">{session.user?.name} logged in</em>{" "}
                        <button
                            onClick={() => signOut()}
                            className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-sm"
                        >
                            logout
                        </button>
                    </>
                ) : (
                    <>
                        <CustomLink href="/login" text="login" />
                        {" | "}
                        <CustomLink href="/register" text="register" />
                    </>
                )}
            </div>
        </nav>
    );
}
