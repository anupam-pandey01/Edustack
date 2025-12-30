export function countLesson(chapters){
    if(!chapters) return;
    let count = 0

    for(let chapter of chapters ){
        for(let lesson of chapter.lessons){
            if(lesson.content){
                count += 1
            }
        }
    }

    return count
}