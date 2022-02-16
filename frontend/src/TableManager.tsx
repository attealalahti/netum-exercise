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
                    {db.map((person, index) => (
                        <tr key={index}>
                            <td className="ButtonCell">
                                <button>Edit</button>
                            </td>
                            <td>
                                <span className="CellText">{person.firstName}</span>
                            </td>
                            <td>
                                <span className="CellText">{person.lastName}</span>
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
        </div>
    );
}
export default TableManager;
