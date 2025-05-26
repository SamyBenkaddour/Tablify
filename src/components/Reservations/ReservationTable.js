import React, { useEffect, useState } from 'react';
import { supabase } from '../../data/supabaseClient';
import '../../styles/ReservationTable.css'; 

function ReservationTable() {
  const [reservations, setReservations] = useState([]);

  const fetchReservations = async () => {
    const { data, error } = await supabase
      .from('reservationsClient')
      .select('*')
      .order('date', { ascending: true })
      .order('time', { ascending: true });

    if (error) {
      console.error('Erreur lors du chargement des réservations :', error);
    } else {
      setReservations(data);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []); // <- Ce useEffect se déclenche une fois au montage de la page

  const handleDelete = async (id) => {
    const { error } = await supabase
      .from('reservationsClient')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erreur lors de la suppression :', error);
    } else {
      fetchReservations(); // 🔁 Recharge les données après suppression
    }
  };

  return (
    <div>
      <h2 className='title'> Liste des reservations</h2>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Table</th>
            <th>Date</th>
            <th>Heure</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((res) => (
            <tr key={res.id}>
              <td>{res.name}</td>
              <td>{res.table_id}</td>
              <td>{res.date}</td>
              <td>{res.time}</td>
              <td>
                <button onClick={() => handleDelete(res.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReservationTable;
