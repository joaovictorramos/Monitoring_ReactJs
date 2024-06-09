/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Monitor.css";
import "../../App.css";

const Monitor = () => {
    const [datas, setDatas] = useState([])

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
            console.log(data)
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

                <div className="table-monitor">
                    <table>
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
                            {datas.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.matters.name}</td>
                                    <td>{item.startHour}</td>
                                    <td>{item.endHour}</td>
                                    <td>{item.daysOfTheWeek}</td>
                                    <td>{item.classrooms.name}</td>
                                    <td>{item.typeOfMonitoring}</td>
                                    <td><Link to="#">Visualizar</Link></td>
                                    <td><Link to="#">Atualizar</Link></td>
                                    <td><Link to="#">Excluir</Link></td>
                                </tr>
                            ))}                                
                                {/*
                                <td>
                                    <Link className="col-view" to="#">Visualizar</Link>
                                </td>
                                <td>
                                    <Link className="col-update" to="#">Atualizar</Link>
                                </td>
                                <td>
                                    <Link className="col-delete" to="#">Deletar</Link>
                                </td>
                                */}
                        </tbody>
                    </table>
                </div>
            </form>
        </div>
    );
}

export default Monitor