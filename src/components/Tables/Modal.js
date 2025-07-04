// src/components/Modal.js
import '../../styles/Modal.css';
import React, { useState } from 'react';
import { supabase } from '../../data/supabaseClient';

function Modal({ isOpen, onClose, tableId }) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('18:00');
  const [phonenumber, setphonenumber] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérifier s'il y a déjà une réservation pour cette table, date et heure
    const { data, error } = await supabase
      .from('reservationsClient')         // le nom correct de ta table
      .select('*')
      .eq('table_id', tableId)            // colonne table_id avec underscore et minuscules
      .eq('date', date)
      .eq('time', time)
      .eq('phonenumber', phonenumber); // Vérification du numéro de téléphone

    if (error) {
      alert("Erreur lors de la vérification des réservations");
      console.error(error);
      return;
    }

    if (data.length > 0) {
      alert('Cette table est déjà réservée pour cette date et heure.');
      return;
    }

    // Insérer la réservation
    const { error: insertError } = await supabase
      .from('reservationsClient')
      .insert([{ name, date, time, table_id: tableId, phonenumber }]);

    if (insertError) {
      alert('Erreur lors de la réservation');
      console.error(insertError);
    } else {
      alert('Réservation réussie !');
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div id="reservation-modal" className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <h2>Réserver la Table <span id="selected-table">{tableId}</span></h2>
          <form onSubmit={handleSubmit}>
            <label>Nom:*</label>
            <input
              type="text"
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Date:*</label>
            <input
              type="date"
              id="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <label>Heure:*</label>
          <input
            id="time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            min="18:00"
            max="24:00"
            // step="1800" 1800 secondes = 30 minutes
          />
               <label>Phonenumber:*</label>
            <input
              type="text"
              id="phonenumber"
              required
              value={phonenumber}
              onChange={(e) => setphonenumber(e.target.value)}
            />
            <button id="book-btn" type="submit">Réserver</button>
            <button type="button" onClick={onClose}>Annuler</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Modal;
