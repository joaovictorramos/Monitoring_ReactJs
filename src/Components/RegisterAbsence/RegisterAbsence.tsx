import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterAbsence.css"
import "../../App.css"

const RegisterAbsence = () => {
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const backScreen = () => {
        navigate('/absence')
    }

    return (
        <div className="App">
            <div className="container">
                <form>
                    <h1>Cadastrar Faltas</h1>
                    <div className="input-field">
                        <input type="date" required />
                    </div>
                    <div className="input-field">
                        <textarea placeholder="Justificativa da falta (Opcional)"></textarea>
                    </div>

                    {error && <div className="error-message-login">{error}</div>}
                    <button>Confirmar</button>
                    <button onClick={backScreen} className="btn-back">Voltar</button>
                </form>
            </div>
        </div>
    )
}

export default RegisterAbsence;