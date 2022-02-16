import { Router } from "express";
import { findAll, findById } from "../database/crudrepository";
const people = Router();

people.get("/", async (req, res) => {
    try {
        const all = await findAll();
        res.send(all);
    } catch (err) {
        res.status(500).send(err);
    }
});

people.get("/:id([0-9]+)", async (req, res) => {
    try {
        const person = (await findById(Number(req.params.id))) as object[];
        if (person.length > 0) {
            res.send(person[0]);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

export default people;
