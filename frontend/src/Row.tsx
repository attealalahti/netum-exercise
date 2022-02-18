import { FC } from "react";
import Person from "./Person";

interface Props {
    person: Person;
    onDelete: (id: number) => void;
    editing: boolean;
    setEditing: (value: boolean) => void;
}
const Row: FC<Props> = (props) => {
    const handleDelete = () => {
        if (!props.editing) {
            props.onDelete(props.person.id);
        }
    };

    return (
        <tr>
            <td className="ButtonCell">
                <button>Edit</button>
            </td>
            <td>
                <span className="CellText">{props.person.first_name}</span>
            </td>
            <td>
                <span className="CellText">{props.person.last_name}</span>
            </td>
            <td>
                <span className="CellText">{props.person.age}</span>
            </td>
            <td className="ButtonCell">
                <button onClick={handleDelete}>Delete</button>
            </td>
        </tr>
    );
};

export default Row;
