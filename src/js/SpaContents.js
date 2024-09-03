import { useState } from "react";
import AddAccountForm from "./AddAccountForm";
import EntityListPage from "./pages/EntityListPage";
import HumanControl from "./HumanControl";

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
                    onClick = {() => setCurrentPage(
                        <EntityListPage url="/drivers">
                            <HumanControl/>
                        </EntityListPage>
                    )}
                >
                    Водители
                </button>
                <button
                    onClick = {() => setCurrentPage(
                        <EntityListPage url="/users">
                            <HumanControl/>
                        </EntityListPage>
                    )}
                >
                    Пользователи
                </button>
            </div>
            {currentPage}
        </>
    )
}