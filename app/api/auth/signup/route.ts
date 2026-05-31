import { NextResponse } from "next/server";
import { readDb, writeDb, User } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, password } = body;

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { error: "First name, last name, email, and password are required" },
        { status: 400 }
      );
    }

    const db = readDb();
    const existingUser = db.users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 400 }
      );
    }

    const newUser: User = {
      id: Date.now().toString(),
      firstName,
      lastName,
      email: email.toLowerCase(),
      password, // simple plaintext storage for prototype development
    };

    db.users.push(newUser);
    writeDb(db);

    return NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        name: `${newUser.firstName} ${newUser.lastName}`,
        email: newUser.email,
      },
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Failed to process signup request" },
      { status: 500 }
    );
  }
}
