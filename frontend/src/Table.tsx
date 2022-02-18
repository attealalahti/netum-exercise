import React, { FC, useState, useEffect, useRef } from "react";
import axios from "axios";
import getUrl from "./getUrl";
import Row from "./Row";
import Person from "./Person";

const Table: FC = () => {
    const [people, setPeople] = useState<Person[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${getUrl()}/people`);
            setPeople(response.data);
        } catch (err) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const firstNameInput = useRef<HTMLInputElement>(null);
    const lastNameInput = useRef<HTMLInputElement>(null);
    const ageInput = useRef<HTMLInputElement>(null);

    const addPerson = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const input = {
                first_name: firstNameInput.current?.value,
                last_name: lastNameInput.current?.value,
                age: Number(ageInput.current?.value),
            };
            const newPerson = await axios.post(`${getUrl()}/people`, input);
            setPeople([...people, newPerson.data]);
            (firstNameInput.current as HTMLInputElement).value = "";
            (lastNameInput.current as HTMLInputElement).value = "";
            (ageInput.current as HTMLInputElement).value = "";
        } catch (err) {
            setError(true);
        }
    };
    const deletePerson = async (id: number) => {
        try {
            await axios.delete(`${getUrl()}/people/${id}`);
            const newPeople = people.filter((person) => person.id !== id);
            setPeople(newPeople);
        } catch (err) {
            setError(true);
        }
    };
    const editPerson = async (editedPerson: Person) => {
        try {
            await axios.put(`${getUrl()}/people/${editedPerson.id}`, editedPerson);
            const index = people.findIndex((person) => person.id === editedPerson.id);
            const newPeople = Array.from(people);
            newPeople.splice(index, 1, editedPerson);
            setPeople(newPeople);
        } catch (err) {
            setError(true);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    } else if (error) {
        return <p>An error occurred.</p>;
    } else {
        return (
            <div className="TableContainer">
                <div className="Dropdown">
                    <select id="sort">
                        <option>Sort by:</option>
                        <option>First Name</option>
                        <option>Last Name</option>
                        <option>Age</option>
                    </select>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {people.map((person) => (
                            <Row
                                key={person.id}
                                person={person}
                                onDelete={deletePerson}
                                editing={editing}
                                setEditing={setEditing}
                                onSave={editPerson}
                            />
                        ))}
                    </tbody>
                </table>
                <form className="AddPerson" onSubmit={addPerson}>
                    <b className="AddPersonInput">Add new person:</b>
                    <div className="AddPersonInput">
                        <label htmlFor="first_name">First name:</label>
                        <input
                            type="text"
                            id="first_name"
                            required
                            ref={firstNameInput}
                        />
                    </div>
                    <div className="AddPersonInput">
                        <label htmlFor="last_name">Last name:</label>
                        <input type="text" id="last_name" required ref={lastNameInput} />
                    </div>
                    <div className="AddPersonInput">
                        <label htmlFor="age">Age:</label>
                        <input type="number" id="age" required ref={ageInput} />
                    </div>
                    <div>
                        <input
                            type="submit"
                            value="Add"
                            className={editing ? "Gray" : "Green"}
                        />
                    </div>
                </form>
            </div>
        );
    }
};
export default Table;
