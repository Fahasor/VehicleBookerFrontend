import { useState } from "react";
import AddAccountForm from "./AddAccountForm";
import EntityListPage from "./pages/EntityListPage";
import AccountRecord from "./AccountRecord";

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
                            <AccountRecord/>
                        </EntityListPage>
                    )}
                >
                    Водители
                </button>
                <button
                    onClick = {() => setCurrentPage(
                        <EntityListPage url="/users">
                            <AccountRecord/>
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