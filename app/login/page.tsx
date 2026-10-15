"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CustomLabel } from "../components/CustomLabel";
import { LargeButton } from "../components/LargeButton";

export default function LoginPage() {
    const router = useRouter();
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const result = await signIn("credentials", {
            username: formData.get("username"),
            password: formData.get("password"),
            redirect: false
        });

        if (result?.error) {
            setError("Invalid username or password");
        } else {
            router.push("/");
            router.refresh();
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 mt-10 shadow rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <CustomLabel text="Username" type="text" name="username" required />
                </div>
                <div>
                    <CustomLabel text="Password" type="password" name="password" required />
                </div>
                <LargeButton text="Login" type="submit" />
            </form>
        </div>
    );
}
