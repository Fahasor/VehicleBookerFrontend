import { useState } from "react";
import HumanInfo from "../modifiers/HumanModifier";
import PendingDriveUsersList from "./PendingDriveUsersList";

export default function PendingDriveInfo({entity, api, onEntityDeleted}) {
    const [localEntity, setLocalEntity] = useState(entity);

    function onDriveRecordDeleteClicked(e) {
        e.preventDefault();

        api.deleteById(entity.id)
        .then((response => {
            if(response.ok) {
                onEntityDeleted(entity.id);
            }
            else {
                alert("Что-то пошло не так");
            }
        }))
    }

    function handleUsersChanged(newUsers) {
        setLocalEntity({...localEntity, assignedUsers: newUsers});
    }

    function convertDate(date) {
        return new Date(Date.parse(date));
    }
    console.log(api);
    return(
        <div>
            <HumanInfo
                human={entity.driver}
                disabled={true}
            />
            <p>
                <button
                    onClick={onDriveRecordDeleteClicked}
                >
                    Удалить поездку
                </button>
            </p>
            {convertDate(entity.departureDate).toLocaleString('ru')}
            <PendingDriveUsersList
                driveId={localEntity.id}
                api={api}
                users={localEntity.assignedUsers}
                onUsersChanged={handleUsersChanged}
            />
        </div>
    )
}