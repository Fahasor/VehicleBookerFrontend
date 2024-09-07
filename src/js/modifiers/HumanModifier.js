export default function HumanModifier(
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
                placeholder="Фамилия"
                autoComplete="off"
                onChange={onValueChanged}
                required
                disabled={disabled}
            />
            <input
                type="text"
                name="name"
                value={human.name}
                placeholder="Имя"
                autoComplete="off"
                onChange={onValueChanged}
                required
                disabled={disabled}
            />
            <input
                type="text"
                name="patronymic"
                value={human.patronymic}
                placeholder="Отчество"
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
                    placeholder="Номер телефона"
                    autoComplete="off"
                    onChange={onValueChanged}
                    required
                    disabled={disabled}
                />
            </p>
        </div>
    )
}