import { useState } from "react";
import { AiOutlineCloseSquare } from "react-icons/ai";
import "./RemoveAbsence.css"

const Popup = ({ setRemoveVisible, handleId }) => {
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleRemoveAbsence = async (event: React.FormEvent) => {
        const token = sessionStorage.getItem('token')
        try {
            event.preventDefault()
            const response = await fetch(`http://localhost:3000/absence/${handleId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })

            if (!response.ok) {
                throw new Error("Error when deleting the absence")
            }

            setSuccessMessage("Absence deleting successfully!")
            setError("")
        } catch (err) {
            setError("Unable to delete the absence.")
            setSuccessMessage("")
        }
    }

    const loadPage = () => {
        window.location.reload()
    }

    return (
        <div onClick={setRemoveVisible.bind(this, false)} className="container-popup">
            <div onClick={(e) => e.stopPropagation()} className="container-remove-absence">
                <div className="title-remove-absence">
                    <h2>Remover falta</h2>
                    <div onClick={ () => { setRemoveVisible.bind(this, false); loadPage(); }}>
                        <AiOutlineCloseSquare />
                    </div>
                </div>
                <div className="option-remove-absence">
                    <p>Tem certeza?</p>
                    <input type="button" onClick={handleRemoveAbsence} value="Confirmar" />

                    {successMessage && <div className="success-message-absence-delete">{successMessage}</div>}
                    {error && <div className="error-message-absence-delete">{error}</div>}
                </div>
            </div>
        </div>
    )
}

export default Popup;