import { useState, useEffect } from "react";
import { AiOutlineCloseSquare } from "react-icons/ai";
import "./UpdateMonitor.css"
import "../Monitor/Monitor.css"

const Popup = ({ setUpdateVisible, handleId }) => {
    const [matter, setMatter] = useState([])
    const [monitor, setMonitor] = useState([])
    const [classroom, setClassroom] = useState([])

    const [matters, setMatters] = useState([])
    const [classrooms, setClassrooms] = useState([])

    useEffect(() => {
        const token = sessionStorage.getItem('token')
        fetch(`http://localhost:3000/monitor`, {
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

    useEffect(() => {
        const token = sessionStorage.getItem('token')

        {/* MATTER */}
        fetch('http://localhost:3000/matter', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if(!response.ok) {
                throw new Error('Error when accessing the method to search for matters')
            }
            return response.json()
        })
        .then(data => {
            setMatters(data)
        })
        .catch(error => {
            console.log('Error loading data to fetch matters: ', error)
        })
    
        {/* CLASSROOM */}
        fetch('http://localhost:3000/classroom', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if(!response.ok) {
                throw new Error('Error when accessing the method to search for classrooms')
            }
            return response.json()
        })
        .then(data => {
            setClassrooms(data)
        })
        .catch(error => {
            console.log('Error loading data to fetch classrooms: ', error)
        })
    }, [])

    return (
        <div onClick={setUpdateVisible.bind(this, false)} className="container-popup">
            <div onClick={(e) => e.stopPropagation()} className="container-update-monitor">
                <div className="title-update-monitor">
                    <h2>Atualizar monitor</h2>
                    <div onClick={setUpdateVisible.bind(this, false)}>
                        <AiOutlineCloseSquare />
                    </div>
                </div>
                <form className="update-monitor-form">
                    <div className="update-absence">
                        <a href="#">Visualizar faltas</a>
                    </div>
                    <div>
                        <input type="text" placeholder="Nome" />
                    </div>
                    <div>
                        <input type="text" placeholder="N° de matrícula" />
                    </div>
                    <div>
                        <input type="text" placeholder="E-mail institucional" />
                    </div>
                    <div>
                        <input type="number" placeholder="Período atual"/>
                    </div>
                    <div>
                        <p>Disciplina</p>
                        <select>
                            <option value="" disabled hidden>Selecione uma disciplina</option>
                            <option value="">Não mudar</option>
                            {matters.map((item, index) => (
                                <option key={index} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>
                            <p>Começo:</p>
                            <input type="time" className="update-monitor-time" />
                        </label>
                    </div>
                    <div>
                        <label>
                            <p>Fim:</p>
                            <input type="time" className="update-monitor-time" />
                        </label>
                    </div>
                    <div className="update-monitor-type">
                        <p>Tipo de monitoria</p>
                        <label htmlFor="in-person">Presencial
                            <input type="radio" id="in-person" name="monitor-type" value="PRESENCIAL" />
                        </label>
                        <br />
                        <label htmlFor="remote">Remoto
                            <input type="radio" id="in-remote" name="monitor-type" value="REMOTO" />
                        </label>
                        <br />
                        <label htmlFor="in-person-and-remote">Presencial e Remoto
                            <input type="radio" id="in-person-and-remote" name="monitor-type" value="PRESENCIAL E REMOTO" />
                        </label>
                    </div>
                    <div>
                        <p>Sala</p>
                        <select>
                            <option value="" disabled hidden>Selecione uma sala</option>
                            <option value="">Não mudar</option>
                            {classrooms.map((item, index) => (
                                <option key={index} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <input type="text" placeholder="Bloco" />
                    </div>

                    <button>Confirmar</button>
                </form>
            </div>
        </div>
    )
}

export default Popup;