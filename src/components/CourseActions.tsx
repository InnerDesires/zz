'use client';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";

interface CourseActionsProps {
    onEdit?: () => void;
    onDelete?: () => void;
}

export default function CourseActions({ onEdit, onDelete }: CourseActionsProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {onEdit && <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>}
                {onDelete && (
                    <DropdownMenuItem 
                        onClick={onDelete}
                        className="text-destructive"
                    >
                        Delete
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
} 