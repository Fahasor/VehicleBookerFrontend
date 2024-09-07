import { useState } from "react";
import HumanInfo from "../modifiers/HumanModifier";

export default function PendingDriveInfo({entity, api, onEntityDeleted}) {
    const [localEntity, setLocalEntity] = useState(entity);
    const [needDrawUsersList, setNeedDrawUsersList] = useState(false);

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

    function onUserDeleteClicked(id) {
        let deleted;
        let newEntity = {};

        Object.assign(newEntity, localEntity);
        Object.assign(newEntity.assignedUsers, localEntity.assignedUsers);

        newEntity.assignedUsers.forEach((element, index) => {
            if(id === element.id) {
                deleted = index;
                return;
            }
        });

        newEntity.assignedUsers.splice(deleted, 1);
        console.log(newEntity);

        api.deleteUsersFromRecord(entity.id, [id])
        .then(response => {
            if(response.ok) {
                setLocalEntity(newEntity);
            }
            else {
                alert("Что-то пошло не так");
            }
        });
    }

    function drawUsersList() {
        if(needDrawUsersList) {
            return(
                entity.assignedUsers.map(user =>
                    <div key={user.id}>
                        <HumanInfo
                            human={user}
                            disabled={true}
                        />
                        <button 
                            onClick={(e) => {
                                e.preventDefault();
                                onUserDeleteClicked(user.id);
                            }}
                        >
                            Удалить
                        </button>
                    </div>
                )
            )
        }
        else {
            return null;
        }
    }

    return(
        <div>
            <HumanInfo
                human={entity.driver}
                disabled={true}
            />
            {entity.departureDate}
            <div>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        setNeedDrawUsersList(!needDrawUsersList);
                    }}
                >
                    {needDrawUsersList? "Свернуть" : "Развернуть"}
                </button>
                <button
                    onClick={onDriveRecordDeleteClicked}
                >
                    Удалить поездку
                </button>
                {drawUsersList()}
            </div>
        </div>
    )
}