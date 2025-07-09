'use server';
import { CreateNote, GetNotesById, DeleteNote, UpdateNote, CreateJournal, GetJournalsById, DeleteJournal, UpdateJournal, CreateQuickNote, GetQuickNotesById, UpdateQuickNote, DeleteQuickNote, PermanentlyDeleteAllTrashedItems, RestoreTrashedItem } from "./prisma-db";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

// Note Section
export async function createNote(title: string, content: string, description: string) {

    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const data = {
        title,
        content,
        description,
        userId,
    }
    try {
        const note = await CreateNote(data);
        revalidatePath('/dashboard');
        revalidatePath('/notes');
        return note;
    } catch (error) {
        throw new Error("Failed to create note");
    }
}

export async function getNotesById(id: string) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
    
    try {
        const note = await GetNotesById(id, userId);
        return note;
    } catch (error) {
        throw new Error("Failed to fetch note");
    }
}

export async function deleteNote(id: string) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
    
    try {
        const note = await DeleteNote(id, userId);
        revalidatePath('/dashboard');
        revalidatePath('/notes');
        return note;
    } catch (error) {
        throw new Error("Failed to delete note");
    }
}

export async function updateNote(id: string, title: string, content: string, description: string) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
    
    const data = {
        title,
        content,
        description,
    }
    try {
        const note = await UpdateNote(id, data, userId);
        revalidatePath('/dashboard');
        revalidatePath('/notes');
        return note;
    } catch (error) {
        throw new Error("Failed to update note");
    }
}

// Journal Section
export async function createJournal(title: string, content: string) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
    
    const data = {
        title,
        content,
        userId,
    }
    try {
        const journal = await CreateJournal(data);
        revalidatePath('/dashboard');
        revalidatePath('/journals');
        return journal;
    } catch (error) {
        throw new Error("Failed to create journal");
    }
}

export async function getJournalsById(id: string) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
    
    try {
        const journal = await GetJournalsById(id, userId);
        return journal;
    } catch (error) {
        throw new Error("Failed to fetch journal");
    }
}

export async function deleteJournal(id: string) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
    
    try {
        const journal = await DeleteJournal(id, userId);
        revalidatePath('/dashboard');
        revalidatePath('/journals');
        return journal;
    } catch (error) {
        throw new Error("Failed to delete journal");
    }
}

export async function updateJournal(id: string, title: string, content: string) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
    
    const data = {
        title,
        content,
    }
    try {
        const journal = await UpdateJournal(id, data, userId);
        revalidatePath('/dashboard');
        revalidatePath('/journals');
        return journal;
    } catch (error) {
        throw new Error("Failed to update journal");
    }
}

// Quick Notes Section
export async function createQuickNote(content: string) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
    
    const data = {
        content,
        userId,
    }
    try {
        const quickNote = await CreateQuickNote(data);
        revalidatePath('/dashboard');
        revalidatePath('/quick-notes');
        return quickNote;
    } catch (error) {
        throw new Error("Failed to create quick note");
    }
}

export async function getQuickNotesById(id: string) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
    
    try {
        const quickNote = await GetQuickNotesById(id, userId);
        return quickNote;
    } catch (error) {
        throw new Error("Failed to fetch quick note");
    }
}

export async function deleteQuickNote(id: string) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
    
    try {
        const quickNote = await DeleteQuickNote(id, userId);
        revalidatePath('/dashboard');
        revalidatePath('/quick-notes');
        return quickNote;
    } catch (error) {
        throw new Error("Failed to delete quick note");
    }
}

export async function updateQuickNote(id: string, content: string) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
    
    const data = {
        content,
    }
    try {
        const quickNote = await UpdateQuickNote(id, data, userId);
        revalidatePath('/dashboard');
        revalidatePath('/quick-notes');
        return quickNote;
    } catch (error) {
        throw new Error("Failed to update quick note");
    }
}

export async function permanentlyDeleteAllTrashedItems() {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
    
    try {
        await PermanentlyDeleteAllTrashedItems(userId);
        revalidatePath('/dashboard');
        revalidatePath('/trash');
    } catch (error) {
        throw new Error("Failed to permanently delete all trashed items");
    }
}

export async function restoreTrashedItem(type: "note" | "quickNote" | "journal" ,id: string) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
    
    try {
        const restoredItem = await RestoreTrashedItem(type, id, userId);
        revalidatePath('/dashboard');
        revalidatePath('/trash');
        return restoredItem;
    } catch (error) {
        throw new Error("Failed to restore trashed item");
    }
}