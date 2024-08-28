import { useState } from "react";
import AccountsListPage from "./pages/AccountsListPage";
import AddAccountForm from "./AddAccountForm";

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
                    onClick = {() => setCurrentPage(<AccountsListPage url="/drivers"/>)}
                >
                    Водители
                </button>
                <button
                    onClick = {() => setCurrentPage(<AccountsListPage url="/users"/>)}
                >
                    Пользователи
                </button>
            </div>
            {currentPage}
        </>
    )
}