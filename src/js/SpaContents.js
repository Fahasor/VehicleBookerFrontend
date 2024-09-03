import { useState } from "react";
import AddAccountForm from "./AddAccountForm";
import EntityListPage from "./pages/EntityListPage";
import HumanControl from "./HumanControl";
import CrudApi from "./API/CrudApi";

export default function SpaContents() {
    const [currentPage, setCurrentPage] = useState(<AddAccountForm/>);
    
    return(
        <>
            <div>
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
            </div>
            {currentPage}
        </>
    )
}