/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./RegisterAbsence.css"
import "../../App.css"

const RegisterAbsence = () => {
    const { id } = useParams();
    const [date, setDate] = useState("");
    const [justification, setJustification] = useState("");
    const [monitor, setMonitor] = useState("");

    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('token')
        fetch(`http://localhost:3000/monitor/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error when accessing the method to search for monitor')
            }
            return response.json()
        })
        .then(data => {
            setMonitor(data)
        })
        .catch(err => {
            console.log('Error when searching for monitor id when trying to search a monitor: ', err)
        })
    }, [])

    const handleRegisterAbsence = async (event: React.FormEvent) => {
        const token = sessionStorage.getItem('token')
        let errorMessage = ''
        try {
            event.preventDefault()
            const response = await fetch(`http://localhost:3000/absence/createToMonitor`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    "date": getFormatDate(),
                    "justification": justification,
                    "monitorId": id
                })
            })
            if (response.status === 403) {
                errorMessage = "This options is not permitted for STUDENTS"
                throw new Error('This options is not permitted for STUDENTS')
            } else if (!response.ok) {
                errorMessage = 'Unable to register the absence. Review the items and try again.'
                throw new Error("Error when registering the absence")
            }

            setSuccessMessage("Absence registered successfully!")
            setError("")
        } catch (err) {
            setError(errorMessage)
            setSuccessMessage("")
            console.log(err)
        }
    }

    const getFormatDate = () => {
        let dateObj = new Date(`${date}T00:00:00Z`);
        let dateString = dateObj.toISOString().slice(0, 10);
        return dateString;
    }

    const backScreen = () => {
        navigate(`/absence/${id}`)
    }

    return (
        <div className="App">
            <div className="container">
            <h1>Cadastrar Faltas</h1>
                <form onSubmit={handleRegisterAbsence}>
                    <div className="input-field">
                        <input type="date" required onChange={(e) => setDate(e.target.value)} />
                    </div>
                    <div className="input-field">
                        <textarea placeholder="Justificativa da falta (Opcional)" onChange={(e) => setJustification(e.target.value)}></textarea>
                    </div>

                    {successMessage && <div className="success-message-recover">{successMessage}</div>}
                    {error && <div className="error-message-login">{error}</div>}

                    <button>Confirmar</button>
                    <button onClick={backScreen} className="btn-back">Voltar</button>
                </form>
            </div>
        </div>
    )
}

export default RegisterAbsence;