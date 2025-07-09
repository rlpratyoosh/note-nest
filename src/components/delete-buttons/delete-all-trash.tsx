"use client";
import { permanentlyDeleteAllTrashedItems } from "@/actions";
import { MdDelete } from "react-icons/md";
import { Button } from "@/components/ui/button";

export default function DeleteAllTrashButton() {
    
    const handleDelete = async () => {
        try {
        await permanentlyDeleteAllTrashedItems();
        } catch (error) {
         console.error("Failed to delete journal:", error);
        }
    };
    
    return (
        <Button onClick={handleDelete} variant="ghost" className="cursor-pointer flex items-center gap-2">
        <MdDelete /> Delete All
        </Button>
    );
}