import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import CourseActions from "./CourseActions";

interface CourseCardProps {
    title: string;
    category: string;
    urgency: 'urgent' | 'not-urgent';
    progress: number;
    assigned?: number;
    lastEdited?: string;
    thumbnailSeed?: number;
    onEdit: () => void;
    onDelete: () => void;
}

export default function CourseCard({
    title,
    category,
    urgency,
    progress,
    assigned,
    lastEdited = '2h ago',
    thumbnailSeed = Math.floor(Math.random() * 1000),
    onEdit,
    onDelete
}: CourseCardProps) {
    return (
        <Card className="w-full hover:shadow-lg transition-shadow">
            <div className="relative w-full h-36">
                <Image
                    src={`https://picsum.photos/seed/${thumbnailSeed}/300/200`}
                    alt={title}
                    fill
                    className="object-cover rounded-t-lg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 30vw, 20vw"
                    priority
                />
            </div>
            <CardHeader className="p-4">
                <div className="flex justify-between items-start">
                    {assigned && (
                        <Badge variant="outline" className="mb-2">
                            {assigned} Assigned
                        </Badge>
                    )}
                    <CourseActions onEdit={onEdit} onDelete={onDelete} />
                </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
                <h3 className="text-lg font-semibold mb-4 line-clamp-2">{title}</h3>
                <div className="flex items-center gap-2 mb-4">
                    <Badge variant="secondary">{category}</Badge>
                    <Badge 
                        variant={urgency === 'urgent' ? 'destructive' : 'outline'}
                    >
                        {urgency === 'urgent' ? 'Urgent' : 'Not Urgent'}
                    </Badge>
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Edited {lastEdited}</span>
                        <span>Completed: {progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                </div>
            </CardContent>
        </Card>
    );
} 