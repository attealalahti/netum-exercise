import { FC, useState, useRef } from "react";
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
    const firstNameInput = useRef<HTMLInputElement>(null);
    const lastNameInput = useRef<HTMLInputElement>(null);
    const ageInput = useRef<HTMLInputElement>(null);

    const handleDelete = () => {
        if (!props.editing) {
            props.onDelete(props.person.id);
        }
    };

    const startEditing = () => {
        if (!props.editing) {
            props.setEditing(true);
            setEditingThis(true);
        }
    };
    const saveEdit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const editedPerson: Person = {
            id: props.person.id,
            first_name: (firstNameInput.current as HTMLInputElement).value,
            last_name: (lastNameInput.current as HTMLInputElement).value,
            age: Number((ageInput.current as HTMLInputElement).value),
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
                        ref={firstNameInput}
                    />
                </td>
                <td>
                    <input
                        form="editForm"
                        type="text"
                        className="EditInput"
                        defaultValue={props.person.last_name}
                        ref={lastNameInput}
                    />
                </td>
                <td className="AgeCell">
                    <input
                        form="editForm"
                        type="number"
                        className="EditInput"
                        defaultValue={props.person.age}
                        ref={ageInput}
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
                        className={props.editing && !editingThis ? "Gray" : "Blue"}
                        onClick={startEditing}
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
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                </td>
            </tr>
        );
    }
};

export default Row;
