import { cmsAxiosInstance } from "@/lib/axiosInstance";

export const getCoursesCategories = async () => {
    const response = await cmsAxiosInstance.get('/course-categories');
    return response.data;
}