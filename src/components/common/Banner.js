import '../../styles/Banner.css'
import { Link } from 'react-router-dom'


function Banner({isHomePage}) {
	return (
	<>
	
		<div className='container'>

			

		
			<h1 ><Link to="/" className='logo'>Tablify</Link>	</h1>
			



			{/*<a href="reservations.html" class="btn-view">Voir les réservations</a>*/}
			{isHomePage ?
			<Link to="/reservations" className="btn-view">Voir les réservations</Link> 
			:
			<Link to="/" className="btn-view">Voir les Tables</Link>	
			}

		</div>
	
	

		
	</>
	)
	
}

export default Banner