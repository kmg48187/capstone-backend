import db from "#db/client";

export async function createStory({
    title,
    genre,
    body_text,
    likes,
    upload_date,
}){
    const sql = `
    INSERT INTO stories 
        (title, genre, body_text, likes, upload_date)
    VALUES
        ($1, $2, $3, $4, $5)
    RETURNING *
    `;
    const{
        rows: {story}
    } = await db.query(sql, [title, genre, body_text, likes, upload_date]);
    return story;
};

export async function getStories(){
    const sql =`
        SELECT * from stories
        `;
    const { rows } = await db.query(sql);

    return rows;
};


// this will make it so the api can pull up the  stories in the like array of a user
export async function getStoryById(id){
    const sql =`
        SELECT * 
        FROM stories 
        WHERE id = $1
        `;
        const {
            rows: [story],
        } = await db.query(sql, [id]);
        return story;
};

//They need to update when they want to edit a chapter
export async function updateStory(id, title, genre, body_text, likes, upload_date){
    const sql=`
    UPDATE stories
    SET
       title = $2,
       genre = $3,
       body_text = $4,
       likes = $5,
       upload_date = $6,
       WHERE id = $1 
       RETURNING *
       `;
       const {
        rows: [story],
       } = await db.query(sql, [id, title, genre, body_text, likes, upload_date]);
    return story;
};

export async function deleteStory(id){
    const sql =`
    DELETE FROM stories
    WHERE id = $1
    RETURNING *
    `;
    const {
        rows: [story],
    } = await db.query(sql, [id]);
    return story;
};