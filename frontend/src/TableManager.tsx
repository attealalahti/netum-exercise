import { FC, useState, useEffect } from "react";
import axios from "axios";
import getUrl from "./getUrl";

const TableManager: FC = () => {
    interface Person {
        id: number;
        first_name: string;
        last_name: string;
        age: number;
    }
    const [people, setPeople] = useState<Person[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        fetchData();
    });

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
                            <tr key={person.id}>
                                <td className="ButtonCell">
                                    <button>Edit</button>
                                </td>
                                <td>
                                    <span className="CellText">{person.first_name}</span>
                                </td>
                                <td>
                                    <span className="CellText">{person.last_name}</span>
                                </td>
                                <td>
                                    <span className="CellText">{person.age}</span>
                                </td>
                                <td className="ButtonCell">
                                    <button>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <form className="AddPerson">
                    <b>Add new person:</b>
                    <div className="AddPersonInput">
                        <label htmlFor="first_name">First name:</label>
                        <input type="text" id="first_name" />
                    </div>
                    <div className="AddPersonInput">
                        <label htmlFor="last_name">Last name:</label>
                        <input type="text" id="last_name" />
                    </div>
                    <div className="AddPersonInput">
                        <label htmlFor="age">Age:</label>
                        <input type="text" id="age" />
                    </div>
                    <div>
                        <input type="submit" value="Add" />
                    </div>
                </form>
            </div>
        );
    }
};
export default TableManager;
