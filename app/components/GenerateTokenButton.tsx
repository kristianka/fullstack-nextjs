"use client";

import { generateApiToken } from "../actions/users";

export default function GenerateTokenButton() {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        if (!confirm("Generate a new token? Your current token will stop working!")) {
            event.preventDefault();
        }
    };

    return (
        <form action={generateApiToken} onSubmit={handleSubmit}>
            <button className="mt-3 bg-blue-500 text-white rounded-xl p-2.5 px-5 hover:bg-blue-600 ">
                Generate new token
            </button>
        </form>
    );
}
