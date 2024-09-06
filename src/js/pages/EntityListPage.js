import React, { useEffect, useState } from "react";
import { assign } from "underscore";

export default function EntityListPage({children, api}) {
    const [page, setPage] = useState([]);
    const [pageApi, setPageApi] = useState(null);

    useEffect(() => {
        api.getPage(0, 10)
        .then(response => response.json())
        .then(json => setPage(json.content))
        .then(() => setPageApi(api));
    }, [api]);

    function handleEntityDeleted(id) {
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

    function renderList() {
        if(pageApi === api) {
            return(
                page.map(entity =>
                React.cloneElement(
                    children,
                    {
                        key: entity.id,
                        entity: entity,
                        onEntityDeleted: handleEntityDeleted
                    })
                )
            )
        }
    }

    return(
        <div>
            {renderList()}
        </div>
    )
}