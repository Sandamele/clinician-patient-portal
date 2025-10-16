import { NextResponse } from "next/server";
import admin from "@/lib/firebase.admin.config";

export async function GET(req: Request) {
  try {
    const searchParams = new URL(req.url).searchParams;
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }

    const db = admin.firestore();
    const docSnap = await db.collection("users_role").doc(id).get();

    if (!docSnap.exists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const data = docSnap.data();
    const role = data?.role || null;

    return NextResponse.json({ role }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching role:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
