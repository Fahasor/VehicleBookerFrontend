import { useState } from "react";
import HumanModifier from "../modifiers/HumanModifier";

export default function HumanForm({api}) {
    const [human, setHuman] = useState(
        {
            name: "",
            surname: "",
            patronymic: "",
            phoneNumber: "",
        }
    );

    function handleSubmit(e) {
        e.preventDefault();
        
        api.create(human);
    }
                
    function handleHumanChanged(key, value) {
        setHuman({...human, [key]: value});
    }
             
    return (
        <form onSubmit={handleSubmit}>
            <HumanModifier human={human} onHumanChange={handleHumanChanged}/>
            <p>
                <button
                    type="submit"
                >
                    Отправить
                </button>
            </p>
        </form>
    )
}