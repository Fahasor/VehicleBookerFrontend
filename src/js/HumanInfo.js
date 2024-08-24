import { Component } from "react";

class HumanInfo extends Component {
    constructor(props) {
        super(props);

        this.onValueChanged = this.onValueChanged.bind(this);
    }

    render() {
        return(
            <div>
                <input
                    type="text"
                    name="surname"
                    value={this.props.human.surname}
                    placeholder="Введите фамилию"
                    onChange={this.onValueChanged}
                    required
                    disabled={this.props.disabled}
                />
                <input
                    type="text"
                    name="name"
                    value={this.props.human.name}
                    placeholder="Введите имя"
                    onChange={this.onValueChanged}
                    required
                    disabled={this.props.disabled}
                />
                <input
                    type="text"
                    name="patronymic"
                    value={this.props.human.patronymic}
                    placeholder="Введите отчество"
                    onChange={this.onValueChanged}
                    required
                    disabled={this.props.disabled}
                />
                <p>
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={this.props.human.phoneNumber}
                        placeholder="Введите номер телефона"
                        onChange={this.onValueChanged}
                        required
                        disabled={this.props.disabled}
                    />
                </p>
            </div>
        )
    }

    onValueChanged(e) {
        this.props.onHumanChange(e.target.name, e.target.value);
    }
}

HumanInfo.defaultProps = {
    human: {
        surname: "",
        name: "",
        patronymic: "",
        phoneNumber: "",
        disabled: "",
        onChange: null
    }
}

export default HumanInfo;