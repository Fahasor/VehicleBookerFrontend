import { useState } from "react";
import AddAccountForm from "./AddAccountForm";
import EntityListPage from "./pages/EntityListPage";
import HumanControl from "./HumanControl";
import CrudApi from "./API/CrudApi";
import PendingDriveInfo from "./PendingDrive/PendingDriveInfo";
import PendingDriveApi from "./API/PendingDriveApi";

export default function SpaContents() {
    const [currentPage, setCurrentPage] = useState(<AddAccountForm/>);
    
    return(
        <>
            <div className="navigator">
                <button
                    onClick = {() => setCurrentPage(<AddAccountForm/>)}
                >
                    Регистрация
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