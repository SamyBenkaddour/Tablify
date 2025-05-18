import Banner from '../common/Banner'
import Tables from './Tables'
import Modal from './Modal'

function HomePage() {
	return (
		<>
			<Banner isHomePage={true}/>
			<Tables />
			<Modal />
		</>
	)
}

export default HomePage
