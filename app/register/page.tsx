"use client";

import { registerUser } from "../actions/users";
import { useActionState } from "react";
import { LargeButton } from "../components/LargeButton";
import { CustomLabel } from "../components/CustomLabel";

export default function RegisterPage() {
    const [state, formAction] = useActionState(registerUser, {
        errors: {
            username: "",
            password: "",
            passwordConfirm: ""
        },
        values: {
            username: "",
            password: "",
            passwordConfirm: ""
        }
    });

    return (
        <div className="max-w-2xl mx-auto p-6 mt-10 shadow rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            <form
                action={formAction}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "12px"
                }}
            >
                <div>
                    <CustomLabel text="Username" type="text" name="username" required />
                    {state.errors.username && (
                        <p style={{ color: "red" }}>{state.errors.username}</p>
                    )}
                </div>
                <div>
                    <CustomLabel text="Name" type="text" name="name" required />
                </div>
                <div>
                    <CustomLabel text="Password" type="password" name="password" required />
                    {state.errors.password && (
                        <p style={{ color: "red" }}>{state.errors.password}</p>
                    )}
                </div>
                <div>
                    <CustomLabel
                        text="Confirm password"
                        type="password"
                        name="passwordConfirm"
                        required
                    />
                    {state.errors.passwordConfirm && (
                        <p style={{ color: "red" }}>{state.errors.passwordConfirm}</p>
                    )}
                </div>

                <LargeButton text="Register" type="submit" />
            </form>
        </div>
    );
}
