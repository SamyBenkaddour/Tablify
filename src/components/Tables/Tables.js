import { useState } from 'react'
import '../../styles/Tables.css'
import Modal from './Modal'


function Tables() {
const [isModalOpen, setIsModalOpen] = useState(false)
const [selectedTable, setSelectedTable] = useState(null)

	const handleTableClick = (tableId) => {
		setSelectedTable(tableId)
		setIsModalOpen(true)
	}

	const closeModal = () => {
		setIsModalOpen(false)
		setSelectedTable(null)
	}

	return (
		<>
				<div className="tables">
						{[1, 2, 3, 4, 5].map((id) => (
					<div className='table-circle' key={id} onClick={() => handleTableClick(id)}>
						 {id}
					</div>
				))}
				</div>
				
                <Modal isOpen={isModalOpen} onClose={closeModal} tableId={selectedTable} />
		</>
	)
}

export default Tables