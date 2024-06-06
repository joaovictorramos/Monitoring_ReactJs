/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FaUser, FaLock } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterUser.css";
import "../../App.css";

const RegisterUser = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        try{
            event.preventDefault()
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "login": username,
                    "password": password
                })
            })
            if (!response.ok) {
                throw new Error("Authentication Failure")
            }
            const json = await response.json()
            sessionStorage.setItem('token', json.access_token)
            navigate('/monitor')
        } catch (err) {
            setError("Unable to perform authentication. Check your email and password.")
            console.log(err)
        }
    }

    const backScreen = () => {
        navigate('/')
    }

    return (
        <div className="App">
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <h1>Cadastrar Usuário</h1>
                    <div className="input-field">
                        <input type="text" placeholder="Nome" required onChange={(e) => setUsername(e.target.value)} />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-field">
                        <input type="email" placeholder="E-mail" required onChange={(e) => setEmail(e.target.value)} />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-field">
                        <input type="password" placeholder="Senha" required onChange={(e) => setPassword(e.target.value)} />
                        <FaLock className="icon" />
                    </div>
                    <div className="input-field">
                        <select id="">
                            <option value="ALUNO">Aluno</option>
                            <option value="PROFESSOR">Professor</option>
                        </select>
                    </div>

                    {error && <div className="error-message-login">{error}</div>}

                    <button className="btn-confirm">Confirmar</button>
                    <button onClick={backScreen}>Voltar</button>
                </form>
            </div>
        </div>
    )
}

export default RegisterUser;