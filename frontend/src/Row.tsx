import { FC, useState } from "react";
import Person from "./Person";

interface Props {
    person: Person;
    onDelete: (id: number) => void;
    editing: boolean;
    setEditing: (value: boolean) => void;
    onSave: (editedPerson: Person) => void;
}
const Row: FC<Props> = (props) => {
    const [editingThis, setEditingThis] = useState(false);
    const [firstNameInput, setFirstNameInput] = useState(props.person.first_name);
    const [lastNameInput, setLastNameInput] = useState(props.person.last_name);
    const [ageInput, setAgeInput] = useState(props.person.age);

    const startEditing = () => {
        props.setEditing(true);
        setEditingThis(true);
    };
    const saveEdit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const editedPerson: Person = {
            id: props.person.id,
            first_name: firstNameInput,
            last_name: lastNameInput,
            age: ageInput,
        };
        await props.onSave(editedPerson);
        stopEditing();
    };
    const stopEditing = () => {
        props.setEditing(false);
        setEditingThis(false);
    };

    if (editingThis) {
        return (
            <tr>
                <td className="ButtonCell">
                    <form id="editForm" onSubmit={saveEdit}>
                        <input className="Green" type="submit" value="Save" />
                    </form>
                </td>
                <td>
                    <input
                        form="editForm"
                        type="text"
                        className="EditInput"
                        defaultValue={props.person.first_name}
                        onChange={(e) => setFirstNameInput(e.target.value)}
                    />
                </td>
                <td>
                    <input
                        form="editForm"
                        type="text"
                        className="EditInput"
                        defaultValue={props.person.last_name}
                        onChange={(e) => setLastNameInput(e.target.value)}
                    />
                </td>
                <td className="AgeCell">
                    <input
                        form="editForm"
                        type="number"
                        className="EditInput"
                        defaultValue={props.person.age}
                        onChange={(e) => setAgeInput(Number(e.target.value))}
                    />
                </td>
                <td className="ButtonCell">
                    <button className="Blue" onClick={stopEditing}>
                        Cancel
                    </button>
                </td>
            </tr>
        );
    } else {
        return (
            <tr>
                <td className="ButtonCell">
                    <button
                        className={props.editing ? "Gray" : "Blue"}
                        onClick={startEditing}
                        disabled={props.editing}
                    >
                        Edit
                    </button>
                </td>
                <td>
                    <span className="CellText">{props.person.first_name}</span>
                </td>
                <td>
                    <span className="CellText">{props.person.last_name}</span>
                </td>
                <td className="AgeCell">
                    <span className="CellText">{props.person.age}</span>
                </td>
                <td className="ButtonCell">
                    <button
                        className={props.editing ? "Gray" : "Red"}
                        onClick={() => props.onDelete(props.person.id)}
                        disabled={props.editing}
                    >
                        Delete
                    </button>
                </td>
            </tr>
        );
    }
};

export default Row;
