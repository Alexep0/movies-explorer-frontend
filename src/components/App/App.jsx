import { Route, Routes, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Header from "../Header/Header";
import { useState } from "react";
import NotFound from "../NotFound/NotFound";
import Register from "../Auth/Register";
import Login from "../Auth/Login";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import MenuPopup from "../MenuPopup/MenuPopup";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import MainApi from "../../utils/MainApi";
import { useEffect } from "react";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
    const navigate = useNavigate()

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isMenu, setIsMenu] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [isSuccess, setIsSuccess] = useState(false)
    const [isInfoToolTip, setIsInfoToolTip] = useState(false)

    const [user, setUser] = useState({})

    const mainApi = new MainApi();

    function handleRegister(data) {
        const { name, email, password } = data;
        mainApi.signUp(name, email, password).then(res => {
            if (res._id) {
                handleLogin({ email, password });
            }
        })
            .catch((err) => {
                console.log(err)
                setIsSuccess(false)
                setIsInfoToolTip(true)
            })
    }


    function handleLogin(data) {
        const { email, password } = data;

        mainApi.signIn(email, password)
            .then(res => {
                if (res) {
                    localStorage.setItem('jwt', res.token)
                    setIsLoggedIn(true)
                    navigate('/movies', { replace: true })

                    setIsSuccess(true)
                    setIsInfoToolTip(true)
                }
            })
            .catch((err) => {
                console.log(err)
                setIsSuccess(false)
                setIsInfoToolTip(true)
            })
    }

    function handleUpdateProfile(data) {
        const jwt = localStorage.getItem('jwt');

        mainApi.updateUser(data.name, data.email, jwt)
            .then(() => {
                setUser({
                    ...user,
                    name: data.name,
                    email: data.email
                })
                setIsInfoToolTip(true)
                setIsSuccess(true)
            })
            .catch((err) => {
                console.log(err)
                setIsSuccess(false)
                setIsInfoToolTip(true)
            })
    }

    function handleLogOut() {
        setIsLoggedIn(false)
        setUser({});
        localStorage.clear();
        navigate('/', { replace: true })
    }

    function handleOpenMenu() {
        setIsMenu(true)
    }

    function handleClosePopup() {
        setIsMenu(false)
        setIsInfoToolTip(false)
    }

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');

        if (jwt) {
            setIsLoading(true)
            mainApi.getUser(jwt)
                .then(res => {
                    setIsLoggedIn(true);
                    navigate(window.location.pathname)
                })
                .catch((err) => {
                    console.log(err)
                })
                .finally(() => {
                    setIsLoading(false)
                })
        } else {
            setIsLoading(false);
        }
    }, [])

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');

        if (jwt && isLoggedIn) {
            mainApi.getUser(jwt)
                .then(res => setUser(res.data))
                .catch((err) => {
                    console.log(err)
                })
        }
    }, [isLoggedIn])

    return (
        <>
            <Header auth={isLoggedIn} openMenu={handleOpenMenu} />

            <Routes>
                <Route path="/"
                    element={<Main />} />
                <Route path="/signup"
                    element={
                        <ProtectedRoute isAuth={!isLoggedIn} loading={isLoading}>
                            <Register onRegister={handleRegister} />
                        </ProtectedRoute>
                    } />
                <Route path="/signin"
                    element={
                        <ProtectedRoute isAuth={!isLoggedIn} loading={isLoading}>
                            <Login onRegister={handleLogin} />
                        </ProtectedRoute>
                    } />
                <Route path="/profile"
                    element={
                        <ProtectedRoute isAuth={isLoggedIn} loading={isLoading}>
                            <Profile user={user}
                                onUpdateUser={handleUpdateProfile}
                                logout={handleLogOut} />
                        </ProtectedRoute>
                    } />
                <Route path="/movies"
                    element={
                        <ProtectedRoute isAuth={isLoggedIn} loading={isLoading}>
                            <Movies />
                        </ProtectedRoute>} />
                <Route path="/saved-movies"
                    element={
                        <ProtectedRoute isAuth={isLoggedIn} loading={isLoading}>
                            <SavedMovies />
                        </ProtectedRoute>
                    } />
                <Route path="*"
                    element={<NotFound />} />
            </Routes>

            <Footer />

            <MenuPopup
                isOpen={isMenu}
                onClose={handleClosePopup}
            />

            <InfoTooltip
                isSuccess={isSuccess}
                isOpen={isInfoToolTip}
                onClose={handleClosePopup}
            />
        </>
    )
}

export default App;
