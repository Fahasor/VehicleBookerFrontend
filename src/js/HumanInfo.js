export default function HumanInfo(
    {
        human = {
            surname: "",
            name: "",
            patronymic: "",
            phoneNumber: "",
        },
        disabled = null,
        onHumanChanged = null
    }) {
    function onValueChanged(e) {
        onHumanChanged(e.target.name, e.target.value);
    }

    return(
        <div>
            <input
                type="text"
                name="surname"
                value={human.surname}
                placeholder="Введите фамилию"
                onChange={onValueChanged}
                required
                disabled={disabled}
            />
            <input
                type="text"
                name="name"
                value={human.name}
                placeholder="Введите имя"
                onChange={onValueChanged}
                required
                disabled={disabled}
            />
            <input
                type="text"
                name="patronymic"
                value={human.patronymic}
                placeholder="Введите отчество"
                onChange={onValueChanged}
                required
                disabled={disabled}
            />
            <p>
                <input
                    type="tel"
                    name="phoneNumber"
                    value={human.phoneNumber}
                    placeholder="Введите номер телефона"
                    onChange={onValueChanged}
                    required
                    disabled={disabled}
                />
            </p>
        </div>
    )
}