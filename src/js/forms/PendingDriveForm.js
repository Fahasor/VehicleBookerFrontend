import { useState } from "react";
import { assign } from "underscore";

export default function PendingDriveForm({api}) {
    const [driveRecord, setdriveRecord] = useState(
        {
            driverPhoneNumber: "",
            departureDate: "",
            usersPhoneNumbers: [""]
        }
    )

    function handleUsersPhonesChange(e) {
        e.preventDefault();

        let index = e.target.getAttribute("index");
        let phoneNumbers = driveRecord.usersPhoneNumbers.slice();
        phoneNumbers[index] = e.target.value;

        if(index == driveRecord.usersPhoneNumbers.length - 1) {
            if(e.target.value != "") {
                phoneNumbers.push("");
            }
        } 
        else if(e.target.value == "") {
            phoneNumbers.splice(index, 1);
        }

        setdriveRecord({...driveRecord, usersPhoneNumbers: phoneNumbers});
    }

    function drawUsersPhonesForm() {
        return (
            driveRecord.usersPhoneNumbers.map((phoneNumber, index) => 
                <p key={index}>
                    <input
                        index={index}
                        type="tel"
                        value={phoneNumber}
                        placeholder="Телефон пассажира"
                        onChange={handleUsersPhonesChange}
                    />
                </p>
            )
        )
    }

    function handleChange(e) {
        setdriveRecord({...driveRecord, [e.target.name]: e.target.value});
    }

    function handleSubmit(e) {
        e.preventDefault();
        let toSend = assign(driveRecord);
        toSend.usersPhoneNumbers = assign(driveRecord.usersPhoneNumbers);
        toSend.usersPhoneNumbers.pop();

        toSend.departureDate = new Date(driveRecord.departureDate);
        console.log(toSend.departureDate);

        api.create(toSend)
        .then(response => {
            if(!response.ok)
                alert("Что-то пошло не так");
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="tel"
                placeholder="Телефон водителя"
                name="driverPhoneNumber"
                onChange={handleChange}
                required
            />
            <input
                type="datetime-local"
                placeholder="Дата поездки"
                name="departureDate"
                onChange={handleChange}
                required
            />
            {drawUsersPhonesForm()}
            <p>
                <button
                    type="submit"
                >
                    Отправить
                </button>
            </p>
        </form>
    )
}