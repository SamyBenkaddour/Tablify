import React, { useState, useEffect } from 'react';
import { supabase } from '../../data/supabaseClient';
import '../../styles/Modal.css';

function EditModal({ reservation, onClose, onUpdate }) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [phonenumber, setPhonenumber] = useState('');

  useEffect(() => {
    if (reservation) {
      setName(reservation.name || '');
      setDate(reservation.date || '');
      setTime(reservation.time || '');
      setPhonenumber(reservation.phonenumber || '');
    }
  }, [reservation]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!reservation || !reservation.id) {
      alert("Erreur : réservation invalide.");
      return;
    }

    const { error } = await supabase
      .from('reservationsClient')
      .update({ name, date, time, phonenumber })
      .eq('id', reservation.id);

    if (error) {
      alert('Erreur lors de la mise à jour');
      console.error(error);
    } else {
      alert('Réservation mise à jour !');
      onClose();
      onUpdate();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <h2>Modifier la réservation</h2>
          <form onSubmit={handleUpdate}>
            <label>Nom:</label>
            <input value={name} onChange={(e) => setName(e.target.value)} required />

            <label>Date:</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />

            <label>Heure:</label>
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />

            <label>Téléphone:</label>
            <input value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)} required />

            <button type="submit">Mettre à jour</button>
            <button type="button" onClick={onClose}>Annuler</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
