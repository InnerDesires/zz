import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { BookOpen, ArrowRight } from "lucide-react";

interface CategoryCardProps {
    name: string;
    totalCourses: number;
    completedCourses: number;
    thumbnailSeed?: number;
}

export default function CategoryCard({
    name,
    totalCourses,
    completedCourses,
    thumbnailSeed = Math.floor(Math.random() * 1000),
}: CategoryCardProps) {
    return (
        <Card className="w-full hover:shadow-lg transition-all group cursor-pointer relative">
            <div className="relative w-full h-40">
                <Image
                    src={`https://picsum.photos/seed/${thumbnailSeed}/300/200`}
                    alt={name}
                    fill
                    className="object-cover rounded-t-lg brightness-[0.85] group-hover:brightness-100 transition-all"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 30vw, 20vw"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-xl font-semibold text-white">
                    {name}
                </h3>
            </div>
            <CardContent className="p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <BookOpen className="h-4 w-4" />
                        <span className="text-sm">{totalCourses} courses</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                            {completedCourses} / {totalCourses} completed
                        </span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
} 