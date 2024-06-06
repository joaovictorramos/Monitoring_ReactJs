/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FaUser, FaLock } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Forgot.css"
import "../../App.css"

const Login = () => {
    const [username, setUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    const handleRecoverPassword = async (event: React.FormEvent) => {
        try{
            event.preventDefault()
            const response = await fetch('http://localhost:3000/users/recoverPassword', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "login": username,
                    "newPassword": newPassword,
                    "confirmPassword": confirmPassword,
                })
            })
            if (!response.ok) {
                throw new Error("Recovery Failure")
            }
            const json = await response.json()
            console.log(response.status)
            console.log(json.access_token)

            sessionStorage.setItem('token', json.access_token)
            setSuccessMessage('Password changed successfully!')
            setError("")
        } catch (err) {
            setError("Unable to recover password. Check your credentials and try again.")
            setSuccessMessage("")
            console.log(err)
        }
    }

    const backScreen = () => {
        navigate('/')
    }

    return (
        <div className="App">
            <div className="container">
            <form onSubmit={handleRecoverPassword}>
                <h1>Trocar senha</h1>
                <div className="input-field">
                    <input type="email" placeholder="E-mail" required onChange={(e) => setUsername(e.target.value)} />
                    <FaUser className="icon" />
                </div>
                <div className="input-field">
                    <input type="password" placeholder="Nova senha" required onChange={(e) => setNewPassword(e.target.value)} />
                    <FaLock className="icon" />
                </div>
                <div className="input-field">
                    <input type="password" placeholder="Confirmar senha" required onChange={(e) => setConfirmPassword(e.target.value)} />
                    <FaLock className="icon" />
                </div>

                {successMessage && <div className="success-message-recover">{successMessage}</div>}
                {error && <div className="error-message-recover">{error}</div>}

                <button className="btn-confirm">Confirmar</button>
                <button onClick={backScreen}>Voltar</button>
            </form>
        </div>
        </div>
    )
}

export default Login;