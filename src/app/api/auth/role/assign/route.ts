import { NextResponse } from "next/server";
import admin from "@/lib/firebase.admin.config";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { uid, email, role } = body;

    if (!uid || !email || !role) {
      return NextResponse.json({ error: "Missing uid, email, or role" }, { status: 400 });
    }

    const db = admin.firestore();
    await db.collection("users_role").doc(uid).set(
      {
        email,
        role,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true },
    );

    return NextResponse.json({ message: "Role assigned successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Error assigning role:", error);
    return NextResponse.json({ error: "Failed to assign role" }, { status: 500 });
  }
}
