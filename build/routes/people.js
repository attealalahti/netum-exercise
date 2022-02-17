"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const crudrepository_1 = require("../database/crudrepository");
const people = (0, express_1.Router)();
const jsonschema_1 = require("jsonschema");
const validator = new jsonschema_1.Validator();
people.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const all = yield (0, crudrepository_1.findAll)();
        res.send(all);
    }
    catch (err) {
        res.status(500).send(err);
    }
}));
people.get("/:id([0-9]+)", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const person = (yield (0, crudrepository_1.findById)(Number(req.params.id)));
        if (person.length > 0) {
            res.send(person[0]);
        }
        else {
            res.sendStatus(404);
        }
    }
    catch (err) {
        res.status(500).send(err);
    }
}));
people.delete("/:id([0-9]+)", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const info = (yield (0, crudrepository_1.deleteById)(Number(req.params.id)));
        if (info.rowCount > 0) {
            res.sendStatus(204);
        }
        else {
            res.sendStatus(404);
        }
    }
    catch (err) {
        res.status(500).send(err);
    }
}));
const schema = {
    type: "object",
    properties: {
        firstName: { type: "string" },
        lastName: { type: "string" },
        age: { type: "number" },
    },
    required: ["firstName", "lastName", "age"],
};
people.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validation = validator.validate(req.body, schema);
    if (validation.errors.length > 0) {
        res.status(400).send(validation.errors);
    }
    else {
        try {
            const person = yield (0, crudrepository_1.save)(req.body.firstName, req.body.lastName, req.body.age);
            res.status(201).send(person);
        }
        catch (err) {
            res.status(500).send(err);
        }
    }
}));
people.put("/:id([0-9]+)", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validation = validator.validate(req.body, schema);
    if (validation.errors.length > 0) {
        res.status(400).send(validation.errors);
    }
    else {
        try {
            const info = (yield (0, crudrepository_1.update)(Number(req.params.id), req.body.firstName, req.body.lastName, req.body.age));
            if (info.rowCount > 0) {
                res.sendStatus(200);
            }
            else {
                res.sendStatus(404);
            }
        }
        catch (err) {
            res.status(500).send(err);
        }
    }
}));
exports.default = people;
