// Sélection des éléments HTML
const modal = document.getElementById("reservation-modal");
const closeModal = document.querySelector(".close-modal");
const tableCircles = document.querySelectorAll(".table-circle");
const selectedTable = document.getElementById("selected-table");
const nameInput = document.getElementById("name");
const dateInput = document.getElementById("date");
const timeSelect = document.getElementById("time");
const bookBtn = document.getElementById("book-btn");

// Préparer les heures disponibles
const hours = [
  "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"
];
hours.forEach(hour => {
  const option = document.createElement("option");
  option.value = hour;
  option.textContent = hour;
  timeSelect.appendChild(option);
});

// Ouvrir la pop-up lorsqu'on clique sur une table
tableCircles.forEach(circle => {
  circle.addEventListener("click", () => {
    const tableNumber = circle.getAttribute("data-table");
    selectedTable.textContent = tableNumber;
    modal.style.display = "block";
  });
});

// Fermer la pop-up
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
  resetForm();
});

// Fermer la pop-up si on clique à l'extérieur
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    resetForm();
  }
});

// Réserver une table
bookBtn.addEventListener("click", () => {
  const table = selectedTable.textContent;
  const name = nameInput.value.trim();
  const date = dateInput.value;
  const hour = timeSelect.value;

  if (!name || !date || !hour) {
    alert("Veuillez remplir tous les champs.");
    return;
  }

  const reservation = {
    table,
    name,
    date,
    hour,
    id: "_" + Math.random().toString(36).substr(2, 9)
  };

  const reservations = JSON.parse(localStorage.getItem("reservations")) || [];
  reservations.push(reservation);
  localStorage.setItem("reservations", JSON.stringify(reservations));

  alert("Réservation enregistrée !");
  modal.style.display = "none";
  resetForm();
});

// Réinitialiser les champs du formulaire
function resetForm() {
  nameInput.value = "";
  dateInput.value = "";
  timeSelect.selectedIndex = 0;
}
