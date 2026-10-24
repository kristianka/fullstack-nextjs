import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";
import bcrypt from "bcryptjs";

// for testing
export const POST = async (req: NextRequest) => {
    if (process.env.NODE_ENV === "production") {
        return NextResponse.json(
            { error: "This endpoint is not available in production" },
            { status: 403 }
        );
    }

    const data = await req.json();
    // these should be validated
    const username = data.username;
    const name = data.name;
    const password = data.password;

    // check if any users already exist with the same name
    // btw is this sanitised, does drizzle do it...
    const usernameAlreadyTaken = await db.query.users.findFirst({
        where: eq(users.username, username)
    });

    if (usernameAlreadyTaken) {
        return NextResponse.json({ error: "Username already taken" }, { status: 403 });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await db.insert(users).values({ username, name, passwordHash });

    return NextResponse.json({ status: "ok" }, { status: 201 });
};
