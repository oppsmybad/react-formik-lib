import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import * as Yup from "yup";

// Текстовый инпут
const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.name}>{label}</label>
            <input {...props} {...field} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    );
};

// Чекбокс
const MyCheckbox = ({ children, ...props }) => {
    const [field, meta] = useField({ ...props, type: "checkbox" });
    return (
        <>
            <label className="checkbox">
                <input type="checkbox" {...props} {...field} />
                {children}
            </label>

            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    );
};

// Поле с количеством
const MyAmount = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.name}>{label}</label>
            <input {...props} {...field} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    );
};

// Выпадающий список валют
const MyCurrencySelect = ({ label, options, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div className="form-group">
            <label htmlFor={props.id || props.name}> {label}</label>
            <select {...field} {...props}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    );
};

const currencyOptions = [
    { value: "", label: "Выберите валюту" },
    { value: "USD", label: "USD" },
    { value: "UAH", label: "UAH" },
    { value: "RUB", label: "RUB" },
];

// Текстовое поле
const MyTextArea = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div className="form-group">
            <label htmlFor={props.id || props.name}> {label}</label>
            <textarea {...field} {...props} />

            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    );
};

const CustomForm = () => {
    return (
        <Formik
            initialValues={{
                name: "",
                email: "",
                amount: "0",
                currency: "",
                text: "",
                terms: false,
            }}
            validationSchema={Yup.object({
                name: Yup.string()
                    .min(2, "Минимум 2 символа!")
                    .required("Обязательное поле"),
                email: Yup.string()
                    .email("Неправильный email адрес")
                    .required("Обязательное поле"),
                amount: Yup.number()
                    .min(5, "Не менее 5")
                    .required("Обязательное поле"),
                currency: Yup.string().required("Выберите валюту"),
                text: Yup.string().min(10, "Не менее 10 символов"),
                terms: Yup.boolean()
                    .required("Необходимо согласие")
                    .oneOf([true], "Необходимо согласие"),
            })}
            onSubmit={(values) => console.log(JSON.stringify(values, null, 2))}
        >
            <Form className="form">
                <h2>Отправить пожертвование</h2>
                <MyTextInput
                    label="Ваше имя"
                    id="name"
                    name="name"
                    type="text"
                />
                <MyTextInput
                    label="Ваша почта"
                    id="email"
                    name="email"
                    type="email"
                />
                <MyAmount
                    label="Количество"
                    htmlFor="amount"
                    id="amount"
                    name="amount"
                    type="number"
                />
                <MyCurrencySelect
                    label="Валюта"
                    name="currency"
                    id="currency"
                    options={currencyOptions}
                />

                <MyTextArea label="Ваше сообщение" name="text" id="text" />

                <MyCheckbox name="terms">
                    Соглашаетесь с политикой конфиденциальности?
                </MyCheckbox>
                <button type="submit">Отправить</button>
            </Form>
        </Formik>
    );
};

export default CustomForm;
