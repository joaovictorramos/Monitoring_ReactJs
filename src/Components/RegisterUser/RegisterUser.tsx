/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FaUser, FaLock } from "react-icons/fa";
import { VscListSelection } from "react-icons/vsc";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterUser.css";
import "../../App.css";

const RegisterUser = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [office, setOffice] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (event: React.FormEvent) => {
        try{
            event.preventDefault()
            console.log(name)
            console.log(email)
            console.log(password)
            console.log(office)
            const response = await fetch('http://localhost:3000/users/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "name": name,
                    "login": email,
                    "password": password,
                    "office": office
                })
            })
            if (!response.ok) {
                throw new Error("Registration Failure")
            }
            const json = await response.json()
            sessionStorage.setItem('token', json.access_token)

            console.log(response.status)
            console.log(json.access_token)

            setSuccessMessage('Registration completed successfully!')
            setError("")
        } catch (err) {
            setError("Unable to register. Review your credentials and try again.")
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
                <form onSubmit={handleRegister}>
                    <h1>Cadastrar Usuário</h1>
                    <div className="input-field">
                        <input type="text" placeholder="Nome" required onChange={(e) => setName(e.target.value)} />
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
                    <div className="input-radio-field">
                        <label htmlFor="student">Aluno
                            <input type="radio" className="input-radio-student" id="student" name="user-type" value="ALUNO" required checked={office === 'ALUNO'} onChange={(e) => setOffice(e.target.value)} />
                        </label>
                        <br />
                        <label htmlFor="teacher">Professor
                            <input type="radio" id="teacher" value="PROFESSOR" name="user-type" required checked={office === 'PROFESSOR'} onChange={(e) => setOffice(e.target.value)} />
                        </label>
                        <VscListSelection className="icon icon-radio" />
                    </div>

                    {successMessage && <div className="success-message-register-user">{successMessage}</div>}
                    {error && <div className="error-message-register-user">{error}</div>}

                    <button className="btn-confirm">Confirmar</button>
                    <button onClick={backScreen}>Voltar</button>
                </form>
            </div>
        </div>
    )
}

export default RegisterUser;