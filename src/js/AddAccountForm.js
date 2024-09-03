import { useState } from "react";
import HumanInfo from "./modifiers/HumanModifier";
import HumanApi from "./API/CrudApi";

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

        switch(humanType) {
            case 'user':
                (new HumanApi("/users")).create(human);
            break;
            case 'driver':
                (new HumanApi("/drivers")).create(human);
            break;
            default:
                console.log("unknown type of user detected");
            return;
        }     
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