/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Monitor.css";
import "../../App.css";
import ViewMonitor from '../ViewMonitor/ViewMonitor';
import UpdateMonitor from '../UpdateMonitor/UpdateMonitor';
import RemoveMonitor from '../RemoveMonitor/RemoveMonitor';

const Monitor = () => {
    const [datas, setDatas] = useState([])
    const [handleId, setHandleId] = useState("")
    const [updateVisible, setUpdateVisible] = useState(false)
    const [removeVisible, setRemoveVisible] = useState(false)
    const [monitorVisible, setMonitorVisible] = useState(false)

    const handleClick = (id: string) => {
        setMonitorVisible(true);
        setHandleId(id);
    };

    const handleUpdateClick = (id: string) => {
        setUpdateVisible(true);
        setHandleId(id);
    }

    const handleRemoveCick = (id: string) => {
        setRemoveVisible(true);
        setHandleId(id);
    }

    useEffect(() => {
        const token = sessionStorage.getItem('token')
        fetch('http://localhost:3000/monitor', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if(!response.ok) {
                throw new Error('Error when accessing the method to search for monitors')
            }
            return response.json()
        })
        .then(data => {
            setDatas(data)
        })
        .catch(error => {
            console.log('Error loading data to fetch monitors: ', error)
        })
    }, [])

    return(
        <div className="container-monitor">
            <form>
                <h1>Monitores</h1>
                <div className="btn-monitor">
                    <ul>
                        <li><Link to="/RegisterMonitor">Cadastrar Monitor</Link></li>
                        <li><Link to="/">Voltar</Link></li>
                    </ul>
                </div>
                <hr />

                <div className="table-monitor-container">
                    <table className='table-monitor'>
                        <thead>
                            <tr>
                                <th>Monitor</th>
                                <th>Matéria</th>
                                <th>Começo</th>
                                <th>Fim</th>
                                <th>Dias da Semana</th>
                                <th>Local</th>
                                <th>Tipo</th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            { datas.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.matterId.name}</td>
                                    <td>{item.startHour}</td>
                                    <td>{item.endHour}</td>
                                    <td>
                                        {item.daysOfTheWeekIds.map((day, index) => (
                                            <span key={index}>{day.daysWeek}{index < item.daysOfTheWeekIds.length - 1 ? ', ' : ''}</span>
                                        ))}
                                    </td>
                                    <td>{item.classroomId.name}</td>
                                    <td>{item.typeOfMonitoring}</td>
                                    <td>
                                        <Link to="#" onClick={(e) => { e.preventDefault(); handleClick(item.id); }} >Visualizar</Link>
                                        {monitorVisible && handleId === item.id && <ViewMonitor setMonitorVisible={setMonitorVisible} handleId={handleId} />}
                                    </td>
                                    <td>
                                        <Link to="#" onClick={(e) => { e.preventDefault(); handleUpdateClick(item.id); }}>Editar</Link>
                                        {updateVisible && handleId === item.id && <UpdateMonitor setUpdateVisible={setUpdateVisible} handleId={handleId} />}
                                    </td>
                                    <td>
                                        <Link to="#" onClick={(e) => { e.preventDefault(); handleRemoveCick(item.id); }}>Excluir</Link>
                                        {removeVisible && handleId === item.id && <RemoveMonitor setRemoveVisible={setRemoveVisible} handleId={handleId} />}
                                    </td>
                                </tr>
                            ))}   
                        </tbody>
                    </table>
                </div>
            </form>
        </div>
    );
}

export default Monitor