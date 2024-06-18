/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { AiOutlineCloseSquare } from "react-icons/ai";
import "./UpdateMonitor.css"
import "../Monitor/Monitor.css"
import { Link } from "react-router-dom";

const Popup = ({ setUpdateVisible, handleId }: { setUpdateVisible: (visible: boolean) => void; handleId: string }) => {
    const [name, setName] = useState("")
    const [registration, setRegistration] = useState("")
    const [email, setEmail] = useState("")
    const [matterId, setMatterId] = useState("")
    const [period, setPeriod] = useState<number | null>(null)

    const [days, setDays] = useState<{ [key: string]: boolean }>({
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

    const [matters, setMatters] = useState<any[]>([])
    const [classrooms, setClassrooms] = useState<any[]>([])
    const [daysOfTheWeek, setDaysOfTheWeek] = useState<any[]>([])
    
    const [error, setError] = useState("")
    const [successMessage, setSucessMessage] = useState("")

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

    const handleUpdateMonitor = async (event: React.FormEvent) => {
        const token = sessionStorage.getItem('token')
        let errorMessage = ''

        event.preventDefault()
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

        const bodyFormatter: Record<string, any> = {}
        if (name.trim() != '' && name.trim() !== undefined && name.trim() != null) {
            bodyFormatter["name"] = name
        }
        if (registration.trim() != '' && registration.trim() !== undefined && registration.trim() != null) {
            bodyFormatter["registration"] = registration
        }
        if (email.trim() != '' && email.trim() !== undefined && name.trim() != null) {
            if (handleSetEmail(email.trim()))
                bodyFormatter["institutionalEmail"] = email
        }
        if (period !== undefined && period != null) {
            bodyFormatter["actualPeriod"] = period
        }
        if (matterId != '' && matterId !== undefined && matterId != null) {
            bodyFormatter["matterId"] = matterId
        }
        if (startHour != '' && startHour !== undefined && startHour != null) {
            bodyFormatter["startHour"] = getFormatStartHour()
        }
        if (endHour != '' && endHour !== undefined && endHour != null) {
            bodyFormatter["endHour"] = getFormatEndHour()
        }
        if (type != '' && type !== undefined && type != null) {
            bodyFormatter["typeOfMonitoring"] = type
        }
        if (classroomId != '' && classroomId !== undefined && classroomId != null) {
            bodyFormatter['classroomId'] = classroomId
        }
        if (days.Domingo || days.Segunda || days.Terça || days.Quarta || days.Quinta || days.Sexta || days.Sábado) {
            bodyFormatter['daysOfTheWeekIds'] = getFormatDays()
        }
       
        if (Object.keys(bodyFormatter).length !== 0) {
            try {
                const response = await fetch(`http://localhost:3000/monitor/${handleId}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(
                        bodyFormatter
                    )
                })
                if (response.status === 403) {
                    errorMessage = "This options is not permitted for STUDENTS"
                    throw new Error('This options is not permitted for STUDENTS')
                } else if (!response.ok) {
                    errorMessage = "Unable to update the monitor. Review the items and try again."
                    throw new Error("Error when updating monitor")
                }
                
                setSucessMessage("Monitor updated successfully!")
                setError("")
            } catch (err) {
                setError(errorMessage)
                setSucessMessage("")
                console.log(err)
            }
        } else {
            setError(errorMessage)
            setSucessMessage("")
        }
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
            const daysList = []
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

    const handleSetEmail = (emailValue: string) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if(emailRegex.test(emailValue)) {
          setEmail(emailValue)
          return true
        } else {
          alert("The email is not valid")
          return false
        }
        
    }

    const getFormatEndHour = () => {
        const dateObj = new Date(`1970-01-01T${endHour}Z`);
        const endHourString = dateObj.toISOString().slice(11, 19);
        return endHourString;
    }

    const getFormatStartHour = () => {
        const dateObj = new Date(`1970-01-01T${startHour}Z`);
        const startHourString = dateObj.toISOString().slice(11, 19);
        return startHourString;
    }

    const loadPage = () => {
        window.location.reload()
    }

    return (
        <div onClick={setUpdateVisible.bind(this, false)} className="container-popup">
            <div onClick={(e) => e.stopPropagation()} className="container-update-monitor">
                <div className="title-update-monitor">
                    <h2>Atualizar monitor</h2>
                    <div onClick={ () => { setUpdateVisible.bind(this, false); loadPage() }}>
                        <AiOutlineCloseSquare />
                    </div>
                </div>
                <form onSubmit={handleUpdateMonitor} className="update-monitor-form">
                    <div className="update-absence">
                        <Link to={`/absence/${handleId}`}>Visualizar faltas</Link>
                    </div>
                    <div>
                        <input type="text" placeholder="Nome" onChange={(e) => { e.preventDefault(); setName(e.target.value); }} />
                    </div>
                    <div>
                        <input type="text" placeholder="N° de matrícula" onChange={(e) => { e.preventDefault(); setRegistration(e.target.value) }} />
                    </div>
                    <div>
                        <input type="email" placeholder="E-mail institucional" onChange={(e) => { e.preventDefault(); setEmail(e.target.value) }} />
                    </div>
                    <div>
                        <input type="number" placeholder="Período atual" min={1} max={9} onChange={(e) => { e.preventDefault(); setPeriod(parseInt(e.target.value)) }} />
                    </div>
                    <div>
                        <p>Disciplina</p>
                        <select value={matterId} onChange={(e) => { e.preventDefault(); setMatterId(e.target.value)} }>
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
                            <input type="time" className="update-monitor-time" onChange={(e) => { e.preventDefault(); setStartHour(e.target.value)} } />
                        </label>
                    </div>
                    <div>
                        <label>
                            <p>Fim:</p>
                            <input type="time" className="update-monitor-time" onChange={(e) => { e.preventDefault(); setEndHour(e.target.value)} } />
                        </label>
                    </div>
                    <div className="update-monitor-type">
                        <p>Tipo de monitoria</p>
                        <label htmlFor="in-person">Presencial
                            <input type="radio" id="in-person" name="monitor-type" value="PRESENCIAL" onChange={(e) => { e.preventDefault(); setType(e.target.value)} } />
                        </label>
                        <br />
                        <label htmlFor="remote">Remoto
                            <input type="radio" id="in-remote" name="monitor-type" value="REMOTO" onChange={(e) => { e.preventDefault(); setType(e.target.value)} } />
                        </label>
                        <br />
                        <label htmlFor="in-person-and-remote">Presencial e Remoto
                            <input type="radio" id="in-person-and-remote" name="monitor-type" value="PRESENCIAL E REMOTO" onChange={(e) => { e.preventDefault(); setType(e.target.value)} } />
                        </label>
                    </div>
                    <div className="update-monitor-checkbox">
                        Dias da semana:
                        <br /><br />
                        {Object.keys(days).map((day, index) => (
                            <label key={index}>
                                {day}
                                <input type="checkbox" name={day} checked={days[day]} onChange={handleCheckboxChange} />
                                <br />
                            </label>
                        ))}
                    </div>
                    <div>
                        <p>Sala</p>
                        <select value={classroomId} onChange={(e) => { e.preventDefault(); setClassroomId(e.target.value)} }>
                            <option value="" disabled hidden>Selecione uma sala</option>
                            <option value="">Não mudar</option>
                            {classrooms.map((item, index) => (
                                <option key={index} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {successMessage && <div className="success-message-recover">{successMessage}</div>}
                    {error && <div className="error-message-recover">{error}</div>}

                    <input type="button" value="Confirmar" onClick={handleUpdateMonitor} />
                </form>
            </div>
        </div>
    )
}

export default Popup;