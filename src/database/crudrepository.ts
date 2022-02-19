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
        pool.query("SELECT * FROM people ORDER BY id", (err, res) => {
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

interface Person {
    first_name: string;
    last_name: string;
    age: number;
}

export const save = (person: Person) =>
    new Promise((resolve, reject) => {
        pool.query(
            "INSERT INTO people (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING *",
            [person.first_name, person.last_name, person.age],
            (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res.rows[0]);
                }
            }
        );
    });

export const update = (person: Person, id: number) =>
    new Promise((resolve, reject) => {
        pool.query(
            "UPDATE people SET first_name = $1, last_name = $2, age = $3 WHERE id = $4",
            [person.first_name, person.last_name, person.age, id],
            (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            }
        );
    });
