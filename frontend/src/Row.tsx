import { FC } from "react";
import Person from "./Person";

interface Props {
    person: Person;
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
                <button>Delete</button>
            </td>
        </tr>
    );
};

export default Row;
