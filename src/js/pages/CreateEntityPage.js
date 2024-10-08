import { useState } from "react"
import HumanForm from "../forms/HumanForm";
import CrudApi from "../API/CrudApi";
import PendingDriveApi from "../API/PendingDriveApi";
import PendingDriveForm from "../forms/PendingDriveForm";

export default function CreateEntityPage() {
    const [form, setForm] = useState(null);

    return(
        <div>
            <div>
                <label>
                    <input
                        type="radio"
                        name="formType"
                        onClick={() => setForm(<HumanForm api={new CrudApi("/drivers")}/>)}
                    />
                    Водитель
                </label> 
                <label>
                    <input
                        type="radio"
                        name="formType"
                        onClick={() => setForm(<HumanForm api={new CrudApi("/users")}/>)}
                    /> 
                    Пользователь
                </label> 
                <label> 
                    <input
                        type="radio"
                        name="formType"
                        onClick={() => setForm(<PendingDriveForm api={new PendingDriveApi("/pending")}/>)}
                    />
                    Поездка
                </label> 
            </div>
            {form}
        </div>
    )
}