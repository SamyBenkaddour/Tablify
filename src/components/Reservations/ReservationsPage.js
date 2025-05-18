import Banner from '../common/Banner'
import Reservations from './Reservations'

function ReservationsPage() {
	return (
		<>
            <Banner isHomePage={false}/>
			<Reservations />
		</>
	)
}

export default ReservationsPage
