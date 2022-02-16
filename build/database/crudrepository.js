"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAll = void 0;
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
            console.log(err);
            reject(err);
        }
        else {
            resolve(res.rows);
        }
    });
});
exports.findAll = findAll;
