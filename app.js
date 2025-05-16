

 const reservationsBody = document.getElementById("reservations-body");
    const dateFilter = document.getElementById("date-filter");
    const tableFilter = document.getElementById("table-filter");
    const nameSearch = document.getElementById("name-search");
    const clearDateFilter = document.getElementById("clear-date-filter");
    const clearSearch = document.getElementById("clear-search");

    // Fonction pour générer un ID simple unique
    function generateId() {
      return '_' + Math.random().toString(36).substr(2, 9);
    }

    // Au chargement, on ajoute un id aux réservations qui n'en ont pas
    function ensureIds() {
      let reservations = JSON.parse(localStorage.getItem("reservations")) || [];

      let changed = false;
      reservations = reservations.map(res => {
        if (!res.id) {
          res.id = generateId();
          changed = true;
        }
        return res;
      });

      if (changed) {
        localStorage.setItem("reservations", JSON.stringify(reservations));
      }
    }

    function loadReservations() {
      const reservations = JSON.parse(localStorage.getItem("reservations")) || [];
      let filtered = reservations;

      if (dateFilter.value) {
        filtered = filtered.filter(r => r.date === dateFilter.value);
      }

      if (tableFilter.value) {
        filtered = filtered.filter(r => r.table.toString() === tableFilter.value);
      }

      if (nameSearch.value.trim()) {
        filtered = filtered.filter(r => r.name.toLowerCase().includes(nameSearch.value.trim().toLowerCase()));
      }

      reservationsBody.innerHTML = "";

      if (filtered.length === 0) {
        reservationsBody.innerHTML = "<tr><td colspan='5'>Aucune réservation trouvée.</td></tr>";
        return;
      }

      filtered.forEach(res => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${res.table}</td>
          <td>${res.name}</td>
          <td>${res.date}</td>
          <td>${res.hour}</td>
          <td><button onclick="deleteReservation('${res.id}')">Supprimer</button></td>
        `;
        reservationsBody.appendChild(row);
      });
    }

    function deleteReservation(id) {
      let reservations = JSON.parse(localStorage.getItem("reservations")) || [];
      reservations = reservations.filter(r => r.id !== id);
      localStorage.setItem("reservations", JSON.stringify(reservations));
      loadReservations();
    }

    dateFilter.addEventListener("input", loadReservations);
    tableFilter.addEventListener("change", loadReservations);
    nameSearch.addEventListener("input", loadReservations);
    clearDateFilter.addEventListener("click", () => {
      dateFilter.value = "";
      loadReservations();
    });
    clearSearch.addEventListener("click", () => {
      nameSearch.value = "";
      loadReservations();
    });

    window.onload = () => {
      ensureIds();
      loadReservations();
    };