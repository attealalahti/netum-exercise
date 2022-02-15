import { Table, Button, DropdownButton, Dropdown } from "react-bootstrap";

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
        <div className="TableContainer">
            <DropdownButton
                title="Sort by"
                variant="secondary"
                className="DropdownButton"
            >
                <Dropdown.Item>First Name</Dropdown.Item>
                <Dropdown.Item>Last Name</Dropdown.Item>
                <Dropdown.Item>Age</Dropdown.Item>
            </DropdownButton>
            <Table striped bordered>
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
                    {db.map((person, index) => (
                        <tr key={index}>
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
    );
}
export default TableManager;
