import {useState} from "react";

export default function Profile({user, onUpdateUser, logout}) {

    const [inputEditProfile, setInputEditProfile] = useState({
        name: user.name,
        email: user.email
    })
    const [inputEdit, setInputEdit] = useState(false) // состояние disabled

    function handleEditInput(e) {
        const{name , value} = e.target;
        setInputEditProfile({...inputEditProfile, [name]: value})
    }

    function handleSaveEdit(e) {
        e.preventDefault()
        setInputEdit(false)
        onUpdateUser(inputEditProfile)
    }

    return(
        <section className="profile">
            <h2 className="profile__title">Привет, {user.name}!</h2>
            <form className="profile__form">
                <label className="profile__label">Имя
                    <input
                        type="text"
                        className="profile__input"
                        name="name"
                        minLength={2}
                        required
                        value={inputEditProfile.name}
                        onChange={handleEditInput}
                        disabled={!inputEdit}
                    />
                </label>
                <label className="profile__label">E-mail
                    <input
                        className='profile__input'
                        type="email"
                        name="email"
                        required
                        placeholder="Введите E-mail"
                        onChange={handleEditInput}
                        value={inputEditProfile.email}
                        disabled={!inputEdit}
                    />
                </label>
            </form>
            {!inputEdit ? (
                <div className="profile__btn">
                    <button type="submit" className="profile__editButton link" onClick={() => setInputEdit(true)}>Редактировать</button>
                    <button type="submit" className="profile__logoutButton link" onClick={logout}>Выйти из аккаунта</button>
                </div>
            ) : (
                <button type="submit" className="profile__saveEditButton link" onClick={handleSaveEdit}>Сохранить</button>
            )}
        </section>
    )
}