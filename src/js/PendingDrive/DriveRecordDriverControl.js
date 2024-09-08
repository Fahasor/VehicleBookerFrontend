import { useState } from "react";
import HumanModifier from "../modifiers/HumanModifier";
import HumanApi from "../API/HumanApi";

export default function DriveRecordDriverControl({api, driveId, driver, onDriverChanged}) {
    const [editingDriver, setEditingDriver] = useState(false);
    const [newDriverPhone, setNewDriverPhone] = useState("");

    function handleEditSubmit(e) {
        e.preventDefault();

        api.updateDriverByPhoneNumber(driveId, newDriverPhone)
        .then(response => {
            if(response.ok) {
                (new HumanApi("/drivers")).getByPhoneNumber(newDriverPhone)
                .then(response => {
                    if(response.ok) {
                        response.json()
                        .then(driver => {
                            onDriverChanged(driver);
                            setEditingDriver(false);
                        })
                    }
                    else {
                        alert("Что-то пошло не так");
                    }
                });
               
            }
            else {
                alert("Что-то пошло не так");
            }
        });
    }

    console.log(driver);
    if(editingDriver) {
        return(
            <div>
                <input
                    type="tel"
                    value={newDriverPhone}
                    onChange={(e) => setNewDriverPhone(e.target.value)}
                />
                <p>
                    <button
                        onClick={handleEditSubmit}
                    >
                        Готово
                    </button>
                    <button
                        onClick={() => {
                            setNewDriverPhone("");
                            setEditingDriver(false);
                        }}
                    >
                        Отмена
                    </button>
                </p>
            </div>
        )
    }
    else {
        return(
            <div>
                <HumanModifier
                    human={driver}
                    disabled={true}
                />
                <button
                    onClick={() => setEditingDriver(true)}
                >
                    Изменить водителя
                </button>
            </div>
        )
    }
}