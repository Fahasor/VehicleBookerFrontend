import { useState } from "react";
import HumanModifier from "../modifiers/HumanModifier";
import { assign } from "underscore";

export default function PendingDriveUsersList({driveId, api, users, onUsersChanged}) {
    const [needDrawUsersList, setNeedDrawUsersList] = useState(false);

    function onUserDeleted(deleted) {
        let newUsers = [];

        assign(newUsers, users);
        newUsers.splice(deleted, 1);

        api.deleteUsersFromRecord(driveId, [users[deleted].id])
        .then(response => {
            if(response.ok) {
                onUsersChanged(newUsers);
            }
            else {
                alert("Что-то пошло не так");
            }
        });
    }

    function drawList() {
        return (
            users.map((user, index) =>
                <div key={user.id}>
                    <HumanModifier
                        human={user}
                        disabled={true}
                    />
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            onUserDeleted(index);
                        }}
                    >
                        Удалить
                    </button>
                </div>
            )
        )
    }

    return(
        <div>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    setNeedDrawUsersList(!needDrawUsersList);
                }}
            >
                {needDrawUsersList? "Свернуть" : "Развернуть"}
            </button>
            {needDrawUsersList?drawList():null}
        </div>
    )
}