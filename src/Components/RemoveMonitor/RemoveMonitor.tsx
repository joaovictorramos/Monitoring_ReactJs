import { AiOutlineCloseSquare } from "react-icons/ai";
import "./RemoveMonitor.css"
import "../Monitor/Monitor.css"
import { useState } from "react";

const Popup = ({ setRemoveVisible, handleId }: { setRemoveVisible: (visible: boolean) => void; handleId: string }) => {
    const [error, setError] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

    const handleRemoveMonitor = async (event: React.FormEvent) => {
        const token = sessionStorage.getItem('token')
        let errorMessage = ''
        try {
            event.preventDefault()
            const response = await fetch(`http://localhost:3000/monitor/${handleId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            if (response.status === 403) {
                errorMessage = "This options is not permitted for STUDENTS"
                throw new Error('This options is not permitted for STUDENTS')
            } else if (!response.ok) {
                errorMessage = "Unable to delete the monitor."
                throw new Error("Error when deleting the monitor")
            }

            setSuccessMessage("Monitor deleting successfully!")
            setError("")
        } catch (err) {
            setError(errorMessage)
            setSuccessMessage("")
        }
    }

    const loadPage = () => {
        window.location.reload()
    }

    return (
        <div onClick={setRemoveVisible.bind(this, false)} className="container-popup">
            <div onClick={(e) => e.stopPropagation()} className="container-remove-monitor">
                <div className="title-remove-monitor">
                    <h2>Remover monitor</h2>
                    <div onClick={ () => { setRemoveVisible.bind(this, false); loadPage()}} >
                        <AiOutlineCloseSquare />
                    </div>
                </div>
                <div className="option-remove-monitor">
                    <p>Tem certeza?</p>
                    <input type="button" onClick={handleRemoveMonitor} value="Confirmar" />

                    {successMessage && <div className="success-message-delete">{successMessage}</div>}
                    {error && <div className="error-message-delete">{error}</div>}
                </div>
            </div>
        </div>
    )
}

export default Popup;