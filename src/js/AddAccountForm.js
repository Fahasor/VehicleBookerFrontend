import { Component } from "react";

class AddAccountForm extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            <form id="addAccountForm" onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    name="surname"
                    placeholder="Введите фамилию"
                    required
                />
                <input
                    type="text"
                    name="name"
                    placeholder="Введите имя"
                    required
                />
                <input
                    type="text"
                    name="patronymic"
                    placeholder="Введите отчество"
                    required
                />
                <p>
                    <input
                        type="tel"
                        name="phoneNumber"
                        placeholder="Введите номер телефона"
                        required
                    />
                </p>
                <div id="humanTypes">
                    <p>
                        <b>Тип аккаунта:</b>
                    </p>
                    <input
                        type="radio"
                        name="humanType"
                        value="user"
                        required
                    />
                    Пользователь
                    <input
                        type="radio"
                        name="humanType"
                        value="driver"
                        required
                    />
                    Водитель
                </div>
                <p>
                    <input
                        type="submit"
                        name="acceptButton"
                        required
                    />
                </p>
            </form>
        )
    }

    formDataToJson(formData) {
        return JSON.stringify(Object.fromEntries(formData));
    }

    sendRequest(relativeUrlPath, toSend, method) { 
        fetch(
            process.env.REACT_APP_BACKEND_HOST_URL + relativeUrlPath,
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                method: method,
                body: toSend
            }
        );
    }

    handleSubmit(e) {
        e.preventDefault();

        var formData = new FormData(document.getElementById("addAccountForm"));
        var humanType = formData.get("humanType")
        formData.delete(humanType);

        switch(humanType) {
            case 'user':
                this.sendRequest("/users", this.formDataToJson(formData), "post");
            break;
            case 'driver':
                this.sendRequest("/drivers", this.formDataToJson(formData), "post");
            break;
            default:
            console.log("unknown type of user detected");
        }
    }
}

export default AddAccountForm;