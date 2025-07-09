"use client";
import { deleteQuickNote} from "@/actions";
import { MdDelete } from "react-icons/md";
import { Button } from "@/components/ui/button";

export default function DeleteQuickNoteButton( props: {id: string}) {
    const { id } = props;
    
    const handleDelete = async () => {
        try {
        await deleteQuickNote(id);
        } catch (error) {
        console.error("Failed to delete note:", error);
        }
    };
    
    return (
        <Button onClick={handleDelete} variant="ghost" className="cursor-pointer">
        <MdDelete />
        </Button>
    );
}