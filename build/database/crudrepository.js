"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.save = exports.deleteById = exports.findById = exports.findAll = void 0;
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectionString = process.env.DATABASE_URL;
const pool = new pg_1.Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
});
const findAll = () => new Promise((resolve, reject) => {
    pool.query("SELECT * FROM people", (err, res) => {
        if (err) {
            reject(err);
        }
        else {
            resolve(res.rows);
        }
    });
});
exports.findAll = findAll;
const findById = (id) => new Promise((resolve, reject) => {
    pool.query("SELECT * FROM people WHERE id = $1", [id], (err, res) => {
        if (err) {
            reject(err);
        }
        else {
            resolve(res.rows);
        }
    });
});
exports.findById = findById;
const deleteById = (id) => new Promise((resolve, reject) => {
    pool.query("DELETE FROM people WHERE id = $1", [id], (err, res) => {
        if (err) {
            reject(err);
        }
        else {
            resolve(res);
        }
    });
});
exports.deleteById = deleteById;
const save = (firstName, lastName, age) => new Promise((resolve, reject) => {
    pool.query("INSERT INTO people (firstname, lastname, age) VALUES ($1, $2, $3) RETURNING *", [firstName, lastName, age], (err, res) => {
        if (err) {
            reject(err);
        }
        else {
            resolve(res.rows[0]);
        }
    });
});
exports.save = save;
