'use server';
import { CreateNote, GetNotesById, DeleteNote, UpdateNote, CreateJournal, GetJournalsById, DeleteJournal, UpdateJournal } from "./prisma-db";
import { revalidatePath } from "next/cache";


// Note Section
export async function createNote(title: string, content: string, description: string) {
    const data = {
        title,
        content,
        description,
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
    try {
        const note = await GetNotesById(id);
        return note;
    } catch (error) {
        throw new Error("Failed to fetch note");
    }
}

export async function deleteNote(id: string) {
    try {
        const note = await DeleteNote(id);
        revalidatePath('/dashboard');
        revalidatePath('/notes');
        return note;
    } catch (error) {
        throw new Error("Failed to delete note");
    }
}

export async function updateNote(id: string, title: string, content: string, description: string) {
    const data = {
        title,
        content,
        description,
    }
    try {
        const note = await UpdateNote(id, data);
        revalidatePath('/dashboard');
        revalidatePath('/notes');
        return note;
    } catch (error) {
        throw new Error("Failed to update note");
    }
}

// Journal Section
export async function createJournal(title: string, content: string) {
    const data = {
        title,
        content,
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
    try {
        const journal = await GetJournalsById(id);
        return journal;
    } catch (error) {
        throw new Error("Failed to fetch journal");
    }
}

export async function deleteJournal(id: string) {
    try {
        const journal = await DeleteJournal(id);
        revalidatePath('/dashboard');
        revalidatePath('/journals');
        return journal;
    } catch (error) {
        throw new Error("Failed to delete journal");
    }
}

export async function updateJournal(id: string, title: string, content: string) {
    const data = {
        title,
        content,
    }
    try {
        const journal = await UpdateJournal(id, data);
        revalidatePath('/dashboard');
        revalidatePath('/journals');
        return journal;
    } catch (error) {
        throw new Error("Failed to update journal");
    }
}