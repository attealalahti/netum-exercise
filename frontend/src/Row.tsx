import { FC } from "react";
import Person from "./Person";

interface Props {
    person: Person;
    onDelete: (id: number) => void;
}
const Row: FC<Props> = (props) => {
    return (
        <tr key={props.person.id}>
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
                <button onClick={() => props.onDelete(props.person.id)}>Delete</button>
            </td>
        </tr>
    );
};

export default Row;
