/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FaUser, FaLock } from "react-icons/fa";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
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
            sessionStorage.setItem('userEmail', username)
            navigate('/monitor')
        } catch (err) {
            setError("Unable to perform authentication. Check your email and password.")
            console.log(err)
        }
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h1>Acesse o sistema</h1>
                <div className="input-field">
                    <input type="email" placeholder="E-mail" required onChange={(e) => setUsername(e.target.value)} />
                    <FaUser className="icon" />
                </div>
                <div className="input-field">
                    <input type="password" placeholder="Senha" required onChange={(e) => setPassword(e.target.value)} />
                    <FaLock className="icon" />
                </div>
                <div className="recall-forget">
                    <Link to="/forgot">Esqueceu a senha?</Link>
                </div>

                {error && <div className="error-message-login">{error}</div>}

                <button>Entrar</button>

                <div className="signup-link">
                    <p>
                        Não tem uma conta? <Link to="/registerUser">Registrar</Link>
                    </p>
                </div> 
            </form>
        </div>
    )
}

export default Login;