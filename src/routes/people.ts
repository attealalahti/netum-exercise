import { Router } from "express";
import { findAll } from "../database/crudrepository";
const people = Router();

people.get("/", async (req, res) => {
    try {
        const all = await findAll();
        res.send(all);
    } catch (err) {
        res.status(500).send(err);
    }
});

export default people;
