"use server"

import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import db from "@/lib/db";

export async function logout() {
    const session = await getSession();
    session.destroy();
    redirect("/");
}
