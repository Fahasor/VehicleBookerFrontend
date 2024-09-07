import { useState } from "react"
import HumanForm from "../forms/HumanForm";
import CrudApi from "../API/CrudApi";
import PendingDriveApi from "../API/PendingDriveApi";

export default function CreateEntityPage() {
    const [form, setForm] = useState(null);

    return(
        <div>
            <div>
                <input
                    type="radio"
                    name="formType"
                    onClick={() => setForm(<HumanForm api={new CrudApi("/drivers")}/>)}
                /> Водитель
                <input
                    type="radio"
                    name="formType"
                    onClick={() => setForm(<HumanForm api={new CrudApi("/users")}/>)}
                /> Пользователь
            </div>
            {form}
        </div>
    )
}