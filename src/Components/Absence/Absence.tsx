/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Absence.css"
import "../../App.css"

const Absence = () => {
    const { id } = useParams();
    const [monitor, setMonitor] = useState("");
    const [absences, setAbsences] = useState([]);
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
                throw new Error(`Error when accessing the method to search for monitor in the Absence class`)
            }
            return response.json()
        })
        .then(data => {
            setMonitor(data)
        })
        .catch(err => {
            console.log(`Error when accessing when accessing the method to search for monitor in the Absence class: ${err}`)
        })
    }, [])

    // FAZER O ENDPOINT PARA BUSCAR AS FALTAS PELO ID DO MONITOR
    useEffect(() => {
        const token = sessionStorage.getItem('token')
        fetch(`http://localhost:3000/absence/monitor/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error when accessing the method to search for absence in the Absence class`)
            }
            return response.json()
        })
        .then(data => {
            console.log(data)
            setAbsences(data)
        })
        .catch(err => {
            console.log(`Error when accessing the method to search for absence in the Absence class: ${err}`)
        })
    }, [])

    const advanceScreen = () => {
        navigate('/registerAbsence')
    }

    const backScreen = () => {
        navigate('/monitor')
    }

    return (
        <div className="App">
            <div className="container">
                <div>
                    <h1>Visualizar Faltas</h1>
                    <table className="absence-table">
                        <thead>
                            <tr>
                                <th>Monitor</th>
                                <th>Data</th>
                                <th>Justificativa</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            {absences.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.monitorId.name}</td>
                                    <td>{item.date}</td>
                                    <td>{item.justification}</td>
                                </tr>
                            ))}
                            
                        </tbody>
                    </table>

                    <button onClick={advanceScreen}>Cadastrar Falta</button>
                    <button onClick={backScreen} className="btn-back">Voltar</button>
                </div>
            </div>
        </div>
    )
}

export default Absence;