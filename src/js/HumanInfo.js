import { Component } from "react";

class HumanInfo extends Component {
    render() {
        return(
            <div>
                <input
                    type="text"
                    name="surname"
                    value={this.props.human.surname}
                    placeholder="Введите фамилию"
                    required
                    disabled={this.props.disabled}
                />
                <input
                    type="text"
                    name="name"
                    value={this.props.human.name}
                    placeholder="Введите имя"
                    required
                    disabled={this.props.disabled}
                />
                <input
                    type="text"
                    name="patronymic"
                    value={this.props.human.patronymic}
                    placeholder="Введите отчество"
                    required
                    disabled={this.props.disabled}
                />
                <p>
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={this.props.human.phoneNumber}
                        placeholder="Введите номер телефона"
                        required
                        disabled={this.props.disabled}
                    />
                </p>
            </div>
        )
    }
}

HumanInfo.defaultProps = {
    human: {
        surname: "",
        name: "",
        patronymic: "",
        phoneNumber: "",
        disabled: ""
    }
}

export default HumanInfo;