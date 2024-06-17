/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "./RegisterMonitor.css";
import "../../App.css";

const RegisterMonitor = () => {
    const [name, setName] = useState("")
    const [registration, setRegistration] = useState("")
    const [email, setEmail] = useState("")
    const [matterId, setMatterId] = useState("")
    const [period, setPeriod] = useState("")

    const [days, setDays] = useState({
        Domingo: false,
        Segunda: false,
        Terça: false,
        Quarta: false,
        Quinta: false,
        Sexta: false,
        Sábado: false,
    });

    const [startHour, setStartHour] = useState("")
    const [endHour, setEndHour] = useState("")
    const [classroomId, setClassroomId] = useState("")
    const [type, setType] = useState("")
    const [usersId, setUsersId] = useState([])

    const [matters, setMatters] = useState([])
    const [classrooms, setClassrooms] = useState([])
    const [daysOfTheWeek, setDaysOfTheWeek] = useState([])
    
    const [error, setError] = useState("")
    const [successMessage, setSucessMessage] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        const token = sessionStorage.getItem('token')
        const userEmail = sessionStorage.getItem('userEmail')
        fetch(`http://localhost:3000/users/login/${userEmail}`, {
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
            setUsersId(data['id'])
        })
        .catch(error => {
            console.log('Error when searching for user id when trying to register a monitor: ', error)
        })
    }, [])

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

    const handleRegisterMonitor = async (event: React.FormEvent) => {
        const token = sessionStorage.getItem('token')
        let errorMessage = ''
        fetch('http://localhost:3000/days-of-the-week', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if(!response.ok) {
                throw new Error('Error when accessing the method to search for days')
            }
            return response.json()
        })
        .then(data => {
            setDaysOfTheWeek(data)
        })
        .catch(error => {
            console.log('Error loading data to fetch days: ', error)
        })

        try {
            event.preventDefault()
            const response = await fetch('http://localhost:3000/monitor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    "registration": registration,
                    "name": name,
                    "actualPeriod": period != null ? parseInt(period) : null,
                    "institutionalEmail": email,
                    "typeOfMonitoring": type,
                    "daysOfTheWeekIds": getFormatDays(),
                    "startHour": getFormatStartHour(),
                    "endHour": getFormatEndHour(),
                    "usersId": usersId,
                    "classroomId": classroomId,
                    "matterId": matterId
                })
            })
            if (response.status === 403) {
                errorMessage = "This options is not permitted for STUDENTS"
                throw new Error('This options is not permitted for STUDENTS')
            } else if (!response.ok) {
                errorMessage = "Unable to register the monitor. Review the items and try again."
                throw new Error("Error when registering the monitor")
            }

            setSucessMessage("Monitor registered successfully!")
            setError("")
        } catch (err) {
            setError(errorMessage)
            setSucessMessage("")
            console.log(err)
        }
    }

    const getFormatEndHour = () => {
        let dateObj = new Date(`1970-01-01T${endHour}Z`);
        let endHourString = dateObj.toISOString().slice(11, 19);
        return endHourString;
    }

    const getFormatStartHour = () => {
        let dateObj = new Date(`1970-01-01T${startHour}Z`);
        let startHourString = dateObj.toISOString().slice(11, 19);
        return startHourString;
    }

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        setDays(prevDays => ({ ...prevDays, [name]: checked }));
    }

    const getFormatDays = () => {
        if (!days.Segunda && !days.Terça && !days.Quarta && !days.Quinta && !days.Sexta && !days.Sábado) {
            alert('Enter the day of the week.')
            throw new Error('Enter the day of the week.')

        }else {
            let daysList = []
            if (days['Domingo']) {
                daysList.push(daysOfTheWeek[0].id)
            }
            if (days['Segunda']) {
                daysList.push(daysOfTheWeek[1].id)
            } 
            if (days['Terça']) {
                daysList.push(daysOfTheWeek[2].id)
            } 
            if (days['Quarta']) {
                daysList.push(daysOfTheWeek[3].id)
            }
            if (days['Quinta']) {
                daysList.push(daysOfTheWeek[4].id)
            } 
            if (days['Sexta']) {
                daysList.push(daysOfTheWeek[5].id)
            } 
            if (days['Sábado']) {
                daysList.push(daysOfTheWeek[6].id)
            }
            console.log(daysList)
            return daysList
        }
    }

    const backScreen = () => {
        navigate('/monitor')
    }

    return (
        <div className="App">
            <div className="container">
                <form onSubmit={handleRegisterMonitor}>
                    <h1>Cadastrar Monitor</h1>
                    <div className="input-field">
                        <input type="text" placeholder="Nome" required onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="input-field">
                        <input type="text" placeholder="N° de matrícula" required onChange={(e) => setRegistration(e.target.value)} />
                    </div>
                    <div className="input-field">
                        <input type="email" placeholder="E-mail institucional" required onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='input-components-field input-select-field'>
                        Disciplina
                        <br /><br />
                        <select required value={matterId} onChange={(e) => setMatterId(e.target.value)}>
                            <option value="" disabled hidden>Selecione uma disciplina</option>
                            {matters.map((item, index) => (
                                <option key={index} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="input-field">
                        <input type="number" placeholder="Período" min={1} max={9} onChange={(e) => setPeriod(e.target.value)} />
                    </div>
                    <div className="input-components-field input-checkbox-field">
                        Dias da semana:
                        <br /><br />
                        {Object.keys(days).map((day, index) => (
                            <label className="checkbox-label" key={index}>
                                {day}
                                <input type="checkbox" name={day} checked={days[day]} onChange={handleCheckboxChange} />
                                <br />
                            </label>
                        ))}
                    </div>
                    <div className="input-components-field input-time-field">
                        <label>
                            Começo:
                            <input className="input-time-start" type="time" required onChange={(e) => setStartHour(e.target.value)} />
                        </label>
                    </div>
                    <div className="input-components-field input-time-field">
                        <label>
                            Fim:
                            <input className="input-time-end" type="time" required onChange={(e) => setEndHour(e.target.value)} />
                        </label>
                    </div>
                    <div className='input-components-field input-select-field'>
                        Sala
                        <br /><br />
                        <select required value={classroomId} onChange={(e) => setClassroomId(e.target.value)}>
                            <option value="" disabled hidden>Selecione uma sala</option>
                            {classrooms.map((item, index) => (
                                <option key={index} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="input-components-field input-radio-field">
                        Tipo de monitoria
                        <br /><br />
                        <label htmlFor="in-person">Presencial
                            <input type="radio" className="input-radio-in-person" id="in-person" name="monitor-type" value="PRESENCIAL" required checked={type === 'PRESENCIAL'} onChange={(e) => setType(e.target.value)} />
                        </label>
                        <br />
                        <label htmlFor="remote">Remoto
                            <input type="radio" className="input-radio-remote" id="remote" name="monitor-type" value="REMOTO" required checked={type === 'REMOTO'} onChange={(e) => setType(e.target.value)} />
                        </label>
                        <br />
                        <label htmlFor="in-person-and-remote">Presencial e Remoto
                            <input type="radio" id="in-person-and-remote" name="monitor-type" value="PRESENCIAL E REMOTO" required checked={type === 'PRESENCIAL E REMOTO'} onChange={(e) => setType(e.target.value)} />
                        </label>
                    </div>

                    {successMessage && <div className="success-message-recover">{successMessage}</div>}
                    {error && <div className="error-message-recover">{error}</div>}

                    <button className="btn-confirm">Confirmar</button>
                    <button onClick={backScreen}>Voltar</button>
                </form>
            </div>
        </div>
    )
}

export default RegisterMonitor