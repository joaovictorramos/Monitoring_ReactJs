import { useState } from "react";
import { AiOutlineCloseSquare } from "react-icons/ai";
import "./UpdateAbsence.css"

const Popup = ({ setUpdateVisible, handleId }) => {
    const [date, setDate] = useState("");
    const [justification, setJustification] = useState("");

    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleUpdateAbsence = async (event: React.FormEvent) => {
        const token = sessionStorage.getItem('token')
        event.preventDefault()

        const bodyFormatter = {}
        if (date != '' && date !== undefined && date != null) {
            bodyFormatter["date"] = getFormatDate()
        }
        if (justification.trim() != '' && justification.trim() !== undefined && justification != null) {
            bodyFormatter["justification"] = justification
        }
        if (Object.keys(bodyFormatter).length !== 0) {
            try {
                const response = await fetch(`http://localhost:3000/absence/${handleId}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(
                        bodyFormatter
                    )
                })

                if (!response.ok) {
                    throw new Error("Error when updating absence")
                }

                setSuccessMessage("Absence updated successfully!")
                setError("")
            } catch (err) {
                setError("Unable to update the absence. Review the items and try again.")
                setSuccessMessage("")
                console.log(err)
            }
        } else {
            setError("Unable to update the absence. Review the items and try again.")
            setSuccessMessage("")
        }
    }

    const getFormatDate = () => {
        let dateObj = new Date(`${date}T00:00:00Z`);
        let dateString = dateObj.toISOString().slice(0, 10);
        return dateString;
    }

    const loadPage = () => {
        window.location.reload()
    }

    return (
        <div onClick={setUpdateVisible.bind(this, false)} className="container-popup">
            <div onClick={(e) => e.stopPropagation()} className="container-update-absence">
                <div className="title-update-absence">
                    <h2>Atualizar falta</h2>
                    <div onClick={ () => { setUpdateVisible.bind(this, false); loadPage(); }}>
                        <AiOutlineCloseSquare />
                    </div>
                </div>
                <form onSubmit={handleUpdateAbsence} className="update-absence-form">
                    <div>
                        <input type="date" onChange={(e) => setDate(e.target.value)} />
                    </div>
                    <div>
                        <textarea placeholder="Justificativa da falta (Opcional)" onChange={(e) => setJustification(e.target.value)}></textarea>
                    </div>
                    <input type="button" value="Confirmar" onClick={handleUpdateAbsence} />

                    {successMessage && <p className="success-message-update-absence">{successMessage}</p>}
                    {error && <p className="error-message-update-absence">{error}</p>}
                </form>
            </div>
        </div>
    )
}

export default Popup;