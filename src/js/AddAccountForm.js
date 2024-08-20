import { Component } from "react";
import HumanInfo from "./HumanInfo";

class AddAccountForm extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            <form id="addAccountForm" onSubmit={this.handleSubmit}>
                <HumanInfo/>
                <select 
                    name="humanType"
                    required
                >
                    <option value="driver">Водитель</option>
                    <option value="user">Пользователь</option>
                </select>
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

    async sendRequest(relativeUrlPath, toSend, method) { 
        return await fetch(
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
        var humanType = formData.get("humanType");
        formData.delete(humanType);
        var url = "";

        switch(humanType) {
            case 'user':
                url = "/users";
            break;
            case 'driver':
                url = "/drivers";
            break;
            default:
            console.log("unknown type of user detected");
            return;
        }

        this.sendRequest(url, this.formDataToJson(formData), "post");
    }
}

export default AddAccountForm;