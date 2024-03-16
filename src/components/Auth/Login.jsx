import {Link} from "react-router-dom"; 
import { useForm } from "../../hooks/useForm";

export default function Login({onRegister}) { 

    const {
        errors: inputError,
        handleChangeInput,
        isFormValid,
        values: inputValue
    } = useForm(); 

    function handleSubmit(e) {
        e.preventDefault();
        onRegister(inputValue);
    } 

    console.log(isFormValid) 

    return(
        <section className='auth'>
            <div className="auth__head">
                <Link className="auth__link-logo link" to="/"/>
                <h1 className="auth__title">Рады видеть!</h1>
            </div>
            <form className='auth__form'
                  onSubmit={handleSubmit}>
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
                        className="auth__button auth__button_login link"
                        disabled={!isFormValid}
                        >Войти</button>
            </form>
            <p className='auth__subtitle'>Еще не зарегистрированы?&ensp;
                <Link to='/signup' className='link-nav link'>Регистрация</Link></p>
        </section>
    )
}