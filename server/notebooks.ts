"use server";

import { db } from "@/db/drizzle";
import { InsertNotebook, notebooks } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

export const createNotebook = async (values: InsertNotebook) => {
  try {
    const inserted = await db
      .insert(notebooks)
      .values(values)
      .returning({ id: notebooks.id });
    return { success: true, message: "Notebook created successfully", id: inserted[0]?.id };
  } catch (error) {
    return { success: false, message: "Failed to create notebook" };
  }
};

export const getNotebooks = async () => {
  try {
    const rawHeaders = await headers();
    let session;
    try {
      session = await auth.api.getSession({ headers: rawHeaders });
    } catch (e) {
      // console.error("Auth session fetch failed:", e);
      return { success: false, message: "Failed to fetch auth session" };
    }

    const userId = session?.user?.id;
    if (!userId) {
      return { success: false, message: "User not found" };
    }

    const notebookByUser = await db.query.notebooks.findMany({
      where: eq(notebooks.userId, userId),
      with: { notes: true },
    });

    return {
      success: true,
      message: "Notebooks fetched successfully",
      notebooks: notebookByUser,
    };
  } catch (error) {
    // console.error("getNotebooks error:", error);
    return { success: false, message: "Failed to get notebooks" };
  }
};


export const getNotebookById = async (id: string) => {
  try {
    const notebook = await db.query.notebooks.findFirst({
      where: eq(notebooks.id, id),
      with: {
        notes: true,
      },
    });
    return { success: true, notebook };
  } catch (error) {
    return { success: false, message: "Failed to get notebook" };
  }
};

export const updateNotebook = async (id: string, values: InsertNotebook) => {
  try {
    await db.update(notebooks).set(values).where(eq(notebooks.id, id));
    return { success: true, message: "Notebook updated successfully" };
  } catch (error) {
    return { success: false, message: "Failed to update notebook" };
  }
};

export const deleteNotebook = async (id: string) => {
  try {
    await db.delete(notebooks).where(eq(notebooks.id, id));
    return { success: true, message: "Notebook deleted successfully" };
  } catch (error) {
    return { success: false, message: "Failed to delete notebook" };
  }
};
