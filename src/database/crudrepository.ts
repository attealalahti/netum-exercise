import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
});

export const findAll = () =>
    new Promise((resolve, reject) => {
        pool.query("SELECT * FROM people", (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res.rows);
            }
        });
    });

export const findById = (id: number) =>
    new Promise((resolve, reject) => {
        pool.query("SELECT * FROM people WHERE id = $1", [id], (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res.rows);
            }
        });
    });

export const deleteById = (id: number) =>
    new Promise((resolve, reject) => {
        pool.query("DELETE FROM people WHERE id = $1", [id], (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
