import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
		

import HomePage from './Tables/HomePage'
import ReservationsPage from './Reservations/ReservationsPage'

function App() {
	

	return (
		<Router>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/reservations" element={<ReservationsPage />} />
			</Routes>
		</Router>
	)
}

export default App