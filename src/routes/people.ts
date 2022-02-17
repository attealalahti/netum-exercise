import { Router } from "express";
import { findAll, findById, deleteById, save, update } from "../database/crudrepository";
const people = Router();

import { Validator } from "jsonschema";
const validator = new Validator();

interface DatabasePerson {
    id: number;
    firstname: string;
    lastname: string;
    age: number;
}
function convertKeys(original: DatabasePerson) {
    return {
        id: original.id,
        firstName: original.firstname,
        lastName: original.lastname,
        age: original.age,
    };
}

people.get("/", async (req, res) => {
    try {
        const all = (await findAll()) as DatabasePerson[];
        const converted: object[] = [];
        all.forEach((dbPerson) => converted.push(convertKeys(dbPerson)));
        res.send(converted);
    } catch (err) {
        res.status(500).send(err);
    }
});

people.get("/:id([0-9]+)", async (req, res) => {
    try {
        const person = (await findById(Number(req.params.id))) as DatabasePerson[];
        if (person.length > 0) {
            res.send(convertKeys(person[0]));
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

people.delete("/:id([0-9]+)", async (req, res) => {
    try {
        const info = (await deleteById(Number(req.params.id))) as any;
        if (info.rowCount > 0) {
            res.sendStatus(204);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

const schema = {
    type: "object",
    properties: {
        firstName: { type: "string" },
        lastName: { type: "string" },
        age: { type: "number" },
    },
    required: ["firstName", "lastName", "age"],
};

people.post("/", async (req, res) => {
    const validation = validator.validate(req.body, schema);
    if (validation.errors.length > 0) {
        res.status(400).send(validation.errors);
    } else {
        try {
            const person = await save(req.body);
            res.status(201).send(person);
        } catch (err) {
            res.status(500).send(err);
        }
    }
});

people.put("/:id([0-9]+)", async (req, res) => {
    const validation = validator.validate(req.body, schema);
    if (validation.errors.length > 0) {
        res.status(400).send(validation.errors);
    } else {
        try {
            const info = (await update(req.body, Number(req.params.id))) as any;
            if (info.rowCount > 0) {
                res.sendStatus(200);
            } else {
                res.sendStatus(404);
            }
        } catch (err) {
            res.status(500).send(err);
        }
    }
});
export default people;
