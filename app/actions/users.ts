"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { db } from "../../db";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";
import { auth } from "../auth";

type UserErrors = {
    username?: string;
    password?: string;
    passwordConfirm?: string;
};

type UserFormState = {
    errors: UserErrors;
    values: { username: string; password: string; passwordConfirm: string };
};

export const registerUser = async (
    prevState: UserFormState,
    formData: FormData
): Promise<UserFormState> => {
    const username = (formData.get("username") as string)?.trim();
    const name = (formData.get("name") as string)?.trim();
    const password = formData.get("password") as string;
    const passwordConfirm = formData.get("passwordConfirm") as string;

    const errors: UserErrors = {};

    if (!username || username.length < 4) {
        errors.username = "Username must be at least 4 characters long";
    }

    if (!password || password.length < 5) {
        errors.password = "Password must be at least 5 characters long";
    }

    if (password !== passwordConfirm) {
        errors.passwordConfirm = "Passwords do not match";
    }

    // check if any users already exist with the same name
    // btw is this sanitised, does drizzle do it...
    const usernameAlreadyTaken = await db.query.users.findFirst({
        where: eq(users.username, username)
    });

    if (usernameAlreadyTaken) {
        errors.username = "Username already taken";
    }

    // if any errors, return to client
    if (Object.keys(errors).length > 0) {
        return {
            errors,
            values: { username: username, password: password, passwordConfirm: passwordConfirm }
        };
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await db.insert(users).values({ username, name, passwordHash });

    redirect("/login");
};

export const generateApiToken = async () => {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
        redirect("/login");
    }

    const newToken = crypto.randomUUID();
    await db
        .update(users)
        .set({ token: newToken })
        .where(eq(users.id, Number(userId)));

    revalidatePath("/me");
};
