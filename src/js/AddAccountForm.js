import { useState } from "react";
import HumanInfo from "./modifiers/HumanModifier";

export default function AddAccountForm() {
    const [human, setHuman] = useState(
        {
            name: "",
            surname: "",
            patronymic: "",
            phoneNumber: "",
        }
    );
    const [humanType, setHumanType] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        let url = "";
        switch(humanType) {
            case 'user':
                url = "/users";
            break;
            case 'driver':
                url = "/drivers";
            break;
            default:
                console.log("unknown type of user detected");
            return;
        }     
        
        fetch(
            process.env.REACT_APP_BACKEND_HOST_URL + url,
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                method: "post",
                body: JSON.stringify(human)
            }
        );
    }
                
    function handleHumanChanged(key, value) {
        setHuman({...human, [key]: value});
    }
    
    function handleAccountTypeClicked(e) {
        console.log(`${e.target.value} clicked`);
        setHumanType(e.target.value);
    }
                
    return (
        <form onSubmit={handleSubmit}>
            <HumanInfo human={human} onHumanChange={handleHumanChanged}/>
            <input
                type="radio"
                name="accountType"
                value="driver"
                onClick={handleAccountTypeClicked}
                required
            /> Водитель
            <input
                type="radio"
                name="accountType"
                value="user"
                onClick={handleAccountTypeClicked}
                required
            /> Пользователь
            <p>
                <input type="submit"/>
            </p>
        </form>
    )
}