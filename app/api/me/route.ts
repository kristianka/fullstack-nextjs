import { NextRequest, NextResponse } from "next/server";
import { getUserByToken } from "@/app/services/users";

export const GET = async (req: NextRequest) => {
    const authorization = req.headers.get("authorization");
    const token = authorization?.startsWith("Bearer ") // strip token
        ? authorization.slice("Bearer ".length)
        : null;

    if (!token) {
        return NextResponse.json({ error: "Missing Bearer token" }, { status: 400 });
    }

    const data = await getUserByToken(token);
    if (!data) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({ data }, { status: 200 });
};
