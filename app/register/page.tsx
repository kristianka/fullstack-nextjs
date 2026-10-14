"use client";

import { registerUser } from "../actions/users";
import { useActionState } from "react";

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
        <div>
            <h2>Register</h2>
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
                    <label>
                        Username
                        <input type="text" name="username" required />
                    </label>
                    {state.errors.username && (
                        <p style={{ color: "red" }}>{state.errors.username}</p>
                    )}
                </div>
                <div>
                    <label>
                        Name
                        <input type="text" name="name" required />
                    </label>
                </div>
                <div>
                    <label>
                        Password
                        <input type="password" name="password" required />
                    </label>
                    {state.errors.password && (
                        <p style={{ color: "red" }}>{state.errors.password}</p>
                    )}
                </div>
                <div>
                    <label>
                        Confirm password
                        <input type="password" name="passwordConfirm" required />
                    </label>
                    {state.errors.passwordConfirm && (
                        <p style={{ color: "red" }}>{state.errors.passwordConfirm}</p>
                    )}
                </div>

                <button type="submit">Register</button>
            </form>
        </div>
    );
}
