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

export async function GetNotes(userId?: string) {
    const whereClause: any = {
        isDeleted: false,
    };
    
    if (userId) {
        whereClause.userId = userId;
    }
    
    return await prisma.note.findMany({
        where: whereClause,
    });
}

export async function GetNotesById(id: string, userId: string) {
    return await prisma.note.findUnique({
        where: { 
            id,
            userId,
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
}, userId: string) {
    const { tags, ...rest } = data;
    return await prisma.note.update({
        where: { 
            id,
            userId,
        },
        data: {
            ...rest,
            ...(tags !== undefined ? { tags } : {}),
        },
    });
}

export async function DeleteNote(id: string, userId: string) {
    return await prisma.note.update({
        where: { 
            id,
            userId,
        },
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

export async function GetQuickNotes(userId?: string) {
    const whereClause: any = {
        isDeleted: false,
    };
    
    if (userId) {
        whereClause.userId = userId;
    }
    
    return await prisma.quickNote.findMany({
        where: whereClause,
    });
}

export async function GetQuickNotesById(id: string, userId: string) {
    return await prisma.quickNote.findUnique({
        where: { 
            id,
            userId,
        },
    });
}

export async function CreateQuickNote(data: {
    content: string;
    userId?: string | null;
}) {
    return await prisma.quickNote.create({
        data,
    });
}

export async function UpdateQuickNote(id: string, data: {
    content?: string;
}, userId: string) {
    return await prisma.quickNote.update({
        where: { 
            id,
            userId,
        },
        data,
    });
}

export async function DeleteQuickNote(id: string, userId: string) {
    return await prisma.quickNote.update({
        where: { 
            id,
            userId,
        },
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

export async function GetJournals(userId?: string) {
    const whereClause: any = {
        isDeleted: false,
    };
    
    if (userId) {
        whereClause.userId = userId;
    }
    
    return await prisma.journal.findMany({
        where: whereClause,
    });
}

export async function GetJournalsById(id: string, userId: string) {
    return await prisma.journal.findUnique({
        where: { 
            id,
            userId,
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
}, userId: string) {
    return await prisma.journal.update({
        where: { 
            id,
            userId,
        },
        data,
    });
}

export async function DeleteJournal(id: string, userId: string) {
    return await prisma.journal.update({
        where: { 
            id,
            userId,
        },
        data: { isDeleted: true },
    });
}

// Trash

export async function GetAllTrashedItems(userId: string) {
    const [trashedNotes, trashedQuickNotes, trashedJournals] = await Promise.all([
        prisma.note.findMany({ where: { isDeleted: true, userId } }),
        prisma.quickNote.findMany({ where: { isDeleted: true, userId } }),
        prisma.journal.findMany({ where: { isDeleted: true, userId } }),
    ]);
    return {
        notes: trashedNotes,
        quickNotes: trashedQuickNotes,
        journals: trashedJournals,
    };
}

export async function PermanentlyDeleteAllTrashedItems(userId: string) {
    await Promise.all([
        prisma.note.deleteMany({ where: { isDeleted: true, userId } }),
        prisma.quickNote.deleteMany({ where: { isDeleted: true, userId } }),
        prisma.journal.deleteMany({ where: { isDeleted: true, userId } }),
    ]);
}

export async function RestoreTrashedItem(type: "note" | "quickNote" | "journal", id: string, userId: string) {
    if (type === "note") {
        return await prisma.note.update({
            where: { id, userId },
            data: { isDeleted: false },
        });
    } else if (type === "quickNote") {
        return await prisma.quickNote.update({
            where: { id, userId },
            data: { isDeleted: false },
        });
    } else if (type === "journal") {
        return await prisma.journal.update({
            where: { id, userId },
            data: { isDeleted: false },
        });
    }
    throw new Error("Invalid type");
}