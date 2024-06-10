import { useState, useEffect } from "react";
import { AiOutlineCloseSquare } from "react-icons/ai";
import "./ViewMonitor.css"
import "../Monitor/Monitor.css"

const Popup = ({ setMonitorVisible, handleId }) => {
    const [matter, setMatter] = useState([])
    const [monitor, setMonitor] = useState([])
    const [classroom, setClassroom] = useState([])

    useEffect(() => {
        const token = sessionStorage.getItem('token')
        fetch(`http://localhost:3000/monitor/${handleId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error when accessing the method to search for users')
            }
            return response.json()
        })
        .then(data => {
            setMonitor(data)
            setMatter(data.matters)
            setClassroom(data.classrooms)
        })
        .catch(err => {
            console.log(`Error when loading the user in the monitor view popup: ${err}`)
        })
    })

    return (
        <div onClick={setMonitorVisible.bind(this, false)} className="container-popup">
            <div onClick={(e) => e.stopPropagation()} className="container-view-monitor">
                <div className="title-view-monitor">
                    <h2>Dados do monitor</h2>
                    <div onClick={setMonitorVisible.bind(this, false)}>
                        <AiOutlineCloseSquare />
                    </div>
                </div>
                <div className="data-view-monitor">
                    <table>
                        <tr>
                            <td><strong>Monitor</strong></td>
                            <td>{monitor.name}</td>
                        </tr>
                        <tr>
                            <td><strong>Contato</strong></td>
                            <td>{monitor.institutionalEmail}</td>
                        </tr>
                        <tr>
                            <td><strong>Disciplina</strong></td>
                            <td>{matter.name}</td>
                        </tr>
                        <tr>
                            <td><strong>Período atual</strong></td>
                            <td>{monitor.actualPeriod}</td>
                        </tr>
                        <tr>
                            <td><strong>Dias da semana</strong></td>
                            <td>{monitor.daysOfTheWeek}</td>
                        </tr>
                        <tr>
                            <td><strong>Começo</strong></td>
                            <td>{monitor.startHour}</td>
                        </tr>
                        <tr>
                            <td><strong>Fim</strong></td>
                            <td>{monitor.endHour}</td>
                        </tr>
                        <tr>
                            <td><strong>Tipo</strong></td>
                            <td>{monitor.typeOfMonitoring}</td>
                        </tr>
                        <tr>
                            <td><strong>Local</strong></td>
                            <td>{classroom.name}</td>
                        </tr>
                        <tr>
                            <td><strong>Bloco</strong></td>
                            <td>{classroom.block}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Popup;