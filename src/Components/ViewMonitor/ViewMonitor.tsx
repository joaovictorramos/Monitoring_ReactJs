/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { AiOutlineCloseSquare } from "react-icons/ai";
import "./ViewMonitor.css"
import "../Monitor/Monitor.css"
import MonitorData from "../interfaces/Monitor.interface";
import MatterData from "../interfaces/Matter.interfaces";
import ClassroomData from "../interfaces/Classroom.interfaces";

const Popup = ({ setMonitorVisible, handleId }: { setMonitorVisible: (visible: boolean) => void; handleId: string; }) => {
    const [matter, setMatter] = useState<MatterData | null>(null);
    const [monitor, setMonitor] = useState<MonitorData | null>(null);
    const [classroom, setClassroom] = useState<ClassroomData | null>(null);

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
            return response.json() as Promise<MonitorData>
        })
        .then(data => {
            setMonitor(data)
            setMatter(data.matterId)
            setClassroom(data.classroomId)
            console.log(monitor)
        })
        .catch(err => {
            console.log(`Error when loading the user in the monitor view popup: ${err}`)
        })
    }, [])

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
                            <td>{monitor?.name}</td>
                        </tr>
                        <tr>
                            <td><strong>Contato</strong></td>
                            <td>{monitor?.institutionalEmail}</td>
                        </tr>
                        <tr>
                            <td><strong>Disciplina</strong></td>
                            <td>{matter?.name}</td>
                        </tr>
                        <tr>
                            <td><strong>Período atual</strong></td>
                            <td>{monitor?.actualPeriod}</td>
                        </tr>
                        <tr>
                            <td><strong>Dias da semana</strong></td>
                            <td>
                                {monitor && monitor.daysOfTheWeekIds ? monitor.daysOfTheWeekIds.map((day, index) => (
                                    <span key={index}>{day.daysWeek}{index < monitor.daysOfTheWeekIds.length - 1 ? ', ' : ''}</span>
                                )) : ''}
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Começo</strong></td>
                            <td>{monitor?.startHour}</td>
                        </tr>
                        <tr>
                            <td><strong>Fim</strong></td>
                            <td>{monitor?.endHour}</td>
                        </tr>
                        <tr>
                            <td><strong>Tipo</strong></td>
                            <td>{monitor?.typeOfMonitoring}</td>
                        </tr>
                        <tr>
                            <td><strong>Local</strong></td>
                            <td>{classroom?.name}</td>
                        </tr>
                        <tr>
                            <td><strong>Bloco</strong></td>
                            <td>{classroom?.block}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Popup;