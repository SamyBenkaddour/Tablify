import Banner from '../common/Banner'
import ReservationTable from './ReservationTable'



function ReservationsPage() {
	return (
		<>
            <Banner isHomePage={false}/>
			
			<ReservationTable />
		</>
	)
}

export default ReservationsPage
