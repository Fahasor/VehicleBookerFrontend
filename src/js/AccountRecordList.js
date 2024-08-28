import AccountRecord from "./AccountRecord"

export default function AccountRecordList({accountsArray, url, onAccountDelete}) {
    return(
        <div>
            {
                accountsArray.map(
                    account => 
                    <AccountRecord
                        key={account.id}
                        human={account}
                        url={url}
                        onAccountDelete={onAccountDelete}
                    />
                )
            }
        </div>
    )
}