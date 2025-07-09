"use client";
import {deleteJournal } from "@/actions";
import { MdDelete } from "react-icons/md";
import { Button } from "@/components/ui/button";

export default function DeleteJournalButton( props: {id: string}) {
    const { id } = props;
    
    const handleDelete = async () => {
        try {
        await deleteJournal(id);
        } catch (error) {
        console.error("Failed to delete journal:", error);
        }
    };
    
    return (
        <Button onClick={handleDelete} variant="ghost" className="cursor-pointer">
        <MdDelete />
        </Button>
    );
}