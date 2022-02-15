import { Table, Button } from "react-bootstrap";

interface Person {
    firstName: string;
    lastName: string;
    age: number;
}

let db: Person[] = [
    { firstName: "John", lastName: "Watson", age: 45 },
    { firstName: "Sherlock", lastName: "Holmes", age: 33 },
];

function TableManager() {
    return (
        <div>
            <div className="TableContainer">
                <Table striped bordered>
                    <thead>
                        <th></th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                        <th></th>
                    </thead>
                    <tbody>
                        {db.map((person) => (
                            <tr>
                                <td className="ButtonCell">
                                    <Button variant="primary">Edit</Button>
                                </td>
                                <td>{person.firstName}</td>
                                <td>{person.lastName}</td>
                                <td>{person.age}</td>
                                <td className="ButtonCell">
                                    <Button variant="danger">Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}
export default TableManager;
