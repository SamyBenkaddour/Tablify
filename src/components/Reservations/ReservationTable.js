import React, { useEffect, useState } from 'react';
import { supabase } from '../../data/supabaseClient';
import '../../styles/ReservationTable.css';
import '../../styles/Filter.css';
import EditModal from './EditModal';

function ReservationTable() {
  const [reservations, setReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [filterTable, setFilterTable] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterTime, setFilterTime] = useState('');
  const [FilterPhonenumber, setFilterPhonenumber] = useState('');

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
  }, []);

  const handleDelete = async (id) => {
    const { error } = await supabase
      .from('reservationsClient')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erreur lors de la suppression :', error);
    } else {
      fetchReservations();
    }
  };

  const resetFilters = () => {
    setFilterTable('');
    setFilterDate('');
    setFilterTime('');
    setFilterPhonenumber('');
  };

  const filteredReservations = reservations.filter((res) => {
    return (
      (filterTable === '' || res.table_id.toString().includes(filterTable)) &&
      (filterDate === '' || res.date === filterDate) &&
      (filterTime === '' || res.time === filterTime) &&
      (FilterPhonenumber === '' || res.phonenumber.includes(FilterPhonenumber) )
    );
  });

  return (
    <>
      <div className="ResaPage">
        <h2 className="title-resa">Liste des reservations</h2>

        <div className="filters">
          <select
            name="nombre"
            className="filter-table"
            id="filter-table"
            value={filterTable}
            onChange={(e) => setFilterTable(e.target.value)}
          >
            <option value="">Toutes les tables</option>
            {[1, 2, 3, 4, 5, 6, 7].map((n) => (
              <option key={n} value={n}>Table{n}</option>
            ))}
          </select>

          <input
            id="filter-date"
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
          <input
            id="filter-time"
            type="time"
            value={filterTime}
            onChange={(e) => setFilterTime(e.target.value)}
          />
          <input
            id="filter-phonenumber"
            type="text"
            placeholder="Phonenumber"
            value={FilterPhonenumber}
            onChange={(e) => setFilterPhonenumber(e.target.value)}
          />
          <button className="reset-btn" onClick={resetFilters}>Réinitialiser</button>
        </div>

        <table className="reservation-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Table</th>
              <th>Date</th>
              <th>Heure</th>
              <th>phonenumber</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredReservations.map((res) => (
              <tr key={res.id}>
                <td>{res.name}</td>
                <td>{res.table_id}</td>
                <td>{res.date}</td>
                <td>{res.time}</td>
                <td>{res.phonenumber}</td>
                <td>
                  <div className="action">
                    <span onClick={() => setSelectedReservation(res)} className="settings">⚙️</span>
                    <button onClick={() => handleDelete(res.id)}>&#128465;</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {reservations.length === 0 && (
        <p className="no-reservations">Aucune réservation trouvée.</p>
      )}

      {selectedReservation && (
        <EditModal
          reservation={selectedReservation}
          onClose={() => setSelectedReservation(null)}
          onUpdate={fetchReservations}
        />
      )}
    </>
  );
}

export default ReservationTable;
