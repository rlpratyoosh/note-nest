"use client";
import { Button } from "@/components/ui/button"
import { FaTrashRestore } from "react-icons/fa";
import { restoreTrashedItem } from "@/actions";

export default function RestoreTrashButton(props: { type: "note" | "quickNote" | "journal", id: string }) {
    
    const { type, id } = props;

    const handleDelete = async () => {
        try {
        await restoreTrashedItem(type, id);
        } catch (error) {
         console.error("Failed to delete journal:", error);
        }
    };
    
    return (
        <Button onClick={handleDelete} variant="ghost" className="cursor-pointer flex items-center gap-2">
        <FaTrashRestore />
        </Button>
    );
}