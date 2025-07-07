import { PrismaClient } from "./generated/prisma";

// Augment the global scope to persist a single PrismaClient instance across hot reloads in development.
// This prevents exhausting database connections by reusing the same client.
declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;


// My Notes Section

// export async function PopulateNotes() {
//     const notes = await prisma.note.findMany();
//     if (notes.length === 0) {
//         await prisma.note.createMany({
//         data: [
//             { title: "First Note", content: "This is the first note.", description: "This is a description for the first note." },
//             { title: "Second Note", content: "This is the second note.", description: "This is a description for the second note." },
//             { title: "Third Note", content: "This is the third note.", description: "This is a description for the third note." },
//         ],
//         });
//     }
// }

// PopulateNotes();

export async function GetNotes() {
    return await prisma.note.findMany({
        where: {
            isDeleted: false,
        },
    });
}

export async function CreateNote(data: {
    userId?: string | null;
    title: string;
    content: string;
    description?: string | null;
    tags?: string[];
}) {
    const { tags, ...rest } = data;
    return await prisma.note.create({
        data: {
            ...rest,
            ...(tags !== undefined ? { tags } : {}),
        },
    });
}

export async function UpdateNote(id: string, data: {
    title?: string;
    content?: string;
    description?: string | null;
    tags?: string[];
}) {
    const { tags, ...rest } = data;
    return await prisma.note.update({
        where: { id },
        data: {
            ...rest,
            ...(tags !== undefined ? { tags } : {}),
        },
    });
}

export async function DeleteNote(id: string) {
    return await prisma.note.update({
        where: { id },
        data: { isDeleted: true },
    });
}

// Quick Notes Section

// export async function PopulateQuickNotes() {
//     const quickNotes = await prisma.quickNote.findMany();
//     if (quickNotes.length === 0) {
//         await prisma.quickNote.createMany({
//             data: [
//                 { content: "This is a quick note." },
//                 { content: "This is another quick note." },
//             ],
//         });
//     }
// }

// PopulateQuickNotes();

export async function GetQuickNotes() {
    return await prisma.quickNote.findMany({
        where: {
            isDeleted: false,
        },
    });
}

export async function CreateQuickNote(data: {
    content: string;
}) {
    return await prisma.quickNote.create({
        data,
    });
}

export async function UpdateQuickNote(id: string, data: {
    content?: string;
}) {
    return await prisma.quickNote.update({
        where: { id },
        data,
    });
}

export async function DeleteQuickNote(id: string) {
    return await prisma.quickNote.update({
        where: { id },
        data: { isDeleted: true },
    });
}

// Journal Section

// export async function PopulateJournal() {
//     const journals = await prisma.journal.findMany();
//     if (journals.length === 0) {
//         await prisma.journal.createMany({
//             data: [
//                 { title: "First Journal Entry"  ,content: "This is my first journal entry." },
//                 { title: "About the Day", content: "Today was a good day." },
//             ],
//         });
//     }
// }

// PopulateJournal();

export async function GetJournals() {
    return await prisma.journal.findMany({
        where: {
            isDeleted: false,
        },
    });
}

export async function CreateJournal(data: {
    userId?: string | null;
    title?: string | null;
    content: string;
}) {
    return await prisma.journal.create({
        data,
    });
}

export async function UpdateJournal(id: string, data: {
    title?: string | null;
    content?: string;
}) {
    return await prisma.journal.update({
        where: { id },
        data,
    });
}

export async function DeleteJournal(id: string) {
    return await prisma.journal.update({
        where: { id },
        data: { isDeleted: true },
    });
}

// Goal Section

// export async function PopulateGoals() {
//     const goals = await prisma.goal.findMany();
//     if (goals.length === 0) {
//         await prisma.goal.createMany({
//             data: [
//                 { title: "Learn Prisma", description: "Understand how to use Prisma with Next.js.", type: 'DAILY' },
//                 { title: "Build a Note App", description: "Create a note-taking application using Next.js and Prisma.", type: 'MONTHLY' },
//                 { title: "Improve Coding Skills", description: "Practice coding daily to enhance skills.", type: 'YEARLY' },
//             ],
//         });
//     }
// }

// PopulateGoals();

export async function GetGoals() {
    return await prisma.goal.findMany({
        where: {
            isDeleted: false,
        },
    });
}

export async function CreateGoal(data: {
    title: string;
    description?: string | null;
    type: 'DAILY' | 'MONTHLY' | 'YEARLY';
}) {
    return await prisma.goal.create({
        data,
    });
}

export async function UpdateGoal(id: string, data: {
    title?: string;
    description?: string | null;
    type?: 'DAILY' | 'MONTHLY' | 'YEARLY';
}) {
    return await prisma.goal.update({
        where: { id },
        data,
    });
}

export async function DeleteGoal(id: string) {
    return await prisma.goal.update({
        where: { id },
        data: { isDeleted: true },
    });
}

