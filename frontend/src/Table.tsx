interface Person {
    firstName: string;
    lastName: string;
    age: number;
}

let db: Person[] = [
    { firstName: "John", lastName: "Watson", age: 45 },
    { firstName: "Sherlock", lastName: "Holmes", age: 33 },
];

function Table() {
    return (
        <table>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Age</th>
            </tr>
            {db.map((person) => (
                <tr>
                    <td>{person.firstName}</td>
                    <td>{person.lastName}</td>
                    <td>{person.age}</td>
                </tr>
            ))}
        </table>
    );
}
export default Table;
