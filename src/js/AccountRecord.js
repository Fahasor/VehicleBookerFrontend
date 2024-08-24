import { useState } from "react";
import HumanInfo from "./HumanInfo";
import { isEqual } from "underscore";

export default function AccountRecord({human, url}) {
    const [localHuman, setLocalHuman] = useState(human);
    const [humanServerState, setHumanServerState] = useState(human);

    function hamdleOnClick(e) {
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
                response.json().then(
                    json => {
                        console.log(json);
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

    return(
        <form>
            <HumanInfo human={localHuman} onHumanChange={handleHumanChange}/>
            <button
                onClick={hamdleOnClick}
                disabled={isEqual(localHuman, humanServerState)}
            >
                Изменить
            </button>
        </form>
    )
}