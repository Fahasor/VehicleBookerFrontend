import { useState } from "react";
import PendingDriveUsersList from "./PendingDriveUsersList";
import DriveRecordDriverControl from "./DriveRecordDriverControl";

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

    function handleDriverChanged(newDriver) {
        setLocalEntity({...localEntity, driver: newDriver});
    }

    function convertDate(date) {
        return new Date(Date.parse(date));
    }

    return(
        <div>
            <DriveRecordDriverControl
                api={api}
                driveId={localEntity.id}
                driver={localEntity.driver}
                onDriverChanged={handleDriverChanged}
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