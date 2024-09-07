import { useState } from "react";
import EntityListPage from "./pages/EntityListPage";
import HumanControl from "./HumanControl";
import CrudApi from "./API/CrudApi";
import PendingDriveInfo from "./PendingDrive/PendingDriveInfo";
import PendingDriveApi from "./API/PendingDriveApi";
import CreateEntityPage from "./pages/CreateEntityPage";

export default function SpaContents() {
    const [currentPage, setCurrentPage] = useState(<CreateEntityPage/>);
    
    return(
        <>
            <div className="navigator">
                <button
                    onClick = {() => setCurrentPage(<CreateEntityPage/>)}
                >
                    Добавление записей
                </button>
                <button
                    onClick = {() => {
                        let api = new CrudApi("/drivers");
                        setCurrentPage(
                            <EntityListPage api={api}>
                                <HumanControl api={api}/>
                            </EntityListPage>
                        )
                    }}
                >
                    Водители
                </button>
                <button
                    onClick = {() => {
                        let api = new CrudApi("/users");
                        setCurrentPage(
                            <EntityListPage api={api}>
                                <HumanControl api={api}/>
                            </EntityListPage>
                        )
                    }}
                >
                    Пользователи
                </button>
                <button
                    onClick={() => {
                        let api = new PendingDriveApi("/pending");
                        setCurrentPage(
                            <EntityListPage api={api}>
                                <PendingDriveInfo api={api}/>
                            </EntityListPage>
                        );
                    }}
                >
                    Поездки
                </button>
            </div>
            {currentPage}
        </>
    )
}