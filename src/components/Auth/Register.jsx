import {Link} from "react-router-dom";
import {useState} from "react";

export default function Register({onRegister}) {
    const [inputValue, setInputValue] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [inputError, setInputError] = useState({});

    function handleSubmit(e) {
        e.preventDefault();
        onRegister(inputValue);
    }

    function handleChangeInput(e) {
        const{name , value, validationMessage} = e.target;
        setInputValue({...inputValue, [name]: value});
        setInputError({...inputError, [name]: validationMessage});
    }

    return (
        <section className='auth'>
            <div className="auth__head">
                <Link className="auth__link-logo link" to="/"/>
                <h1 className="auth__title">Добро пожаловать!</h1>
            </div>
            <form className='auth__form'
                  onSubmit={handleSubmit}>
                <label className="auth__label">Имя
                    <input
                        type="text"
                        className='auth__input'
                        name="name"
                        placeholder="Введите имя"
                        required
                        onChange={handleChangeInput}
                        value={inputValue.name}
                    />
                    <span className="auth__span-error">{inputError.name}</span>
                </label>
                <label className="auth__label">E-mail
                    <input
                        required
                        className='auth__input'
                        type="email"
                        name="email"
                        placeholder="Введите E-mail"
                        onChange={handleChangeInput}
                        value={inputValue.email}
                    />
                    <span className="auth__span-error">{inputError.email}</span>
                </label>
                <label className="auth__label">Пароль
                    <input
                        className='auth__input'
                        required
                        type="password"
                        name="password"
                        placeholder="Придумайте пароль"
                        minLength={4}
                        maxLength={16}
                        onChange={handleChangeInput}
                        value={inputValue.password}
                    />
                    <span className="auth__span-error">{inputError.password}</span>
                </label>
                <button type="submit"
                        className="auth__button auth__button_register link">Зарегистрироваться</button>
            </form>
            <p className='auth__subtitle'>Уже зарегистрированы?&ensp;
                <Link to='/signin' className='link-nav link'>Войти</Link></p>
        </section>
    )}