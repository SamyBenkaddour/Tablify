import '../../styles/Modal.css';


function Modal({ isOpen, onClose, tableId }) {
   
    if (!isOpen) return null
 
    return (

        <div className="modal-overlay" onClick={onClose}>
            <div id="reservation-modal" className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-content">
                   
                    <h2>Réserver la Table <span id="selected-table">{tableId}</span></h2>
                    <label>Nom:</label>
                    <input type="text" id="name" required />
                    <label>Date:</label>
                    <input type="date" id="date" required />
                    <label>Heure:</label>
                    <select id="time">
                        {[
                             "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"
                                ].map((time) => (
                            <option key={time} value={time}>
                                {time}
                            </option>
                        ))}
                    </select>
                    <button id="book-btn" type='submit'>Réserver</button>
                    <button type="button" onClick={onClose}>Annuler</button>
                </div>

            </div>
         </div>
    );

}

export default Modal;