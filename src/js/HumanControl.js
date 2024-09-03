import { useState } from "react";
import HumanInfo from "./modifiers/HumanModifier";
import { isEqual } from "underscore";

export default function HumanControl({entity, api, onAccountDelete}) {
    const [localEntity, setLocalEntity] = useState(entity);
    const [entityServerState, setEntityServerState] = useState(entity);

    function handleModifyClicked(e) {
        e.preventDefault();

        api.update(localEntity)
        .then(response => {
            if(response.ok) {
                setEntityServerState(localEntity);
            }
            else {
                alert("Что-то пошло не так");
            }
        })
    }

    function handleEntityChange(key, value) {
        setLocalEntity({...localEntity, [key]: value});
    }

    function handleDeleteClicked(e) {
        e.preventDefault();

        api.delete(localEntity.id)
        .then(
            response => {
                if(response.ok) {
                    onAccountDelete(localEntity.id);
                }
                else {
                    alert("Что-то пошло не так");
                }
            }
        )
    }

    return(
        <form>
            <HumanInfo human={localEntity} onHumanChange={handleEntityChange}/>
            <button
                onClick={handleModifyClicked}
                disabled={isEqual(localEntity, entityServerState)}
            >
                Изменить
            </button>
            <button
                onClick={handleDeleteClicked}
            >
                Удалить
            </button>
        </form>
    )
}