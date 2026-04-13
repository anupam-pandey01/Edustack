import { handleError } from "../utils/handler";
import api from "./api";

export async function addCourse(courseData) {
    try {
        const res = await api.post("/upload/CourseData", courseData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        
        return res.data;
    } catch (err) {
        handleError(err?.response?.data?.message || err.message);
        return null
    }
}