import { useState } from "react";
import HumanInfo from "./HumanInfo";

export default function AddAccountForm() {
    const [human, setHuman] = useState({});
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
                body: human
            }
        );
    }
                
    function handleHumanChanged(key, value) {
        setHuman({...human, [key]: value});
    }
    
    function handleHumanTypeChange(e) {
        setHumanType(e.target.value);
    }
                
    return (
        <form onSubmit={handleSubmit}>
            <HumanInfo human={human} onHumanChanged={handleHumanChanged}/>
            <select 
                name="humanType"
                value={humanType}
                required
                onChange={handleHumanTypeChange}
            >
                <option value="driver">Водитель</option>
                <option value="user">Пользователь</option>
            </select>
            <p>
                <input
                    type="submit"
                    name="acceptButton"
                    required
                />
            </p>
        </form>
    )
}