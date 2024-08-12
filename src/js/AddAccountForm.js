import { Component } from "react";

class AddAccountForm extends Component {
    render() {
        return (
            <form>
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
                <div>
                    <p>
                        <b>Тип аккаунта:</b>
                    </p>
                    <input
                        type="radio"
                        name="humanType"
                        required
                    />
                    Пользователь
                    <input
                        type="radio"
                        name="humanType"
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
}

export default AddAccountForm;