import { useEffect, useState } from "react";
import AccountRecordList from "../AccountRecordList";
import { assign } from "underscore";

export default function AccountsListPage({url}) {
    const [page, setPage] = useState([]);

    useEffect(() => {
        fetch(
            process.env.REACT_APP_BACKEND_HOST_URL + url + "/all?pageNumber=0&pageSize=10",
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                method: "get"
            })
        .then(response => response.json())
        .then(json => setPage(json.content));
    }, [url]);

    function handleHumanDeleted(id) {
        var newPage = [];
        let deleted;

        assign(newPage, page);
        page.forEach((element, index) => {
            if(element.id === id) {
                deleted = index;
            }
        });
        newPage.splice(deleted, 1);
        setPage(newPage);
    }

    return(
        <div>
            <AccountRecordList accountsArray={page} url={url} onAccountDelete={handleHumanDeleted}/>
        </div>
    )
}