import CategoryCard from "@/components/CategoryCard";
import CategoryCardWrapper from "@/components/CategoryCardWrapper";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { getCoursesCategories } from "@/services/courseCategories";

export default async function Categories() {
    const categories = await getCoursesCategories();
    console.log(categories);
    return <Carousel className="w-full">
        <CarouselContent>
            {categories.data.map((courseCategory, index) => (
                <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
                    <CategoryCardWrapper href={`/courses/category/${courseCategory.slug}`}>
                        <CategoryCard
                            name={courseCategory['Title']}
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
}