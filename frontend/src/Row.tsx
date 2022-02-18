import { FC, useState } from "react";
import Person from "./Person";

interface Props {
    person: Person;
    onDelete: (id: number) => void;
    editing: boolean;
    setEditing: (value: boolean) => void;
}
const Row: FC<Props> = (props) => {
    const [editingThis, setEditingThis] = useState(false);

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
    const stopEditing = () => {
        props.setEditing(false);
        setEditingThis(false);
    };

    if (editingThis) {
        return (
            <tr>
                <td className="ButtonCell">
                    <button className="Green">Save</button>
                </td>
                <td>
                    <input className="EditInput" defaultValue={props.person.first_name} />
                </td>
                <td>
                    <input className="EditInput" defaultValue={props.person.last_name} />
                </td>
                <td className="AgeCell">
                    <input className="EditInput" defaultValue={props.person.age} />
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
                <form />
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
