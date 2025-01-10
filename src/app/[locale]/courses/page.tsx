import { useTranslations } from "next-intl";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import CourseCardWrapper from "@/components/CourseCardWrapper";
import CategoryCard from "@/components/CategoryCard";
import CategoryCardWrapper from "@/components/CategoryCardWrapper";

export default function CoursesPage() {
    const t = useTranslations('Courses');

    return (
        <div className="container mx-auto py-8 space-y-12">
            <div className="flex flex-col gap-4">
                <p className="text-4xl font-bold">{t('title')}</p>
                <p className="text-sm text-muted-foreground">{t('categoriesDescription')}</p>
            </div>
            <section id="categories">
                <h2 className="text-3xl font-bold mb-6">{t('categories')}</h2>
                <Carousel className="w-full">
                    <CarouselContent>
                        {[1, 2, 3, 4, 5].map((_, index) => (
                            <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
                                <CategoryCardWrapper href={`/courses/category/${index + 1}`}>
                                    <CategoryCard
                                        name="UI/UX Design"
                                        totalCourses={12}
                                        completedCourses={5}
                                        thumbnailSeed={index}
                                    />
                                </CategoryCardWrapper>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </section>

            {/* New Courses Section */}
            <section id="new-courses">
                <h2 className="text-3xl font-bold mb-6">{t('newCourses')}</h2>
                <Carousel className="w-full">
                    <CarouselContent>
                        {[1, 2, 3, 4, 5].map((_, index) => (
                            <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
                                <CourseCardWrapper
                                    title="Mastering UI/UX Design for Impactful Solutions"
                                    category="UI/UX"
                                    urgency="not-urgent"
                                    progress={50}
                                    assigned={21}
                                    lastEdited="2h ago"
                                    thumbnailSeed={index}
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </section>

            {/* Popular Courses Section */}
            <section id="popular-courses">
                <h2 className="text-3xl font-bold mb-6">{t('popularCourses')}</h2>
                <Carousel className="w-full">
                    <CarouselContent>
                        {[1, 2, 3, 4, 5].map((_, index) => (
                            <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
                                <CourseCardWrapper
                                    title="Mastering UI/UX Design for Impactful Solutions"
                                    category="UI/UX"
                                    urgency="not-urgent"
                                    progress={50}
                                    assigned={21}
                                    lastEdited="2h ago"
                                    thumbnailSeed={index}
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </section>
        </div>
    );
}