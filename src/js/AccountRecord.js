import { useState } from "react";
import HumanInfo from "./HumanInfo";
import { isEqual } from "underscore";

export default function AccountRecord({human, url, onHumanDelete}) {
    const [localHuman, setLocalHuman] = useState(human);
    const [humanServerState, setHumanServerState] = useState(human);

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
                body: JSON.stringify(localHuman)
            }
        ).then(response => {
            if(response.ok) {
                setHumanServerState(localHuman);
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

    function handleHumanChange(key, value) {
        setLocalHuman({...localHuman, [key]: value});
    }

    function handleDeleteClicked(e) {
        e.preventDefault();

        fetch(
            process.env.REACT_APP_BACKEND_HOST_URL + url + `?id=${localHuman.id}`,
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                method: "DELETE",
            }
        )

        onHumanDelete(localHuman.id);
    }

    return(
        <form>
            <HumanInfo human={localHuman} onHumanChange={handleHumanChange}/>
            <button
                onClick={handleModifyClicked}
                disabled={isEqual(localHuman, humanServerState)}
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