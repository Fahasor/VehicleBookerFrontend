export default function HumanInfo(
    {
        human = {
            surname: "",
            name: "",
            patronymic: "",
            phoneNumber: "",
        },
        disabled = null,
        onHumanChange = null
    }) {
    function onValueChanged(e) {
        onHumanChange(e.target.name, e.target.value);
    }

    return(
        <div>
            <input
                type="text"
                name="surname"
                value={human.surname}
                placeholder="Введите фамилию"
                autoComplete="off"
                onChange={onValueChanged}
                required
                disabled={disabled}
            />
            <input
                type="text"
                name="name"
                value={human.name}
                placeholder="Введите имя"
                autoComplete="off"
                onChange={onValueChanged}
                required
                disabled={disabled}
            />
            <input
                type="text"
                name="patronymic"
                value={human.patronymic}
                placeholder="Введите отчество"
                autoComplete="off"
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
                    autoComplete="off"
                    onChange={onValueChanged}
                    required
                    disabled={disabled}
                />
            </p>
        </div>
    )
}