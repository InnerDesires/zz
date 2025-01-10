'use client';

import CourseCard from "./CourseCard";

interface CourseCardWrapperProps {
    title: string;
    category: string;
    urgency: 'urgent' | 'not-urgent';
    progress: number;
    assigned?: number;
    lastEdited?: string;
    thumbnailSeed?: number;
}

export default function CourseCardWrapper(props: CourseCardWrapperProps) {
    return (
        <CourseCard 
            {...props}
            onEdit={() => console.log('Edit clicked')}
            onDelete={() => console.log('Delete clicked')}
        />
    );
} 