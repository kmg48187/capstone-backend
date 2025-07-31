import db from "#db/client";
import bcrypt from "bcrypt"

export async function createUser(email, username, password, stories_array, likes_array) {
    const sql =`
        INSERT INTO users
            (email, username, password, stories_array, likes_array)
        VALUES
            ($1, $2, $3, $4, $5)
        RETURNING *
        `;
        const hashedPassword = await bcrypt.hash(password, 10);
        const {
            rows: [user],
        } = await db.query(sql, [email, username, hashedPassword, stories_array, likes_array]);
        return user;
};

export async function getUserByUsernameAndPassword(username, password){
    const sql =`
        SELECT *
        FROM users
        WHERE username = $1
        `;
        const {
            rows: [user],
        } = await db.query(sql, [username]);
        if (!user) return null;

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return null;
        return user;
};

export async function getUserById(id) {
    const sql = `
    SELECT *
    FROM users
    WHERE id = $1
    `;
    const {
        rows: [user],
    } = await db.query(sql, [id]);
    return user;
}


export async function updateUser(id, email, username, password, stories_array, likes_array){
    const sql=`
    UPDATE users
    SET
       email = $2,
       username = $3,
       password = $4,
       stories_array = $5,
       likes_array = $6,
       WHERE id = $1 
       RETURNING *
       `;
       const {
        rows: [user],
       } = await db.query(sql, [id, email, username, password, stories_array, likes_array]);
    return user;
};

export async function deleteUser(id){
    const sql =`
    DELETE FROM users
    WHERE id = $1
    RETURNING *
    `;
    const {
        rows: [user],
    } = await db.query(sql, [id]);
    return user;
};