import { useState } from "react";
import HumanInfo from "./HumanInfo";
import { isEqual } from "underscore";

export default function AccountRecord({entity, url, onAccountDelete}) {
    const [localEntity, setLocalEntity] = useState(entity);
    const [entityServerState, setEntityServerState] = useState(entity);

    function handleModifyClicked(e) {
        e.preventDefault();

        fetch(
            process.env.REACT_APP_BACKEND_HOST_URL + url,
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                method: "PUT",
                body: JSON.stringify(localEntity)
            }
        ).then(response => {
            if(response.ok) {
                setEntityServerState(localEntity);
            }
            else {
                response.json().then(json => {
                        switch(response.status) {
                            case 400:
                                switch(json.message) {
                                    case "database constraints violation":
                                        alert("Пользователь с таким номером телефона уже существует");
                                    break;
                                    default:
                                        console.log(`unexpected response message: ${json.message}`);
                                }
                            break;
                            default:
                                console.log(`unexpected status code: ${response.status}`);
                        }
                    }
                )
            }
        })
    }

    function handleEntityChange(key, value) {
        setLocalEntity({...localEntity, [key]: value});
    }

    function handleDeleteClicked(e) {
        e.preventDefault();

        fetch(
            process.env.REACT_APP_BACKEND_HOST_URL + url + `?id=${localEntity.id}`,
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                method: "DELETE",
            }
        )
        .then(
            response => {
                if(response.ok) {
                    onAccountDelete(localEntity.id);
                }
                else {
                    switch(response.status) {
                        case 400:
                            response.json().then(
                                json => {
                                    switch(json.message) {
                                        case "":
                                            alert("Аккаунт не может быть удалён, так как находится в связи с поездкой");
                                        break;
                                        default:
                                            console.log(`unexpected error message: ${json.message}`);
                                    }
                                }
                            )
                        break;
                        default:
                            console.log(`unexpected status code: ${response.status}`);
                     }
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